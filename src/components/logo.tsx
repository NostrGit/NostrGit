import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("items-center space-x-2 flex", className)}>
      <Image
        src="/logo.svg"
        alt="NostrGit"
        width={32}
        height={32}
        className="hover:opacity-80 h-8"
      />
    </Link>
  );
}
