"use client";

import SearchBar from "@/components/search-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useSession from "@/lib/nostr/useSession";

import { Album } from "lucide-react";
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

export default function IndexRedirect() {
  const { isLoggedIn, picture, initials, name } = useSession();
  if (!isLoggedIn) return <div>logged out</div>;
  return (
    <section className="flex h-screen bg-black">
      <aside className="bg-zinc-900 p-6 min-w-[325px] border-r border-lightgray space-y-3">
        <div className="flex items-center space-x-2 border-b border-lightgray pb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={picture} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-sm">Top Repositories</h4>
          <Button variant="success" size="xs">
            <Album className="w-4 h-4 mr-1" /> New Repo
          </Button>
        </div>
        <SearchBar placeholder="Find a repository…" />

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
        <div className="flex justify-between items-center">
          <h4 className="text-sm mt-4">Recent Activity</h4>
        </div>
      </aside>
      <main></main>
    </section>
  );
}
