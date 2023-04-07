"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useMetadata from "@/lib/nostr/useMetadata";
import useSession from "@/lib/nostr/useSession";
import { cn } from "@/lib/utils";

import { Album, BookOpen, Star, Table2, Zap } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const links = [
  {
    name: "Overview",
    href: "/profile/overview",
    Icon: BookOpen,
  },
  {
    name: "Repositories",
    href: "/profile/repositories",
    Icon: Album,
  },
  {
    name: "Projects",
    href: "/profile/projects",
    Icon: Table2,
  },
  {
    name: "Zaps",
    href: "/profile/zaps",
    Icon: Zap,
  },
  {
    name: "Stars",
    href: "/profile/stars",
    Icon: Star,
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useSession();
  if (!isLoggedIn) redirect("/login");

  const { picture, initials } = useSession();
  const metadata = useMetadata();
  const pathname = usePathname();

  return (
    <>
      <section className="flex p-4">
        <div className="flex flex-col w-2/4">
          <div className="flex flex-col">
            <Avatar className="w-72 h-72">
              <AvatarImage src={picture} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <header className="mt-2">
              {metadata.display_name && <h2>{metadata.display_name}</h2>}
              <h3 className="text-zinc-500">@{`<todo: tag here>`}</h3>
            </header>
            <p className="mt-2">{`<todo: Description here>`}</p>
            <Button variant="outline" className="mt-2 w-3/4">
              Edit profile
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <nav className="flex">
            {links.map((link) => (
              <Link
                className={cn(
                  pathname == link.href && "!bg-zinc-800/50",
                  "flex w-full rounded hover:bg-zinc-900/50 text-l items-center transition-all px-2 py-1"
                )}
                href={link.href}
              >
                <link.Icon className="w-4 mr-2 text-zinc-400" />
                {link.name}
              </Link>
            ))}
          </nav>
          <main className="w-full">{children}</main>
        </div>
      </section>
    </>
  );
}
