import DemoReadme from "@/components/demo-readme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contributors } from "@/components/ui/contributors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  MoreHorizontal,
  Settings,
  Star,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function RepoCodePage({
  params,
}: {
  params: { entity: string; repo: string };
}) {
  console.log(params); // fixing lint and debug only
  return (
    <div className="mt-4 grid grid-cols-2 gap-6 lg:grid-cols-4">
      <div className="col-span-3 lg:col-span-3">
        <div className="flex justify-between flex-row">
          <div>
            <div className="flex items-center  gap-4 text-sm">
              <Button
                className="h-8 !border-lightgray bg-dark "
                variant="outline"
              >
                <GitBranch className="text-gray-400 mr-2 h-4 w-4" /> main{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-white" />
              </Button>
              <div className="hidden lg:inline-block">
                <GitBranch className="text-gray-400 inline h-4 w-4" /> 3{" "}
                <span className="text-gray-400">branches</span>
              </div>
              <div className="hidden lg:inline-block">
                <Tag className="text-gray-400 inline h-4 w-4" /> 1{" "}
                <span className="text-gray-400">tags</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:gap-2">
            <Button
              className="truncate h-8 !border-lightgray bg-dark"
              variant="outline"
            >
              Go to file
            </Button>
            <Button
              className="truncate h-8 !border-lightgray bg-dark"
              variant="outline"
            >
              Add file
              <ChevronDown className="ml-2 h-4 w-4 text-white" />
            </Button>
            <Button className="truncate h-8" variant="success">
              <Code className="mr-2 h-4 w-4 text-white" /> Code
              <ChevronDown className="ml-2 h-4 w-4 text-white" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button
                className="h-8 !border-lightgray bg-dark"
                variant="outline"
              >
                <MoreHorizontal className="text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-2 relative -left-6 top-1 w-[9.5rem]">
              <DropdownMenuItem className="mt-1 mb-2 text-white font-normal">
                <Link href={""}>Go to file</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-white font-normal">
                <Link href={""}>Add file</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            description="Fixed grammatical and sentence12 Fixed grammatical and sentence "
            lastCommitHash="cdcc98f"
            lastCommitMessage="implement landing page"
            actionArea={
              <div className="text-gray-400">
                <Link href="#" className="text-sm font-normal">
                  <span className="hidden text-xs xl:inline-flex">
                    cdcc98f &nbsp;{" "}
                  </span>
                  last month
                </Link>{" "}
                <Link href="#" className="text-white hover:text-purple-500">
                  <History className="ml-2 mr-1 -mt-0.5 inline h-4 w-4" />
                  <span className="hidden min-[508px]:inline-block">
                    128&nbsp;
                  </span>
                  <span className="hidden font-normal text-gray-400 xl:inline-flex">
                    commits
                  </span>
                </Link>
              </div>
            }
          />
          <div className="overflow-hidden rounded-md rounded-tr-none rounded-tl-none border border-t-0 dark:border-lightgray">
            <ul className="divide-y dark:divide-lightgray">
              <li className="text-gray-400 grid grid-cols-2 p-2 text-sm sm:grid-cols-4 hover:bg-[#171B21]">
                <div className="flex items-center gap-2">
                  <Folder className="text-gray-400 ml-2 h-4 w-4" />{" "}
                  <a className="hover:text-purple-500 hover:underline" href="#">
                    nips
                  </a>
                </div>
                <div className="hidden col-span-2 sm:block">
                  <a className="hover:text-purple-500 hover:underline" href="#">
                    move nips to the dedicated nips repo and update readme.
                  </a>
                </div>
                <div className="text-right">last year</div>
              </li>
              <li className="text-gray-400 grid grid-cols-2 p-2 text-sm sm:grid-cols-4 hover:bg-[#171B21]">
                <div className="flex items-center gap-2 ">
                  <File className="text-gray-400 ml-2 h-4 w-4" />{" "}
                  <a
                    className="truncate hover:text-purple-500 hover:underline"
                    href="#"
                  >
                    README.md
                  </a>
                </div>
                <div className="hidden col-span-2 sm:block">
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
          a truly censorship-resistant alternative to Twitter that has a chance
          of working
        </p>
        <Badge className="mr-2">nostr</Badge>
        <Badge className="mr-2">git</Badge>
        <ul className="text-gray-400 space-y-2 border-b border-lightgray pt-4 pb-8 text-sm">
          <li>
            <BookOpen className="mr-2 inline h-4 w-4" />
            Readme
          </li>
          <li>
            <Star className="mr-2 inline h-4 w-4" />
            <strong>7k</strong> stars
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
