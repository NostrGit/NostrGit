"use client";
import DemoReadme from "@/components/demo-readme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contributors } from "@/components/ui/contributors";
import { ListHeader } from "@/components/ui/list-header";

import {
  BookOpen,
  ChevronDown,
  Code,
  Eye,
  File,
  Folder,
  GitBranch,
  GitFork,
  History,
  List,
  Settings,
  Star,
  Tag,
  Globe,
  Feather,
} from "lucide-react";
import Link from "next/link";

import { useRepositoryContext } from "@/lib/nostr/RepositoryContext";

export default function RepoCodePage({
  params,
}: {
  params: { entity: string; repo: string };
}) {
  const { metadata, followers, repo } = useRepositoryContext();
  return (
    <div className="mt-4 grid grid-cols-2 gap-6 lg:grid-cols-4">
      <div className="col-span-3 lg:col-span-3">
        <div className="flex flex-col justify-between gap-y-4 overflow-hidden lg:flex-row lg:gap-y-0">
          <div>
            <div className="flex items-center  gap-4 text-sm">
              <Button className="h-8 !border-gray bg-dark " variant="outline">
                <GitBranch className="text-gray-400 mr-2 h-4 w-4" /> main{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-white" />
              </Button>
              <div>
                <GitBranch className="text-gray-400 inline h-4 w-4" /> 3{" "}
                <span className="text-gray-400">branches</span>
              </div>
              <div>
                <Tag className="text-gray-400 inline h-4 w-4" /> 1{" "}
                <span className="text-gray-400">tags</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="h-8 !border-gray bg-dark" variant="outline">
              Go to file
            </Button>
            <Button className="h-8 !border-gray bg-dark" variant="outline">
              Add file
              <ChevronDown className="ml-2 h-4 w-4 text-white" />
            </Button>
            <Button className="h-8" variant="success">
              <Code className="mr-2 h-4 w-4 text-white" /> Code
              <ChevronDown className="ml-2 h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        <main className="mt-4">
          <ListHeader
            icon={
              <Link href="/FlannelDipole">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/50970165?s=48&amp;v=4" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            }
            title={
              <>
                <strong>FlannelDipole</strong>
                {/* <span className="text-gray-400">
                  Fixed grammatical and sentence structure issues.{" "}
                  <Link href="#" className="text-purple-500">
                    (#112)
                  </Link>
                </span> */}
              </>
            }
            description="Fixed grammatical and sentence structure issues."
            actionArea={
              <div className="text-gray-400">
                <Link href="#">cdcc98f last month</Link>{" "}
                <Link href="#" className="text-white hover:text-purple-500">
                  <History className="ml-2 mr-1 -mt-0.5 inline h-4 w-4" /> 128
                  commits
                </Link>
              </div>
            }
          />
          <div className="overflow-hidden rounded-md rounded-tr-none rounded-tl-none border border-t-0 dark:border-gray">
            <ul className="divide-y dark:divide-gray">
              <li className="text-gray-400 grid grid-cols-4 p-2 text-sm hover:bg-[#171B21]">
                <div className="flex items-center gap-2">
                  <Folder className="text-gray-400 ml-2 h-4 w-4" />{" "}
                  <a className="hover:text-purple-500 hover:underline" href="#">
                    nips
                  </a>
                </div>
                <div className="col-span-2">
                  <a className="hover:text-purple-500 hover:underline" href="#">
                    move nips to the dedicated nips repo and update readme.
                  </a>
                </div>
                <div className="text-right">last year</div>
              </li>
              <li className="text-gray-400 grid grid-cols-4 p-2 text-sm hover:bg-[#171B21]">
                <div className="flex items-center gap-2 ">
                  <File className="text-gray-400 ml-2 h-4 w-4" />{" "}
                  <a className="hover:text-purple-500 hover:underline" href="#">
                    README.md
                  </a>
                </div>
                <div className="col-span-2">
                  <a className="hover:text-purple-500 hover:underline" href="#">
                    Fixed grammatical and sentence structure issues. (
                    <span className="text-purple-500 hover:underline">
                      #112
                    </span>
                    )
                  </a>
                </div>
                <div className="text-right">last year</div>
              </li>
            </ul>
          </div>
          <div className="mt-4 rounded-md border dark:border-[#383B42]">
            <div className="flex items-center gap-2 border-b p-2 dark:border-[#383B42]">
              <List className="text-gray-400 ml-2 h-4 w-4" />{" "}
              <a
                className="hover:text-purple-500 hover:underline"
                href="#readme"
              >
                README.md
              </a>
            </div>
            <article
              id="readme"
              className="prose max-w-full p-4 text-white dark:prose-invert prose-a:text-purple-500"
            >
              <DemoReadme /> {/* TODO: use next-markdown here */}
            </article>
          </div>
        </main>
      </div>

      <aside className="col-span-3 space-y-2 lg:col-span-1">
        <div className="flex justify-between">
          <h3 className="font-bold">About</h3>
          <Settings className="text-gray-400 h-4 w-4" />
        </div>
        <p className="pb-2">
          {metadata?.about}
        </p>
        <Badge className="mr-2">nostr</Badge>
        <Badge className="mr-2">git</Badge>
        <ul className="text-gray-400 space-y-2 border-b border-gray pt-4 pb-8 text-sm">
          <li>
            <Globe className="mr-2 inline h-4 w-4" />
            <a href={metadata?.website} target="_blank"  className="text-purple-500 hover:underline">
              Website
            </a>
          </li>
           <li>
            <Feather className="mr-2 inline h-4 w-4" />
            <a href={`https://snort.social/p/${repo?.pubkey || ""}`} target="_blank"  className="text-purple-500 hover:underline">
              snort.social
            </a>
           </li>
          <li>
            <BookOpen className="mr-2 inline h-4 w-4" />
            Readme
          </li>
          <li>
            <Star className="mr-2 inline h-4 w-4" />
            <strong>{followers?.length}</strong> stars
          </li>
          <li>
            <Eye className="mr-2 inline h-4 w-4" />
            <strong>148</strong> watching
          </li>
          <li>
            <GitFork className="mr-2 inline h-4 w-4" />
            <strong>209</strong> forks
          </li>
        </ul>
        <div className="">
          <h3 className="mb-4 font-bold">
            Contributors <Badge className="ml-2">19</Badge>
          </h3>
          <Contributors />
        </div>
      </aside>
    </div>
  );
}
