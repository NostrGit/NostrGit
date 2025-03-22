"use client";

import { useEffect, useState } from "react";

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
  MoreHorizontal,
  Settings,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    link: "",
    name: "Code",
    icon: <Code className="mr-2 h-4 w-4" />,
  },
  {
    link: "issues",
    name: "Issues",
    icon: <CircleDot className="mr-2 h-4 w-4" />,
    badge: <Badge className="ml-2">36</Badge>,
  },
  {
    link: "pulls",
    name: "Pull Requests",
    icon: <GitPullRequest className="mr-2 h-4 w-4" />,
    badge: <Badge className="ml-2">3</Badge>,
  },
  {
    link: "discussions",
    name: "Discussions",
    icon: <MessageCircle className="mr-2 h-4 w-4" />,
  },
  {
    link: "insights",
    name: "Insights",
    icon: <BarChart4 className="mr-2 h-4 w-4" />,
  },
  {
    link: "settings",
    name: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];
const MENU_ITEM_WIDTH = 165;

export default function RepoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { entity: string; repo: string; subpage?: string };
}) {
  const pathname = usePathname() || "";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  function onClick() {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
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
            <span className="border-lightgray text-gray-400 ml-1.5 mt-px rounded-full border px-1.5 text-xs">
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

        <div className="flex justify-between items-center">
          <ul className="my-4 flex w-full items-center gap-x-4">
            {menuItems
              .slice(0, Math.floor(windowWidth / MENU_ITEM_WIDTH))
              .map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/${params.entity}/${params.repo}${
                      item.link ? `/${item.link}` : ""
                    }`}
                    className={clsx(
                      "mr-2 flex h-4 items-center whitespace-nowrap border-b-2 border-transparent transition-all ease-in-out p-4 text-sm",
                      {
                        "border-b-purple-600":
                          item.name === "Code"
                            ? pathname === `/${params.entity}/${params.repo}`
                            : pathname.includes(
                                `/${params.entity}/${params.repo}/${item.link}`
                              ),
                      }
                    )}
                  >
                    {item.icon}
                    {item.name} {item.badge}
                  </Link>
                </li>
              ))}
          </ul>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className={clsx("block", {
              "hidden":
                (menuItems.length - Math.floor(windowWidth / MENU_ITEM_WIDTH)) === 0
            })}>
              <div className="flex items-center cursor-pointer">
                <MoreHorizontal className="h-4 w-4 hover:text-white/80" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-1 px-0 w-40 relative -left-4 top-1">
              {menuItems
                .slice(
                  -(
                    menuItems.length - Math.floor(windowWidth / MENU_ITEM_WIDTH)
                  )
                )
                .map((item) => (
                  <DropdownMenuItem key={item.name} className="p-0">
                    <Link
                      onClick={onClick}
                      href={`/${params.entity}/${params.repo}${
                        item.link ? `/${item.link}` : ""
                      }`}
                      className={clsx(
                        "w-full flex h-9 items-center whitespace-nowrap border-transparent transition-all ease-in-out p-4 text-sm text-white hover:bg-purple-600",
                        {
                          "border-b-purple-600":
                            item.name === "Code"
                              ? pathname === `/${params.entity}/${params.repo}`
                              : pathname.includes(
                                  `/${params.entity}/${params.repo}/${item.link}`
                                ),
                        }
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <hr className="w-full -mt-[17px] border-b-0 border-lightgray" />

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
