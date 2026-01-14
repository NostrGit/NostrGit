'use client';

import { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Users, Calendar, Search, TrendingUp, Clock, Zap, Copy, Check, Terminal, Globe, Tag, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}

interface RepoInfo {
  id: string;
  name: string;
  description: string;
  web?: string;
  clone?: string;
  maintainers: string[];
  created_at: number;
  pubkey: string;
  topics?: string[];
  identifier?: string;
}

export default function ExplorePage() {
  const [repos, setRepos] = useState<RepoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectedRelays, setConnectedRelays] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'trending' | 'new'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const relays = [
      'wss://relay.nostr.net/',
      'wss://nos.lol/',
      'wss://relay.damus.io/',
      'wss://nostr.wine/',
      'wss://relay.snort.social/',
      'wss://nostr.mom/',
      'wss://relay.nostr.band/',
      'wss://purplepag.es/',
      'wss://offchain.pub/',
    ];

    const websockets: WebSocket[] = [];
    const seenEvents = new Set<string>();
    const connectedRelayUrls = new Set<string>();

    relays.forEach((relayUrl, index) => {
      try {
        const ws = new WebSocket(relayUrl);

        ws.onopen = () => {
          if (!connectedRelayUrls.has(relayUrl)) {
            connectedRelayUrls.add(relayUrl);
            setConnectedRelays(connectedRelayUrls.size);
          }

          const subscription = JSON.stringify([
            'REQ',
            `explore-${index}`,
            {
              kinds: [30617],
              limit: 50,
            },
          ]);
          ws.send(subscription);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);

            if (message[0] === 'EVENT' && message[2]) {
              const nostrEvent: NostrEvent = message[2];

              if (seenEvents.has(nostrEvent.id)) {
                return;
              }
              seenEvents.add(nostrEvent.id);

              if (nostrEvent.kind === 30617) {
                const repoInfo = parseRepoInfo(nostrEvent);

                setRepos((prev) => {
                  const exists = prev.some(
                    (r) => r.pubkey === repoInfo.pubkey && r.name === repoInfo.name
                  );

                  if (exists) return prev;

                  const updated = [...prev, repoInfo];
                  return updated.sort((a, b) => b.created_at - a.created_at);
                });

                setEventCount((c) => c + 1);
                setLoading(false);
              }
            } else if (message[0] === 'EOSE') {
              setLoading(false);
            }
          } catch (err) {
            console.error('Error parsing message:', err);
          }
        };

        ws.onerror = () => {
          console.error(`Failed to connect to ${relayUrl}`);
        };

        ws.onclose = () => {
          if (connectedRelayUrls.has(relayUrl)) {
            connectedRelayUrls.delete(relayUrl);
            setConnectedRelays(connectedRelayUrls.size);
          }
        };

        websockets.push(ws);
      } catch (err) {
        console.error(`Error connecting to ${relayUrl}:`, err);
      }
    });

    return () => {
      connectedRelayUrls.clear();
      setConnectedRelays(0);
      websockets.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      });
    };
  }, []);

  const parseRepoInfo = (event: NostrEvent): RepoInfo => {
    const tags = event.tags || [];
    const info: RepoInfo = {
      id: event.id,
      name: '',
      description: '',
      web: undefined,
      clone: undefined,
      maintainers: [],
      created_at: event.created_at,
      pubkey: event.pubkey,
      topics: [],
      identifier: undefined,
    };

    tags.forEach((tag) => {
      const [key, value] = tag;

      switch (key) {
        case 'name':
          info.name = value || '';
          break;
        case 'd':
          info.identifier = value || '';
          if (!info.name) info.name = value || '';
          break;
        case 'description':
          info.description = value || '';
          break;
        case 'web':
          info.web = value;
          break;
        case 'clone':
          info.clone = value;
          break;
        case 'p':
          if (value) info.maintainers.push(value);
          break;
        case 't':
          if (value) info.topics?.push(value);
          break;
      }
    });

    if (!info.description && event.content) {
      info.description = event.content;
    }

    if (!info.name) {
      info.name = `Repo by ${event.pubkey.substring(0, 8)}`;
    }

    return info;
  };

  const formatDate = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;

    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;

    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCopyClone = async (cloneUrl: string, repoId: string) => {
    try {
      await navigator.clipboard.writeText(`git clone ${cloneUrl}`);
      setCopiedId(repoId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const filteredRepos = repos;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-dark to-dark border-b border-lightgray">
        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-purple-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
              Explore Projects
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl">
            Discover decentralized repositories announced on the Nostr network
          </p>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark/50 backdrop-blur-sm border border-lightgray rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Connected Relays</p>
                  <p className="text-2xl font-bold text-white">{connectedRelays}/9</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${connectedRelays > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              </div>
            </div>

            <div className="bg-dark/50 backdrop-blur-sm border border-lightgray rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Repositories</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    {repos.length}
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
            </div>

            <div className="bg-dark/50 backdrop-blur-sm border border-lightgray rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Events Received</p>
                  <p className="text-2xl font-bold text-white">{eventCount}</p>
                </div>
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="mb-6 flex items-center gap-2">
          <Button
            onClick={() => setActiveFilter('all')}
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            className={activeFilter === 'all' ? 'bg-purple-600 hover:bg-purple-700' : 'border-lightgray bg-dark hover:bg-[#171B21]'}
            size="sm"
          >
            All
          </Button>
          <Button
            onClick={() => setActiveFilter('trending')}
            variant={activeFilter === 'trending' ? 'default' : 'outline'}
            className={activeFilter === 'trending' ? 'bg-purple-600 hover:bg-purple-700' : 'border-lightgray bg-dark hover:bg-[#171B21]'}
            size="sm"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Trending
          </Button>
          <Button
            onClick={() => setActiveFilter('new')}
            variant={activeFilter === 'new' ? 'default' : 'outline'}
            className={activeFilter === 'new' ? 'bg-purple-600 hover:bg-purple-700' : 'border-lightgray bg-dark hover:bg-[#171B21]'}
            size="sm"
          >
            <Zap className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>

        {/* Loading State with Skeletons */}
        {loading && repos.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-dark border border-lightgray rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-lightgray rounded w-3/4 mb-4" />
                <div className="h-4 bg-lightgray rounded w-full mb-2" />
                <div className="h-4 bg-lightgray rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo, index) => (
            <Card
              key={repo.id}
              className="group p-6 bg-dark border-lightgray hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02]"
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Repo Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1 flex-1">
                    {repo.name}
                  </h3>
                </div>

                {repo.description && (
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-3">
                    {repo.description}
                  </p>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {repo.topics.slice(0, 5).map((topic, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-md text-xs text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/40 transition-colors cursor-default"
                      >
                        <Tag className="h-3 w-3" />
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Website Button */}
                {repo.web && (
                  <a
                    href={repo.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-sm text-purple-300 hover:text-purple-200 transition-all duration-200 hover:scale-[1.02] group/web"
                  >
                    <Globe className="h-3.5 w-3.5 group-hover/web:rotate-12 transition-transform" />
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                )}
              </div>

              {/* Repo Metadata */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(repo.created_at)}</span>
                  </div>

                  {repo.maintainers.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <div className="flex items-center gap-1">
                        {repo.maintainers.slice(0, 3).map((maintainer, i) => (
                          <a
                            key={i}
                            href={`https://nostr.eu/${maintainer}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded hover:bg-blue-500/20 hover:border-blue-500/40 transition-colors group/maintainer"
                            title={`Maintainer: ${maintainer.substring(0, 16)}...`}
                          >
                            <User className="h-3 w-3 text-blue-400 group-hover/maintainer:text-blue-300" />
                            <span className="text-xs text-blue-300 font-mono">{maintainer.substring(0, 8)}</span>
                          </a>
                        ))}
                        {repo.maintainers.length > 3 && (
                          <span className="text-xs text-gray-500">+{repo.maintainers.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {repo.clone && (
                  <div className="group/clone relative">
                    <div className="p-3 bg-gradient-to-br from-[#0E1116] to-[#0A0C0F] rounded-lg border border-lightgray hover:border-purple-500/30 transition-all duration-300">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Terminal className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />
                            <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">Clone Repository</span>
                          </div>
                          <div className="text-xs font-mono break-all leading-relaxed">
                            <span className="text-gray-500 select-none">$</span>{' '}
                            <span className="text-green-400">git</span>{' '}
                            <span className="text-blue-400">clone</span>{' '}
                            <span className="text-purple-300">{repo.clone}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyClone(repo.clone!, repo.id)}
                          className="flex-shrink-0 p-2 rounded-md bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 group/btn"
                          title="Copy clone command"
                        >
                          {copiedId === repo.id ? (
                            <Check className="h-3.5 w-3.5 text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-purple-400 group-hover/btn:text-purple-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-lightgray">
                <a
                  href={`https://nostr.eu/${repo.pubkey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-purple-400 font-mono flex items-center gap-2 transition-colors group/owner"
                  title={`Repository owner: ${repo.pubkey}`}
                >
                  <div className="w-2 h-2 rounded-full bg-purple-500/50 group-hover/owner:bg-purple-500 transition-colors" />
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Owner:</span>
                  </span>
                  <span className="text-purple-400 group-hover/owner:text-purple-300">{repo.pubkey.substring(0, 16)}...</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover/owner:opacity-50 transition-opacity" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {!loading && repos.length === 0 && (
          <div className="text-center py-16 bg-dark/50 border border-lightgray rounded-lg backdrop-blur-sm">
            <Zap className="h-16 w-16 text-purple-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2 text-white">No repositories found yet</h3>
            <p className="text-gray-400">
              Listening for repository announcements on the Nostr network...
            </p>
            <div className="mt-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent" />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
