"use client";

import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { clsx } from "clsx";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  GitPullRequest,
  MessageSquare,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

interface IIssueData {
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

export default function IssuesPage({}) {
  const [issues, setIssues] = useState<IIssueData[]>(openData);
  const [issueStatus, setIssueStatus] = useState<"open" | "closed">("open");

  const searchParams = useSearchParams()!;

  const q = searchParams.get("q");

  console.log("q ====> ", q);

  useEffect(() => {
    if (issueStatus === "open") {
      setIssues(openData);
    } else {
      setIssues(closedData);
    }
  }, [issueStatus]);

  const handleIssueStatusOpen = useCallback(() => setIssueStatus("open"), []);
  const handleIssueStatusClosed = useCallback(
    () => setIssueStatus("closed"),
    []
  );

  return (
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
                        <GitPullRequest className="h-5 w-5 mr-2" />
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
