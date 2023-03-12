import * as React from "react";
import { useCallback } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLockBody } from "@/lib/hooks/use-lock-body";
import { useNostrContext } from "@/lib/nostr/NostrContext";
import useSession from "@/lib/nostr/useSession";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { type MainNavItem } from "./main-nav";
import SearchBar from "./search-bar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  const { picture, name, initials, isLoggedIn } = useSession();

  useLockBody();

  const { signOut } = useNostrContext();
  const router = useRouter();
  const handleSignOut = useCallback(() => {
    if (signOut) {
      signOut();
      router.push("/");
    }
  }, [router, signOut]);

  return (
    <div
      className={cn(
        "animate-in slide-in-from-bottom-80 fixed inset-0 top-10 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto py-6 pb-32 shadow-md md:hidden"
      )}
    >
      <div className="relative pb-4 z-20 grid gap-2 rounded-md bg-[#0E1116] px-3 shadow-md">
        <SearchBar />
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {isLoggedIn && (
            <div className="flex items-center p-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={picture} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <p>{name}</p>
            </div>
          )}
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "hover:text-gray-400 flex w-full items-center border-b border-b-gray p-3 text-sm font-medium ",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="flex items-center p-3">
              <Button variant={"outline"} type="submit" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex gap-1 mt-2">
              <Button variant="outline" type="submit" className="mr-2">
                <Link className="text-white" href="/login">
                  Sign in
                </Link>
              </Button>
              <Button variant="ghost" type="submit">
                <Link className="text-white" href="/signup">
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </nav>
        {children}
      </div>
    </div>
  );
}
