"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSession from "@/lib/nostr/useSession";

import { Album, Check, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function RepositoriesPage() {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) redirect("/login");

  const [search, setSearch] = useState<string>("");
  const [selectedRepoType, setSelectedRepoType] = useState<string>("All");
  const [selectedRepoLang, setSelectedRepoLang] = useState<string>("All");
  const [selectedRepoSort, setSelectedRepoSort] = useState<string>("Name");

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(e.currentTarget.value),
    []
  );

  return (
    <>
      <div className="flex justify-evenly mt-4">
        <label className="relative text-zinc-400">
          <span className="sr-only">Search</span>
          <span className="absolute lg:inset-y-0 lg:left-0 flex items-center px-2">
            <Search className="h-8 w-4 mb-2" />
          </span>
          <input
            className="bg-[#0E1116] rounded-md py-1 pl-9 pr-3 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 text-sm md:text-base"
            type="text"
            value={search}
            placeholder="Find a repository"
            onChange={handleSearch}
          />
        </label>
        <div className="flex w-auto gap-2">
          <div className="hidden items-center md:inline">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Button variant="outline" type="button">
                    Type
                    <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {repoTypes.map((repoType) => (
                    <div key={repoType}>
                      <div
                        className="flex cursor-pointer"
                        onClick={() => setSelectedRepoLang(repoType)}
                      >
                        {repoType}{" "}
                        {selectedRepoType === repoType ? (
                          <Check className="ml-2" />
                        ) : null}
                      </div>
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden items-center md:inline">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Button variant="outline" type="button">
                    Language
                    <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {repoLanguages.map((lang) => (
                    <div key={lang}>
                      <div
                        className="flex cursor-pointer"
                        onClick={() => setSelectedRepoType(lang)}
                      >
                        {lang}{" "}
                        {selectedRepoLang === lang ? (
                          <Check className="ml-2" />
                        ) : null}
                      </div>
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden items-center md:inline">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Button variant="outline" type="button">
                    Sort
                    <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select order</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {repoSort.map((orderBy) => (
                    <div key={orderBy}>
                      <div
                        className="flex cursor-pointer"
                        onClick={() => setSelectedRepoSort(orderBy)}
                      >
                        {orderBy}{" "}
                        {selectedRepoSort === orderBy ? (
                          <Check className="ml-2" />
                        ) : null}
                      </div>
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button
          variant={"success"}
          type="button"
          className="whitespace-nowrap h-8"
        >
          <Link className="text-white w-full" href="/new">
            <div className="flex">
              <Album className="mr-1" />
              New
            </div>
          </Link>
        </Button>
      </div>
      <div className="flex flex-col mt-2">
        <p>todo: List repositories here</p>
      </div>
    </>
  );
}

const repoTypes = [
  "All",
  "Public",
  "Private",
  "Sources",
  "Forks",
  "Archived",
  "Mirrors",
  "Templates",
];

// todo: list all languages used in the repos of the user/entity
const repoLanguages = ["All", "Typescript", "HTML", "Go", "Python"];

const repoSort = ["Last updated", "Name", "Zaps", "Stars"];
