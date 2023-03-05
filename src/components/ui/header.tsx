import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/peerrich.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
