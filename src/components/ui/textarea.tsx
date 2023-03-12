import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-8 w-full rounded-md border border-zinc-300 bg-transparent py-2 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
