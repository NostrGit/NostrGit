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

export const Header = () => {
  return (
    <header className="flex h-14 w-full items-center justify-between bg-[#171B21] px-8">
      <MainNav items={HeaderConfig.mainNav} />
      <div className="hidden items-center md:inline">
        {/* <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/peerrich.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
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
              <DropdownMenuItem>
                <span>Your Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your Repositories</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your organizations</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your projects</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your stars</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your zaps</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your relays</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your sponsors</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Upgrade</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Feature Preview</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Settings</span>
              </DropdownMenuItem>
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
