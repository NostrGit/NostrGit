"use client";

import SearchBar from "@/components/search-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useSession from "@/lib/nostr/useSession";
import { cn } from "@/lib/utils";

import {
  Album,
  CircleDot,
  GitPullRequest,
  GitPullRequestDraft,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";

const repos = [
  {
    id: "1",
    org: "nostr-protocol",
    name: "nostr",
    logo: "https://avatars.githubusercontent.com/u/103332273?s=200&v=4",
  },
  {
    id: "2",
    org: "NostrGit",
    name: "NostrGit",
    logo: "https://avatars.githubusercontent.com/u/126956919?s=200&v=4",
  },
  {
    id: "3",
    org: "damus-io",
    name: "damus",
    logo: "https://avatars.githubusercontent.com/u/104653694?s=200&v=4",
  },
];

const activities = [
  {
    id: "1",
    org: "NostrGit",
    name: "NostrGit",
    title: "landing page after signing in",
    href: "/nostrgit/nostrgit/pull/1",
    type: "PULL-REQUEST-DRAFT",
    icon: GitPullRequestDraft, // GitPullRequest, GitBranch, GitCommit, GitMerge, GitPullRequestDraft, GitFork, GitPullRequestClosed
  },
  {
    id: "2",
    org: "NostrGit",
    name: "NostrGit",
    title: "Landing page (after login)",
    href: "/nostrgit/nostrgit/pull/1",
    type: "NEW-ISSUE",
    icon: CircleDot, // CircleDot GitPullRequest, GitBranch, GitCommit, GitMerge, GitPullRequestDraft, GitFork, GitPullRequestClosed
  },
  {
    id: "2",
    org: "NostrGit",
    name: "NostrGit",
    title: "Landing page (after login)",
    href: "/nostrgit/nostrgit/pull/1",
    type: "PULL-REQUEST",
    icon: GitPullRequest, // CircleDot GitPullRequest, GitBranch, GitCommit, GitMerge, GitPullRequestDraft, GitFork, GitPullRequestClosed
  },
];

export default function IndexRedirect() {
  const { isLoggedIn, picture, initials, name } = useSession();
  if (!isLoggedIn) return <div>logged out</div>;
  return (
    <section className="sm:flex sm:min-h-screen bg-black">
      <aside className="bg-zinc-900 p-6 w-full sm:w-auto min-w-[325px] sm:border-r border-lightgray space-y-3">
        <div className="flex items-center space-x-2 border-b border-lightgray pb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={picture} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold">Top Repositories</h4>
          <Button variant="success" size="xs">
            <Album className="w-4 h-4 mr-1" /> New Repo
          </Button>
        </div>
        <SearchBar placeholder="Find a repository…" />

        <div className="max-h-[200px] overflow-scroll sm:max-h-full">
          <ul className="text-sm block space-y-2 text-purple-500">
            {repos.map((repo) => (
              <li key={repo.id}>
                <Link
                  href={repo.org + "/" + repo.name}
                  className="flex items-center hover:underline"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={repo.org + "/" + repo.name}
                    src={repo.logo}
                    className="w-4 h-4 inline mr-2 rounded-full"
                  />
                  <span>{repo.org}</span>
                  <span className="text-gray-500">/</span>
                  <span>{repo.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <h4 className="text-sm mt-4 font-bold">Recent Activity</h4>
            <ul>
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex space-x-2 items-center mt-4"
                >
                  <activity.icon
                    className={cn(
                      "w-4 h-4",
                      activity.type.includes("DRAFT")
                        ? "text-gray-500"
                        : "text-green-500"
                    )}
                  />
                  <div className="leading-none">
                    <Link
                      href={activity.href}
                      className="text-xs text-gray-400 block hover:text-purple-500"
                    >
                      {activity.name}
                    </Link>
                    <Link
                      href={activity.org + "/" + activity.name}
                      className="text-sm  hover:underline"
                    >
                      {activity.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      <main className="w-full">
        <Feed />
      </main>
    </section>
  );
}

function Feed() {
  const events = [
    {
      id: "1",
      author: "PeerRich",
      type: "ZAP", // ZAP, FORKED, CREATED_REPO, PUSHED, STARRED, FOLLOWED
      npub: "npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr",
      org: "NostrGit",
      repo: {
        name: "NostrGit",
        avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
        description:
          "A truly censorship-resistant alternative to GitHub that has a chance of working",
      },
      title: "zapped",
      amount: "4123",
      date: "2 hours ago",
      avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
    },
    {
      id: "2",
      author: "PeerRich",
      type: "FORKED", // ZAP, FORKED, CREATED_REPO, PUSHED, STARRED, FOLLOWED
      npub: "npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr",
      org: "NostrGit",
      repo: {
        name: "NostrGit",
        avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
        description:
          "A truly censorship-resistant alternative to GitHub that has a chance of working",
      },
      title: "forked",
      amount: "4123",
      date: "2 hours ago",
      avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
    },
    {
      id: "3",
      author: "PeerRich",
      type: "PUSHED", // ZAP, FORKED, CREATED_REPO, PUSHED, STARRED, FOLLOWED
      npub: "npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr",
      org: "NostrGit",
      repo: {
        name: "NostrGit",
        avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
        description:
          "A truly censorship-resistant alternative to GitHub that has a chance of working",
      },
      title: "pushed to",
      amount: "4123",
      date: "2 hours ago",
      avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
    },
    {
      id: "4",
      author: "PeerRich",
      type: "STARRED", // ZAP, FORKED, CREATED_REPO, PUSHED, STARRED, FOLLOWED
      npub: "npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr",
      org: "NostrGit",
      repo: {
        name: "NostrGit",
        avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
        description:
          "A truly censorship-resistant alternative to GitHub that has a chance of working",
      },
      title: "starred a repository",
      amount: "4123",
      date: "2 days ago",
      avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
    },
    {
      id: "5",
      author: "PeerRich",
      type: "CREATED_REPO", // ZAP, FORKED, CREATED_REPO, PUSHED, STARRED, FOLLOWED
      npub: "npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr",
      org: "NostrGit",
      repo: {
        name: "NostrGit",
        avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
        description:
          "A truly censorship-resistant alternative to GitHub that has a chance of working",
      },
      title: "created a repository",
      amount: "4123",
      date: "2 days ago",
      avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
    },
    {
      id: "6",
      author: "PeerRich",
      type: "CREATED_REPO", // ZAP, FORKED, CREATED_REPO, PUSHED, STARRED, FOLLOWED
      npub: "npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr",
      org: "NostrGit",
      repo: {
        name: "NostrGit",
        avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
        description:
          "A truly censorship-resistant alternative to GitHub that has a chance of working",
      },
      title: "created a repository",
      amount: "4123",
      date: "2 days ago",
      avatar: "https://avatars.githubusercontent.com/u/8019099?s=40&v=4",
    },
  ];
  return (
    <div className="px-4 md:px-8 pt-6 max-w-screen-sm">
      {events.map((event) => (
        <div key={event.id} className="mb-8">
          <div className="flex items-center text-sm">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src={event.avatar} />
              <AvatarFallback>{event.author}</AvatarFallback>
            </Avatar>
            <div className="text-gray-400">
              <a
                target="_blank"
                className="text-white hover:text-purple-500"
                href={"https://snort.social/p/" + event.npub}
              >
                {event.author}
              </a>{" "}
              <span>{event.title}</span>{" "}
              <Link
                className="text-white hover:text-purple-500"
                href={"/" + event.org + "/" + event.repo.name}
              >
                {event.repo.name}
              </Link>{" "}
              <span>· {event.date}</span>
            </div>
          </div>
          <div className="rounded-md border border-lightgray w-full p-4 bg-zinc-900 my-2">
            <h4 className="flex justify-between items-center">
              <div className="flex justify-center items-center">
                <img
                  src={event.repo.avatar}
                  alt={event.repo.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                {event.org}/{event.repo.name}
              </div>

              {event.type === "ZAP" && (
                <Button
                  className="h-8 !border-[#383B42] bg-[#22262C] text-xs"
                  variant="outline"
                >
                  <Zap className="mr-2 h-4 w-4" /> Zaps
                  <Badge className="ml-2">1337</Badge>
                </Button>
              )}

              {(event.type === "STARRED" || event.type === "CREATED_REPO") && (
                <Button
                  className="h-8 !border-[#383B42] bg-[#22262C] text-xs"
                  variant="outline"
                >
                  <Star className="mr-2 h-4 w-4 text-yellow-500" /> Starred
                  <Badge className="ml-2">7k</Badge>
                </Button>
              )}
            </h4>
            <p className="text-gray-400 mt-2 text-sm">
              {event.repo.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
