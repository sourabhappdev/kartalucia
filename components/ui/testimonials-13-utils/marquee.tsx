"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, CSSProperties } from "react";

export const Marquee = ({
  className,
  children,
  pauseOnHover = false,
  ...props
}: ComponentProps<"div"> & { pauseOnHover?: boolean }) => {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className="flex w-max animate-[marquee_var(--duration,40s)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{
          "--gap":
            (props.style as Record<string, string> | undefined)?.["--gap"] ||
            "1rem",
        } as CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
