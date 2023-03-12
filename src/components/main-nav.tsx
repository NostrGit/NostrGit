"use client";

import * as React from "react";

import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";

import { Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Logo from "./logo";
import SearchBar from "./search-bar";
import { Input } from "./ui/input";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type HeaderConfig = {
  mainNav: MainNavItem[];
};

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="w-full md:w-auto flex items-center justify-center gap-6 md:gap-10">
      <Logo className="hidden md:flex" />

      <div className="hidden max-h-12 md:inline">
        <SearchBar className="w-[162px] lg:w-[272px] focus:w-[600px]" />
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

      <div className="flex w-full md:w-auto justify-between items-center">
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>

        <Logo className="flex md:hidden" />

        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
        <Bell className="flex md:hidden w-4 h-4" />
      </div>
    </div>
  );
}
