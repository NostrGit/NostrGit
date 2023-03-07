"use client";

import * as React from "react";

import { clsx } from "clsx";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  GitMerge,
  MessageSquare,
  Search,
} from "lucide-react";

export default function IssuesPage({}) {
  const [issueType, setIssueType] = React.useState<
    "created" | "assigned" | "mentioned"
  >("created");

  const [search, setSearch] = React.useState<string>(
    `is:open is:issue author:xxxxx archived:false`
  );
  const [issues, setIssues] = React.useState<IIssueData[]>(openData);
  const [issueStatus, setIssueStatus] = React.useState<"open" | "closed">(
    "open"
  );

  React.useEffect(() => {
    if (issueStatus === "open") {
      setIssues(openData);
    } else {
      setIssues(closedData);
    }
  }, [issueStatus]);

  return (
    <>
      <section className="sm:px-8 py-6 max-w-6xl m-auto">
        <div className="md:flex justify-between gap-4 px-4 sm:px-0">
          <div className="">
            <span className="isolate inline-flex rounded-md shadow-sm w-full">
              <button
                type="button"
                className={clsx(
                  "relative inline-flex w-full md:w-min items-center rounded-l-md px-4 py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
                  {
                    "bg-purple-600 text-slate-50": issueType === `created`,
                  }
                )}
                onClick={() => setIssueType("created")}
              >
                Created
              </button>
              <button
                type="button"
                className={clsx(
                  "relative -ml-px inline-flex w-full md:w-min items-center px-4 py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
                  {
                    "bg-purple-600 text-slate-50": issueType === `assigned`,
                  }
                )}
                onClick={() => setIssueType("assigned")}
              >
                Assigned
              </button>
              <button
                type="button"
                className={clsx(
                  "relative -ml-px inline-flex w-full md:w-min items-center rounded-r-md px-4 py-1.5 font-semibold text-slate-300 ring-1 ring-inset ring-slate-600 focus:z-10",
                  {
                    "bg-purple-600 text-slate-50": issueType === `mentioned`,
                  }
                )}
                onClick={() => setIssueType("mentioned")}
              >
                Mentioned
              </button>
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        <main>
          <div className="mt-4 rounded-md border dark:border-[#383B42]">
            <div className="flex w-full rounded-md rounded-bl-none rounded-br-none border bg-[#171B21] py-2 px-4 dark:border-[#383B42] dark:text-slate-100">
              <div className="md:flex w-full flex-col text-md py-2 items-start justify-between lg:flex-row lg:items-center">
                <div className="flex items-center lg:flex-row space-x-4 font-medium">
                  <button
                    className={clsx(
                      "flex text-slate-400 hover:text-slate-200",
                      {
                        "text-slate-200": issueStatus === `open`,
                      }
                    )}
                    onClick={() => setIssueStatus("open")}
                  >
                    <CircleDot className="h-5 w-5 mr-2 mt-0.5" /> 3 Open
                  </button>
                  <button
                    className={clsx(
                      "flex text-slate-400 hover:text-slate-200",
                      {
                        "text-slate-200": issueStatus === `closed`,
                      }
                    )}
                    onClick={() => setIssueStatus("closed")}
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
                {issues.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-400 grid grid-cols-8 p-2 text-sm hover:bg-[#171B21]"
                  >
                    <div className="col-span-8 sm:col-span-6">
                      <div className="sm:flex items-center text-lg font-medium">
                        <span className="flex">
                          {issueStatus === "open" ? (
                            <CircleDot className="h-5 w-5 mr-2 mt-1 text-green-600" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 mr-2 mt-1 text-purple-600" />
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
                      <div className="ml-7 text-slate-400">
                        #{item.number} opened {item.date} by{" "}
                        <a className="hover:text-purple-500" href="#">
                          {item.author}
                        </a>
                      </div>
                    </div>

                    <div className="hidden sm:flex col-span-2 text-slate-400 justify-between pt-2 text-right pr-3 no-wrap">
                      <span className="ml-2 flex hover:text-purple-500 cursor-pointer font-medium">
                        {item.linkedPR ? (
                          <>
                            <GitMerge className="h-5 w-5 mr-2" />
                            {item.linkedPR}
                          </>
                        ) : null}
                      </span>
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
    </>
  );
}

interface IIssueData {
  id: number;
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

const openData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
