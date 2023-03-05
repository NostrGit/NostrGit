import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
  GitBranch,
  GitFork,
  GitPullRequest,
  Globe2,
  MessageCircle,
  Settings,
  Star,
  Tag,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NostrGit</title>
        <meta
          name="description"
          content="a truly censorship-resistant alternative to GitHub that has a chance of working"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ minWidth: 1050 /* until we have mobile ready */ }}
        className="dark min-h-screen bg-white text-white dark:bg-[#0E1116]"
      >
        <header className="flex h-14 w-full justify-between bg-[#171B21] px-8">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="NostrGit" width={32} height={32} />
            <div className="max-h-12 ">
              <Input
                className=" w-[272px] bg-[#0E1116] transition-all ease-in-out focus:w-[600px]"
                type="text"
                placeholder="Search or jump to…"
              />
            </div>
            <nav className="flex gap-3 text-sm text-white">
              <Link className="hover:text-gray-400" href="#">
                Pull Requests
              </Link>
              <Link className="hover:text-gray-400" href="#">
                Issues
              </Link>
              <Link className="hover:text-gray-400" href="#">
                Explore
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/peerrich.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <section className="px-8 py-6">
          <div className="flex justify-between">
            <div className="flex items-center text-lg">
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
          <Tabs defaultValue="code" className="my-4 -ml-2 w-full">
            <TabsList>
              <TabsTrigger value="code">
                <Code className="mr-2 h-4 w-4" />
                Code
              </TabsTrigger>
              <TabsTrigger value="issues">
                <CircleDot className="mr-2 h-4 w-4" />
                Issues <Badge className="ml-2">36</Badge>
              </TabsTrigger>
              <TabsTrigger value="pr">
                <GitPullRequest className="mr-2 h-4 w-4" />
                Pull Requests <Badge className="ml-2">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="discussions">
                <MessageCircle className="mr-2 h-4 w-4" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="insights">
                <BarChart4 className="mr-2 h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <hr className="w-[calc(100% + 32px)] -mx-8 -mt-1 border-b-0 border-gray-400/20" />
            <TabsContent value="code">
              <p className="text-sm text-slate-500 dark:text-slate-400"></p>
            </TabsContent>
            <TabsContent value="issues">
              <p className="text-sm text-slate-500 dark:text-slate-400"></p>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center  gap-4 text-sm">
                    <Button
                      className="h-8 !border-[#383B42] bg-[#22262C] "
                      variant="outline"
                    >
                      <GitBranch className="mr-2 h-4 w-4 text-gray-400" /> main{" "}
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
                <div className="inline-flex h-14 w-full items-center rounded-md border bg-[#171B21] py-2 px-4 text-sm font-medium dark:border-[#383B42] dark:text-slate-100">
                  <div className="flex items-center space-x-2">
                    <a href="/FlannelDipole">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/50970165?s=48&amp;v=4" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </a>
                    <strong>FlannelDipole</strong>
                    <span className="text-gray-400">
                      Fixed grammatical and sentence structure issues.
                    </span>{" "}
                    <a className="text-purple-500" href="#">
                      (#112)
                    </a>
                  </div>
                </div>
              </main>
            </div>

            <aside className="col-span-1 space-y-2">
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

                <div>
                  <ul className="grid grid-cols-7">
                    <li className="">
                      <a
                        href="https://github.com/fiatjaf"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/fiatjaf/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/1653275?s=64&amp;v=4"
                          alt="@fiatjaf"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/scsibug"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/scsibug/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/57707?s=64&amp;v=4"
                          alt="@scsibug"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/melvincarvalho"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/melvincarvalho/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/65864?s=64&amp;v=4"
                          alt="@melvincarvalho"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/hieblmi"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/hieblmi/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/18631614?s=64&amp;v=4"
                          alt="@hieblmi"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/srid"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/srid/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/3998?s=64&amp;v=4"
                          alt="@srid"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/asoltys"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/asoltys/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/7641?s=64&amp;v=4"
                          alt="@asoltys"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/jb55"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/jb55/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/45598?s=64&amp;v=4"
                          alt="@jb55"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/schulterklopfer"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/schulterklopfer/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/397451?s=64&amp;v=4"
                          alt="@schulterklopfer"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/GlenCooper"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/GlenCooper/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/967793?s=64&amp;v=4"
                          alt="@GlenCooper"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/Kukks"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/Kukks/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/1818366?s=64&amp;v=4"
                          alt="@Kukks"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                    <li className="mb-2 mr-2">
                      <a
                        href="https://github.com/verretor"
                        className=""
                        data-hovercard-type="user"
                        data-hovercard-url="/users/verretor/hovercard"
                        data-octo-click="hovercard-link-click"
                        data-octo-dimensions="link_type:self"
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/10324237?s=64&amp;v=4"
                          alt="@verretor"
                          className="h-8 w-8 rounded-full"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
