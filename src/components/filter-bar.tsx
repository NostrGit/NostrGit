import { ChevronDown, Search } from "lucide-react";

export default function FilterBar({
  search,
  handleSearch,
}: {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <button className="flex items-center h-8 border border-r-0 text-sm border-gray hover:border-zinc-400 bg-dark px-4 rounded-l-md text-zinc-200 font-semibold">
        Filters <ChevronDown className="h-4 w-4 ml-1 mt-px" />
      </button>
      <label className="relative w-full text-zinc-400">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center px-2">
          <Search className="h-4 w-4" />
        </span>
        <input
          className="block bg-[#0E1116] w-full h-8 border-gray rounded-r-md py-1 pl-9 pr-3 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 text-sm md:text-base"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </label>
    </>
  );
}
