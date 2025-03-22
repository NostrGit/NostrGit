import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SearchBar({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) {
  return (
    <Input
      className={cn(
        "w-full bg-[#0E1116] transition-all ease-in-out",
        className
      )}
      type="text"
      placeholder={placeholder || "Search or jump to…"}
    />
  );
}
