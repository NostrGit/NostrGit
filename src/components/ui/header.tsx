import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { ChevronDown } from "lucide-react";
import { HeaderConfig } from "types";
import { MainNav } from "../main-nav";

const HeaderConfig: HeaderConfig = {
  mainNav: [
    {
      title: "Pull Requests",
      href: "/pullrequests",
    },
    {
      title: "Issues",
      href: "/issues",
    },
    {
      title: "Explore",
      href: "/explore",
    },
  ],
};

const DropdownItems = [
  {
    title: "Your Profile",
    href: "/profile",
  },
  {
    title: "Your Repositories",
    href: "/repositories",
  },
  {
    title: "Your organizations",
    href: "/organizations",
  },
  {
    title: "Your projects",
    href: "/projects",
  },
  {
    title: "Your stars",
    href: "/stars",
  },
  {
    title: "Your zaps",
    href: "/zaps",
  },
  {
    title: "Your relays",
    href: "/relays",
  },
  {
    title: "Your sponsors",
    href: "/sponsors",
  },
  {
    title: "Upgrade",
    href: "/upgrade",
  },
  {
    title: "Feature Preview",
    href: "/feature-preview",
  },
  {
    title: "Help",
    href: "/help",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

const PrimaryGitInfo = DropdownItems.slice(0,8)
const restGitInfo = DropdownItems.slice(8)


export const Header = () => {
  return (
    <header className="flex h-14 w-full items-center justify-between bg-[#171B21] px-8">
      
      <MainNav items={HeaderConfig.mainNav} />
      <div className="hidden items-center md:inline">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/peerrich.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Signed in as XXX</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
             {PrimaryGitInfo.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <span>{item.title}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              
              {restGitInfo.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <span>{item.title}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
