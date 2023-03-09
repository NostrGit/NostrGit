import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLockBody } from "@/lib/hooks/use-lock-body";
import { cn } from "@/lib/utils";

import Link from "next/link";

import { Input } from "./ui/input";
import { type MainNavItem } from "./main-nav";
import { Button } from "./ui/button";
import useSession from "@/lib/nostr/useSession";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {

  const { picture, initials, isLoggedIn } = useSession();

  useLockBody();

  return (
    <div
      className={cn(
        "animate-in slide-in-from-bottom-80 fixed inset-0 top-10 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto py-6 pb-32 shadow-md md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-2 rounded-md bg-[#0E1116] px-3 shadow-md">
        <Input
          className=" w-full bg-[#0E1116] transition-all ease-in-out focus:w-[600px]"
          type="text"
          placeholder="Search or jump to…"
        />
        <nav className="grid grid-flow-row auto-rows-max text-sm">
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
              <Avatar className="w-8 h-8">
                <AvatarImage src={picture} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex gap-1 mt-2">
              <Button
                variant={"success"}
                type="submit"
                className="mr-2"
              >
                <Link className="text-white" href="/login">Sign in</Link>
              </Button>
              <Button
                variant={"outline"}
                type="submit"
              >
                <Link className="text-white" href="/signup">Sign up</Link>
              </Button>
            </div>
          )
          }
        </nav>
        {children}
      </div>
    </div>
  );
}
