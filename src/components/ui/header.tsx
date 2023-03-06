import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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

export const Header = () => {
  return (
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
