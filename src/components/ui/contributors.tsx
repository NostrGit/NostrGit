"use client";

import { Fragment, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CalendarDays } from "lucide-react";

const contributors = [
  {
    href: "https://github.com/fiatjaf",
    imgUrl: "https://avatars.githubusercontent.com/u/1653275?s=64&amp;v=4",
    alt: "@fiatjaf",
  },
  {
    href: "https://github.com/scsibug",
    imgUrl: "https://avatars.githubusercontent.com/u/57707?s=64&amp;v=4",
    alt: "@scsibug",
  },
  {
    href: "https://github.com/melvincarvalho",
    imgUrl: "https://avatars.githubusercontent.com/u/65864?s=64&amp;v=4",
    alt: "@melvincarvalho",
  },
  {
    href: "https://github.com/hieblmi",
    imgUrl: "https://avatars.githubusercontent.com/u/18631614?s=64&amp;v=4",
    alt: "@hieblmi",
  },
  {
    href: "https://github.com/srid",
    imgUrl: "https://avatars.githubusercontent.com/u/3998?s=64&amp;v=4",
    alt: "@srid",
  },
  {
    href: "https://github.com/asoltys",
    imgUrl: "https://avatars.githubusercontent.com/u/7641?s=64&amp;v=4",
    alt: "@asoltys",
  },
  {
    href: "https://github.com/jb55",
    imgUrl: "https://avatars.githubusercontent.com/u/45598?s=64&amp;v=4",
    alt: "@jb55",
  },
  {
    href: "https://github.com/schulterklopfer",
    imgUrl: "https://avatars.githubusercontent.com/u/397451?s=64&amp;v=4",
    alt: "@schulterklopfer",
  },
  {
    href: "https://github.com/GlenCooper",
    imgUrl: "https://avatars.githubusercontent.com/u/967793?s=64&amp;v=4",
    alt: "@GlenCooper",
  },
  {
    href: "https://github.com/Kukks",
    imgUrl: "https://avatars.githubusercontent.com/u/1818366?s=64&amp;v=4",
    alt: "@Kukks",
  },
  {
    href: "https://github.com/verretor",
    imgUrl: "https://avatars.githubusercontent.com/u/10324237?s=64&amp;v=4",
    alt: "@verretor",
  },
];

export function Contributors() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <HoverCard>
        {contributors.map((contributor, index) => (
          <Fragment key={index}>
            <HoverCardTrigger asChild>
              <a
                href={contributor.href}
                className="mr-2 inline-block h-8 w-8 rounded-full"
                data-hovercard-type="user"
                data-hovercard-url={`/users/${contributor.alt}/hovercard`}
                data-octo-click="hovercard-link-click"
                data-octo-dimensions="link_type:self"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={contributor.imgUrl}
                  alt={contributor.alt}
                  className="rounded-full"
                />
              </a>
            </HoverCardTrigger>

            {hoveredIndex === index && (
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm">{contributor.alt}</p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Joined December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            )}
          </Fragment>
        ))}
      </HoverCard>
    </div>
  );
}
