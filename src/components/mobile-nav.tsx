import * as React from "react";
import Link from "next/link";
import { useLockBody } from "../../hooks/use-lock-body";

import { MainNavItem } from "types";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
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
                "flex w-full items-center border-b border-b-[#383B42] p-3 text-sm font-medium hover:text-gray-400 ",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
          <div className="flex items-center p-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/peerrich.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
}
