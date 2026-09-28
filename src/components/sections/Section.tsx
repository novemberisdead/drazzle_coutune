import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const wrap = "mx-auto w-full max-w-[1440px] px-6 md:px-[clamp(24px,8.3vw,120px)]";

export function SectionHead({ kicker, title, action, className }: { kicker: string; title: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div className="flex flex-col gap-3 md:gap-3.5">
        <span className="kicker">{kicker}</span>
        <h2 className="m-0 font-serif text-[38px] font-normal leading-[1.05] md:text-[56px] md:leading-none">{title}</h2>
      </div>
      {action}
    </div>
  );
}
