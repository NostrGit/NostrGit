"use client";

import Banner from "@/components/banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { clsx } from "clsx";
import {
  BarChart4,
  Book,
  ChevronDown,
  CircleDot,
  Code,
  Eye,
  GitFork,
  GitPullRequest,
  Globe2,
  MessageCircle,
  Settings,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RepoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { entity: string; repo: string; subpage?: string };
}) {
  const pathname = usePathname() || "";

  return (
    <>
      <section className="px-8 py-6">
        <div className="justify-between overflow-hidden flex flex-col lg:flex-row">
          <div className="mb-4 flex items-center text-lg">
            <Book className="mr-2 inline h-4 w-4 text-gray-400" />
            <Link
              className="text-purple-500 hover:underline"
              href={`/${params.entity}`}
            >
              {params.entity}
            </Link>
            <span className="text-gray-400 px-2">/</span>
            <Link
              className="text-purple-500 hover:underline"
              href={`/${params.entity}/${params.repo}`}
            >
              {params.repo}
            </Link>
            <span className="border-gray-200/40 text-gray-400 ml-1.5 mt-px rounded-full border px-1.5 text-xs">
              Public
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-8 !border-[#383B42] bg-[#22262C] text-xs md:hidden"
                variant="outline"
              >
                Actions <ChevronDown className="ml-2 h-4 w-4 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-8 mt-2">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> Unwatch
                <Badge className="ml-2">148</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Zap className="mr-2 h-4 w-4" /> Zaps
                <Badge className="ml-2">1337</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe2 className="mr-2 h-4 w-4" /> Relays
                <Badge className="ml-2">8</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitFork className="mr-2 h-4 w-4" /> Fork
                <Badge className="ml-2">209</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitFork className="mr-2 h-4 w-4" /> Fork
                <Badge className="ml-2">209</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4 text-yellow-500" /> Starred
                <Badge className="ml-2">7k</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex justify-end">
            <div className="hidden md:flex md:flex-row md:gap-2">
              <Button
                className="h-8 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Eye className="mr-2 h-4 w-4" /> Unwatch
                <Badge className="ml-2">148</Badge>
              </Button>
              <Button
                className="h-8 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Zap className="mr-2 h-4 w-4" /> Zaps
                <Badge className="ml-2">1337</Badge>
              </Button>
              <Button
                className="h-8 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Globe2 className="mr-2 h-4 w-4" /> Relays
                <Badge className="ml-2">8</Badge>
              </Button>
              <Button
                className="h-8 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <GitFork className="mr-2 h-4 w-4" /> Fork
                <Badge className="ml-2">209</Badge>
              </Button>
              <Button
                className="h-8 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Star className="mr-2 h-4 w-4 text-yellow-500" /> Starred
                <Badge className="ml-2">7k</Badge>
              </Button>
            </div>
          </div>
        </div>

        <ul className="my-4 flex w-full items-center gap-x-4 overflow-hidden">
          <li>
            <Link
              href={`/${params.entity}/${params.repo}`}
              className={clsx(
                "mr-2 flex h-4 items-center whitespace-nowrap border-b-2 border-transparent transition-all ease-in-out p-4 text-sm",
                {
                  "border-b-purple-600":
                    pathname === `/${params.entity}/${params.repo}`,
                }
              )}
            >
              <Code className="mr-2 h-4 w-4" />
              Code
            </Link>
          </li>
          <li>
            <Link
              href={`/${params.entity}/${params.repo}/issues`}
              className={clsx(
                "mr-2 flex h-4 items-center whitespace-nowrap border-b-2 border-transparent transition-all ease-in-out p-4 text-sm",
                {
                  "border-b-purple-600": pathname.includes(
                    `/${params.entity}/${params.repo}/issues`
                  ),
                }
              )}
            >
              <CircleDot className="mr-2 h-4 w-4" />
              Issues <Badge className="ml-2">36</Badge>
            </Link>
          </li>
          <li>
            <Link
              href={`/${params.entity}/${params.repo}/pulls`}
              className={clsx(
                "mr-2 flex h-4 items-center whitespace-nowrap border-b-2 border-transparent transition-all ease-in-out p-4 text-sm",
                {
                  "border-b-purple-600": pathname.includes(
                    `/${params.entity}/${params.repo}/pulls`
                  ),
                }
              )}
            >
              <GitPullRequest className="mr-2 h-4 w-4" />
              Pull Requests <Badge className="ml-2">3</Badge>
            </Link>
          </li>
          <li>
            <Link
              href={`/${params.entity}/${params.repo}/discussions`}
              className={clsx(
                "mr-2 flex h-4 items-center whitespace-nowrap border-b-2 border-transparent transition-all ease-in-out p-4 text-sm",
                {
                  "border-b-purple-600": pathname.includes(
                    `/${params.entity}/${params.repo}/discussions`
                  ),
                }
              )}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Discussions
            </Link>
          </li>
          <li>
            <Link
              href={`/${params.entity}/${params.repo}/insights`}
              className={clsx(
                "mr-2 flex h-4 items-center whitespace-nowrap border-b-2 border-transparent transition-all ease-in-out p-4 text-sm",
                {
                  "border-b-purple-600": pathname.includes(
                    `/${params.entity}/${params.repo}/insights`
                  ),
                }
              )}
            >
              <BarChart4 className="mr-2 h-4 w-4" />
              Insights
            </Link>
          </li>
          <li>
            <Link
              href={`/${params.entity}/${params.repo}/settings`}
              className={clsx(
                "mr-2 flex h-4 items-center whitespace-nowrap border-b-2 border-transparent transition-all ease-in-out p-4 text-sm",
                {
                  "border-b-purple-600": pathname.includes(
                    `/${params.entity}/${params.repo}/settings`
                  ),
                }
              )}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </li>
        </ul>

        <hr className="w-[calc(100% + 32px)] -mx-8 -mt-4 border-b-0 border-gray" />

        {children}
      </section>
      <Banner
        title="Contribute"
        description="Join our GitHub project (until NostrGit is ready)"
        link="https://github.com/NostrGit/NostrGit/issues/145"
      />
    </>
  );
}
