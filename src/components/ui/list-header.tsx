"use client";

import { useState } from "react";

import { clsx } from "clsx";
import { MoreHorizontal } from "lucide-react";

export const ListHeader = ({
  icon,
  title,
  actionArea,
  description,
  lastCommitHash,
  lastCommitMessage,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  actionArea?: React.ReactNode;
  description: string;
  lastCommitHash?: string;
  lastCommitMessage?: string;
}) => {
  const [openShowMore, setOpenShowMore] = useState(false);

  const showMore = () => {
    setOpenShowMore((prevOpenShowMore) => !prevOpenShowMore);
  };

  return (
    <div
      className={clsx(
        "rounded-md rounded-bl-none rounded-br-none border bg-[#171B21] py-2 px-4 text-sm font-medium dark:border-[#383B42] dark:text-zinc-100",
        { "h-11": !openShowMore }
      )}
    >
      <div className="flex w-full  justify-between flex-row flex-nowrap">
        <div className="flex w-1/3 sm:w-2/3 items-center space-x-2">
          {icon}
          <span className="hidden min-[364px]:inline-block">{title}</span>
          &nbsp;
          <span className="hidden font-normal min-[508px]:block truncate">
            {description}
          </span>
          <button className="rounded-sm ml-2 h-4 mt-1 cursor-pointer bg-gray-800">
            <MoreHorizontal
              onClick={showMore}
              className="h-4 hover:text-white/80"
            />
          </button>
        </div>
        <div className="flex text-right">{actionArea}</div>
      </div>
      {openShowMore && (
        <div className="lg:ml-[1.9rem] mt-2">
          {description}
          <div className="mt-1 mb-2">
            <span className="text-xs text-gray-400 font-light">
              {lastCommitMessage}
            </span>
          </div>
          <div className="my-2">
            {lastCommitHash && (
              <span className="border border-gray-700 rounded-md font-light text-xs px-1 py-0.5">
                {lastCommitHash}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
