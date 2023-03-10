"use client";

import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { clsx } from "clsx";
import {
  Check,
  ChevronDown,
  CircleDot,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  Search,
} from "lucide-react";

interface IPullsData {
  id: string;
  entity: string;
  repo: string;
  title: string;
  number: string;
  date: string;
  author: string;
  tags: string[];
  taskTotal: number | null;
  taskCompleted: number | null;
  linkedPR: number;
  assignees: string[];
  comments: number;
}

export default function PullsPage({}) {
  const [issueType, setIssueType] = useState<
    "created" | "assigned" | "mentioned" | "request"
  >("created");

  const [search, setSearch] = useState<string>(
    `is:open is:issue author:xxxxx archived:false`
  );
  const [issues, setIssues] = useState<IPullsData[]>(openData);
  const [issueStatus, setIssueStatus] = useState<"open" | "closed">("open");

  useEffect(() => {
    if (issueStatus === "open") {
      setIssues(openData);
    } else {
      setIssues(closedData);
    }
  }, [issueStatus]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(e.currentTarget.value),
    []
  );

  const handleIssueStatusOpen = useCallback(() => setIssueStatus("open"), []);
  const handleIssueStatusClosed = useCallback(
    () => setIssueStatus("closed"),
    []
  );

  const handleIssueTypeCreated = useCallback(() => setIssueType("created"), []);
  const handleIssueTypeAssigned = useCallback(
    () => setIssueType("assigned"),
    []
  );
  const handleIssueTypeMentioned = useCallback(
    () => setIssueType("mentioned"),
    []
  );
  const handleRequestTypeMentioned = useCallback(
    () => setIssueType("request"),
    []
  );

  return (
    <section className="sm:px-8 py-6 max-w-6xl m-auto">
      <div className="lg:flex justify-between gap-4 px-4 sm:px-0">
        <div className="isolate inline-flex rounded-md text-sm lg:text-base shadow-sm w-full mb-4 lg:mb-0">
          <button
            type="button"
            className={clsx(
              "relative w-full rounded-l-md py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
              {
                "bg-purple-600 text-slate-50": issueType === `created`,
              }
            )}
            onClick={handleIssueTypeCreated}
          >
            Created
          </button>
          <button
            type="button"
            className={clsx(
              "relative -ml-px w-full py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
              {
                "bg-purple-600 text-slate-50": issueType === `assigned`,
              }
            )}
            onClick={handleIssueTypeAssigned}
          >
            Assigned
          </button>
          <button
            type="button"
            className={clsx(
              "relative -ml-px w-full py-1.5 font-semibold rounded-r-md md:rounded-none text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
              {
                "bg-purple-600 text-slate-50": issueType === `mentioned`,
              }
            )}
            onClick={handleIssueTypeMentioned}
          >
            Mentioned
          </button>
          <button
            type="button"
            className={clsx(
              "hidden relative md:block -ml-px w-full rounded-r-md py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
              {
                "bg-purple-600 text-slate-50": issueType === `request`,
              }
            )}
            onClick={handleRequestTypeMentioned}
          >
            Review requests
          </button>
        </div>

        <label className="relative w-full text-slate-400">
          <span className="sr-only">Search</span>
          <span className="absolute mt-2 lg:mt-0 lg:inset-y-0 lg:left-0 flex items-center px-2">
            <Search className="h-8 w-4" />
          </span>
          <input
            className="block bg-[#0E1116] w-full rounded-md py-1 pl-9 pr-3 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 text-sm md:text-base"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </label>
      </div>
      <main>
        <div className="mt-4">
          <div className="flex w-full rounded-md rounded-bl-none rounded-br-none border bg-[#171B21] py-2 px-4 dark:border-[#383B42] dark:text-slate-100">
            <div className="md:flex w-full flex-col text-md py-2 items-start justify-between lg:flex-row lg:items-center">
              <div className="flex items-center lg:flex-row space-x-4 font-medium">
                <button
                  className={clsx("flex text-slate-400 hover:text-slate-200", {
                    "text-slate-50": issueStatus === `open`,
                  })}
                  onClick={handleIssueStatusOpen}
                >
                  <CircleDot className="h-5 w-5 mr-2 mt-0.5" /> 3 Open
                </button>
                <button
                  className={clsx("flex text-slate-400 hover:text-slate-200", {
                    "text-slate-50": issueStatus === `closed`,
                  })}
                  onClick={handleIssueStatusClosed}
                >
                  <Check className="h-5 w-5 mr-2 mt-0.5" /> 4 Closed
                </button>
              </div>
              <div className="mt-2 flex text-gray-400 lg:mt-0 space-x-6">
                <span className="flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Visibility <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
                <span className="flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Organization <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
                <span className="flex text-slate-400 hover:text-slate-200 cursor-pointer">
                  Sort <ChevronDown className="h-4 w-4 ml-1 mt-1.5" />
                </span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-md rounded-tr-none rounded-tl-none border border-t-0 dark:border-gray">
            <ul className="divide-y dark:divide-gray">
              {issues.map((item) => (
                <li
                  key={`${item.id} ${item.entity}`}
                  className="text-gray-400 grid grid-cols-8 p-2 text-sm hover:bg-[#171B21]"
                >
                  <div className="col-span-8 sm:col-span-6">
                    <div className="sm:flex items-center text-lg font-medium">
                      <span className="flex">
                        {issueStatus === "open" ? (
                          <GitPullRequest className="h-5 w-5 mr-2 mt-1 text-green-600" />
                        ) : (
                          <GitMerge className="h-5 w-5 mr-2 mt-1 text-purple-600" />
                        )}
                        <a
                          className="text-slate-400 hover:text-purple-500"
                          href="#"
                        >
                          {item.entity}/{item.repo}
                        </a>
                      </span>

                      <a
                        className="text-slate-200 hover:text-purple-500 pl-7 sm:pl-3"
                        href="#"
                      >
                        {item.title}
                      </a>
                    </div>
                    {issueStatus === "open" ? (
                      <div className="ml-7 text-slate-400">
                        #{item.number} opened {item.date} by{" "}
                        <a className="hover:text-purple-500" href="#">
                          {item.author}
                        </a>
                      </div>
                    ) : (
                      <div className="ml-7 text-slate-400">
                        #{item.number} by{" "}
                        <a className="hover:text-purple-500" href="#">
                          {item.author}
                        </a>{" "}
                        was merged {item.date}
                      </div>
                    )}
                  </div>

                  <div className="hidden sm:flex col-span-2 text-slate-400 justify-between pt-2 text-right pr-3 no-wrap">
                    <span className="ml-2 "></span>
                    <span className="ml-2 flex hover:text-purple-500 cursor-pointer font-medium">
                      {item.comments ? (
                        <>
                          <MessageSquare className="h-5 w-5 mr-2" />
                          {item.comments}
                        </>
                      ) : null}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </section>
  );
}

const openData = [
  {
    id: "101",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "Make GHA required",
    number: "59",
    date: "2 hours ago",
    author: "pierresisson",
    tags: [],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 0,
    assignees: [],
    comments: 0,
  },
  {
    id: "102",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "Which github actions do we need?",
    number: "55",
    date: "2 hours ago",
    author: "pierresisson",
    tags: ["core", "discussion"],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 1,
    assignees: [],
    comments: 4,
  },
  {
    id: "103",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "use nostr-relaypool-ts?",
    number: "28",
    date: "yesterday",
    author: "PeerRich",
    tags: ["core", "discussion"],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 0,
    assignees: [],
    comments: 2,
  },
];

const closedData = [
  {
    id: "201",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "fix two arrow functions",
    number: "58",
    date: "4 hours ago",
    author: "brycedev",
    tags: [],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 0,
    assignees: [],
    comments: 3,
  },
  {
    id: "202",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "Add default pull request template ",
    number: "49",
    date: "6 hours ago",
    author: "pierresisson",
    tags: ["core", "discussion"],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 0,
    assignees: [],
    comments: 12,
  },
  {
    id: "203",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "Update coding conventions.",
    number: "36",
    date: "16 hours ago",
    author: "cypherhoodlum",
    tags: ["core", "discussion"],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 1,
    assignees: [],
    comments: 1,
  },
  {
    id: "204",
    entity: "NostrGit",
    repo: "NostrGit",
    title: "move to next.js app directory",
    number: "12",
    date: "yesterday",
    author: "brycedev",
    tags: ["core", "discussion"],
    taskTotal: null,
    taskCompleted: null,
    linkedPR: 0,
    assignees: [],
    comments: 5,
  },
];
