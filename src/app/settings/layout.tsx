"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useMetadata from "@/lib/nostr/useMetadata";
import useSession from "@/lib/nostr/useSession";
import { cn } from "@/lib/utils";

import { Bell, Brush, Cog, Server, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// check if signed in, if not, redirect to sign in page

const links = [
  {
    name: "Profile",
    href: "/settings/profile",
    Icon: User,
  },
  {
    name: "Account",
    href: "/settings/account",
    Icon: Cog,
  },
  {
    name: "Relays",
    href: "/settings/relays",
    Icon: Server,
  },
  {
    name: "Appearance",
    href: "/settings/appearance",
    Icon: Brush,
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
    Icon: Bell,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { picture, initials, name } = useSession();
  const metadata = useMetadata();
  const pathname = usePathname();

  return (
    <>
      <section className="px-5 my-8">
        <div className="flex justify-between">
          <div className="space-x-4 items-center flex">
            <Avatar className="w-12 h-12">
              <AvatarImage src={picture} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <header>
              {metadata.display_name && <h2>{metadata.display_name}</h2>}
              {name && <h3 className="text-zinc-500 text-xs">@{name}</h3>}
            </header>
          </div>
          <Button variant="outline">Go to your profile</Button>
        </div>

        <div className="md:flex space-x-6">
          <nav className="my-6 w-full max-w-xs">
            <ul>
              {links.map((link) => (
                <li
                  key={link.name}
                  className={cn(
                    pathname == link.href
                      ? "border-purple-500"
                      : "border-transparent",
                    "flex mb-1 px-2 border-l-2 transition-all"
                  )}
                >
                  <Link
                    className={cn(
                      pathname == link.href && "!bg-zinc-800/50",
                      "flex w-full rounded hover:bg-zinc-900/50 text-sm items-center transition-all px-2 py-1"
                    )}
                    href={link.href}
                  >
                    <link.Icon className="w-4 mr-2 text-zinc-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <main className="w-full">{children}</main>
        </div>
      </section>
    </>
  );
}
