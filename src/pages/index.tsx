import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BarChart4,
  Book,
  BookOpen,
  ChevronDown,
  CircleDot,
  Code,
  Eye,
  File,
  Folder,
  GitBranch,
  GitFork,
  GitPullRequest,
  Globe2,
  History,
  List,
  MessageCircle,
  Settings,
  Star,
  Tag,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/ui/header";
import { Contributors } from "@/components/ui/contributors";
import Banner from "@/components/banner";
import DemoReadme from "@/components/demo-readme";
import { ListHeader } from "@/components/ui/list-header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NostrGit</title>
        <meta
          name="description"
          content="A truly censorship-resistant alternative to GitHub that has a chance of working."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ minWidth: 1080 }}
        className="dark min-h-screen bg-white text-white dark:bg-[#0E1116]"
      >
        <Header />

        <section className="px-8 py-6">
          <div className="justify-between lg:flex">
            <div className="mb-4 flex items-center text-lg">
              <Book className="mr-2 inline h-4 w-4 text-gray-400" />
              <Link className="text-purple-500" href="#">
                nostr-protocol
              </Link>
              <span className="px-2 text-gray-400">/</span>
              <Link className="text-purple-500" href="#">
                nostr
              </Link>
              <span className="ml-1.5 mt-px rounded-full border border-gray-200/40 px-1.5 text-xs text-gray-400">
                Public
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                className="lg:none h-7 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                Actions <ChevronDown className="ml-2 h-4 w-4 text-white" />
              </Button>
              <Button
                className="h-7 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Eye className="mr-2 h-4 w-4" /> Unwatch{" "}
                <Badge className="ml-2">148</Badge>
              </Button>
              <Button
                className="h-7 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Zap className="mr-2 h-4 w-4" /> Zaps{" "}
                <Badge className="ml-2">1337</Badge>
              </Button>
              <Button
                className="h-7 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Globe2 className="mr-2 h-4 w-4" /> Relays{" "}
                <Badge className="ml-2">8</Badge>
              </Button>
              <Button
                className="h-7 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <GitFork className="mr-2 h-4 w-4" /> Fork{" "}
                <Badge className="ml-2">209</Badge>
              </Button>
              <Button
                className="h-7 !border-[#383B42] bg-[#22262C] text-xs"
                variant="outline"
              >
                <Star className="mr-2 h-4 w-4 text-yellow-500" /> Starred{" "}
                <Badge className="ml-2">7k</Badge>
              </Button>
            </div>
          </div>

          <ul className="my-4 flex w-full items-center gap-x-4">
            <li>
              <Link
                href="#"
                className="w- mr-2 flex h-4 items-center border-b-2 border-purple-500 p-4 text-sm"
              >
                <Code className="mr-2 h-4 w-4" />
                Code
              </Link>
            </li>
            <li>
              <Link href="#" className="w- mr-2 flex h-4 items-center text-sm">
                <CircleDot className="mr-2 h-4 w-4" />
                Issues <Badge className="ml-2">36</Badge>
              </Link>
            </li>
            <li>
              <Link href="#" className="w- mr-2 flex h-4 items-center text-sm">
                <GitPullRequest className="mr-2 h-4 w-4" />
                Pull Requests <Badge className="ml-2">3</Badge>
              </Link>
            </li>
            <li>
              <Link href="#" className="w- mr-2 flex h-4 items-center text-sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Discussions
              </Link>
            </li>
            <li>
              <Link href="#" className="w- mr-2 flex h-4 items-center text-sm">
                <BarChart4 className="mr-2 h-4 w-4" />
                Insights
              </Link>
            </li>
            <li>
              <Link href="#" className="w- mr-2 flex h-4 items-center text-sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </li>
          </ul>

          <hr className="w-[calc(100% + 32px)] -mx-8 -mt-4 border-b-0 border-gray-400/20" />

          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="col-span-3">
              <div className="flex flex-col justify-between gap-4 lg:flex-row">
                <div>
                  <div className="flex items-center  gap-4 text-sm">
                    <Button
                      className="h-8 !border-[#383B42] bg-[#22262C] "
                      variant="outline"
                    >
                      <GitBranch className="mr-2 h-4 w-4 text-gray-400" /> main
                      <ChevronDown className="ml-2 h-4 w-4 text-white" />
                    </Button>
                    <div>
                      <GitBranch className="inline h-4 w-4 text-gray-400" /> 3{" "}
                      <span className="text-gray-400">branches</span>
                    </div>
                    <div>
                      <Tag className="inline h-4 w-4 text-gray-400" /> 1{" "}
                      <span className="text-gray-400">tags</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="h-8 !border-[#383B42] bg-[#22262C]"
                    variant="outline"
                  >
                    Go to file
                  </Button>
                  <Button
                    className="h-8 !border-[#383B42] bg-[#22262C]"
                    variant="outline"
                  >
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
                      <span className="text-gray-400">
                        Fixed grammatical and sentence structure issues.{" "}
                        <Link href="#" className="text-purple-500">
                          (#112)
                        </Link>
                      </span>
                    </>
                  }
                  actionArea={
                    <div className="text-gray-400">
                      <Link href="#">cdcc98f last month</Link>{" "}
                      <Link
                        href="#"
                        className="text-white hover:text-purple-500"
                      >
                        <History className="ml-2 mr-1 -mt-0.5 inline h-4 w-4" />{" "}
                        128 commits
                      </Link>
                    </div>
                  }
                />
                <div className="overflow-hidden rounded-md rounded-tr-none rounded-tl-none border border-t-0 dark:border-[#383B42]">
                  <ul className="divide-y dark:divide-[#383B42]">
                    <li className="grid grid-cols-4 p-2 text-sm text-gray-400 hover:bg-[#171B21]">
                      <div className="flex items-center gap-2">
                        <Folder className="ml-2 h-4 w-4 text-gray-400" />{" "}
                        <a
                          className="hover:text-purple-500 hover:underline"
                          href="#"
                        >
                          nips
                        </a>
                      </div>
                      <div className="col-span-2">
                        <a
                          className="hover:text-purple-500 hover:underline"
                          href="#"
                        >
                          move nips to the dedicated nips repo and update
                          readme.
                        </a>
                      </div>
                      <div className="text-right">last year</div>
                    </li>
                    <li className="grid grid-cols-4 p-2 text-sm text-gray-400 hover:bg-[#171B21]">
                      <div className="flex items-center gap-2 ">
                        <File className="ml-2 h-4 w-4 text-gray-400" />{" "}
                        <a
                          className="hover:text-purple-500 hover:underline"
                          href="#"
                        >
                          README.md
                        </a>
                      </div>
                      <div className="col-span-2">
                        <a
                          className="hover:text-purple-500 hover:underline"
                          href="#"
                        >
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

                <div className="mt-4 overflow-hidden rounded-md border dark:border-[#383B42]">
                  <div className="flex items-center gap-2 border-b p-2 dark:border-[#383B42]">
                    <List className="ml-2 h-4 w-4 text-gray-400" />{" "}
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
                <Settings className="h-4 w-4 text-gray-400" />
              </div>
              <p className="pb-2">
                a truly censorship-resistant alternative to Twitter that has a
                chance of working
              </p>

              <Badge className="mr-2">nostr</Badge>
              <Badge className="mr-2">git</Badge>

              <ul className="space-y-2 border-b border-gray-400/20 pt-4 pb-8 text-sm text-gray-400">
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
        </section>
        <Banner
          title="Contribute"
          description="Join our GitHub project (until NostrGit is ready)"
          link="https://github.com/NostrGit/NostrGit/issues/6"
        />
      </div>
    </>
  );
};

export default Home;
