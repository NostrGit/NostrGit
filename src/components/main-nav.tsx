"use client";

import * as React from "react";

import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type MainNavItem } from "types";

import { Input } from "./ui/input";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image
          src="/logo.svg"
          alt="NostrGit"
          width={32}
          height={32}
          className="hover:opacity-80"
        />
      </Link>

      <div className="hidden max-h-12 md:inline">
        <Input
          className=" w-[272px] bg-[#0E1116] transition-all ease-in-out focus:w-[600px]"
          type="text"
          placeholder="Search or jump to…"
        />
      </div>

      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-semibold text-white hover:text-white/80 sm:text-sm",

                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <X /> : <Menu />}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
