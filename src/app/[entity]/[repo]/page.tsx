import Banner from "@/components/banner";
import DemoReadme from "@/components/demo-readme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contributors } from "@/components/ui/contributors";
import { ListHeader } from "@/components/ui/list-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import Link from "next/link";

export default function RepoPage({
  params,
}: {
  params: { entity: string; repo: string };
}) {
  return (
    <>
      <section className="px-8 py-6">
        <div className="flex justify-between">
          <div className="flex items-center text-lg">
            <Book className="text-gray-400 mr-2 inline h-4 w-4" />
            <Link className="text-purple-500" href={`/${params.entity}`}>
              {params.entity}
            </Link>
            <span className="text-gray-400 px-2">/</span>
            <Link
              className="text-purple-500"
              href={`/${params.entity}/${params.repo}`}
            >
              {params.repo}
            </Link>
            <span className="border-gray-200/40 text-gray-400 ml-1.5 mt-px rounded-full border px-1.5 text-xs">
              Public
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              className="h-7 !border-gray bg-dark text-xs"
              variant="outline"
            >
              <Eye className="mr-2 h-4 w-4" /> Unwatch{" "}
              <Badge className="ml-2">148</Badge>
            </Button>
            <Button
              className="h-7 !border-gray bg-dark text-xs"
              variant="outline"
            >
              <Zap className="mr-2 h-4 w-4" /> Zaps{" "}
              <Badge className="ml-2">1337</Badge>
            </Button>
            <Button
              className="h-7 !border-gray bg-dark text-xs"
              variant="outline"
            >
              <Globe2 className="mr-2 h-4 w-4" /> Relays{" "}
              <Badge className="ml-2">8</Badge>
            </Button>
            <Button
              className="h-7 !border-gray bg-dark text-xs"
              variant="outline"
            >
              <GitFork className="mr-2 h-4 w-4" /> Fork{" "}
              <Badge className="ml-2">209</Badge>
            </Button>
            <Button
              className="h-7 !border-gray bg-dark text-xs"
              variant="outline"
            >
              <Star className="mr-2 h-4 w-4 text-yellow-500" /> Starred{" "}
              <Badge className="ml-2">7k</Badge>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="code" className="mb-4 -ml-2 w-full">
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
          <hr className="w-[calc(100% + 32px)] -mx-8 -mt-1 border-b-0 border-gray" />
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
                    className="h-8 !border-gray bg-dark "
                    variant="outline"
                  >
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
                    <Link href="#" className="text-white hover:text-purple-500">
                      <History className="ml-2 mr-1 -mt-0.5 inline h-4 w-4" />{" "}
                      128 commits
                    </Link>
                  </div>
                }
              />
              <div className="overflow-hidden rounded-md rounded-tr-none rounded-tl-none border border-t-0 dark:border-gray">
                <ul className="divide-y dark:divide-gray">
                  <li className="text-gray-400 grid grid-cols-4 p-2 text-sm hover:bg-[#171B21]">
                    <div className="flex items-center gap-2">
                      <Folder className="text-gray-400 ml-2 h-4 w-4" />{" "}
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
                        move nips to the dedicated nips repo and update readme.
                      </a>
                    </div>
                    <div className="text-right">last year</div>
                  </li>
                  <li className="text-gray-400 grid grid-cols-4 p-2 text-sm hover:bg-[#171B21]">
                    <div className="flex items-center gap-2 ">
                      <File className="text-gray-400 ml-2 h-4 w-4" />{" "}
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
              <div className="mt-4 overflow-hidden rounded-md border dark:border-gray">
                <div className="flex items-center gap-2 border-b p-2 dark:border-gray">
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
          <aside className="col-span-1 space-y-2">
            <div className="flex justify-between">
              <h3 className="font-bold">About</h3>
              <Settings className="text-gray-400 h-4 w-4" />
            </div>
            <p className="pb-2">
              a truly censorship-resistant alternative to Twitter that has a
              chance of working
            </p>
            <Badge className="mr-2">nostr</Badge>
            <Badge className="mr-2">git</Badge>
            <ul className="text-gray-400 space-y-2 border-b border-gray pt-4 pb-8 text-sm">
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
    </>
  );
}
