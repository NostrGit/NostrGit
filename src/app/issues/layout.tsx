"use client";

import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { clsx } from "clsx";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RepoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  const [issueType, setIssueType] = useState<
    "created" | "assigned" | "mentioned" | ""
  >("");

  const [search, setSearch] = useState<string>(``);

  useEffect(() => {
    if (pathname.includes("issues/assigned")) {
      setIssueType("assigned");
      setSearch(`is:open is:issue assignee:xxxxx archived:false`);
    } else if (pathname.includes("issues/mentioned")) {
      setIssueType("mentioned");
      setSearch(`is:open is:issue mentions:xxxxx archived:false`);
    } else {
      setIssueType("created");
      setSearch(`is:open is:issue author:xxxxx archived:false`);
    }
  }, [pathname]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(e.currentTarget.value),
    []
  );

  return (
    <section className="sm:px-8 py-6 max-w-6xl m-auto">
      <div className="md:flex justify-between gap-4 px-4 sm:px-0">
        <div className="">
          <span className="isolate inline-flex rounded-md shadow-sm w-full">
            <Link
              href={`/issues/`}
              type="button"
              className={clsx(
                "relative inline-flex w-full md:w-min items-center rounded-l-md px-4 py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
                {
                  "bg-purple-600 text-slate-50": issueType === `created`,
                }
              )}
            >
              Created
            </Link>
            <Link
              href={`/issues/assigned`}
              type="button"
              className={clsx(
                "relative inline-flex w-full md:w-min items-center rounded-l-md px-4 py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
                {
                  "bg-purple-600 text-slate-50": issueType === `assigned`,
                }
              )}
            >
              Assigned
            </Link>
            <Link
              href={`/issues/mentioned`}
              type="button"
              className={clsx(
                "relative inline-flex w-full md:w-min items-center rounded-l-md px-4 py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
                {
                  "bg-purple-600 text-slate-50": issueType === `mentioned`,
                }
              )}
            >
              Mentioned
            </Link>
          </span>
        </div>

        <label className="relative w-full border-slate-600 text-slate-400 border rounded-md">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center px-2">
            <Search className="h-4 w-4" />
          </span>
          <input
            className="block bg-[#0E1116] w-full h-full rounded-md py-1 pl-9 pr-3 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 text-sm md:text-base"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </label>
      </div>
      {children}
    </section>
  );
}
