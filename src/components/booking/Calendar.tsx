import { useState } from "react";
import { BackIcon, NextIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { sameDay, startOfDay } from "./logic";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS_AHEAD = 5;

/** Month grid, Monday first. Past days are crossed out and disabled; the studio opens every day. */
export function Calendar({ value, onChange }: { value: Date | null; onChange: (d: Date) => void }) {
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(() => {
    const base = value ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const monthIndex = (d: Date) => d.getFullYear() * 12 + d.getMonth();
  const offset = monthIndex(cursor) - monthIndex(today);

  const lead = (cursor.getDay() + 6) % 7;
  const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
  ];
  const shift = (n: number) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + n, 1));
  const title = cursor.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <button type="button" aria-label="Previous month" disabled={offset <= 0} onClick={() => shift(-1)} className="grid size-11 cursor-pointer place-items-center rounded-full disabled:cursor-default disabled:opacity-30">
          <BackIcon size={18} />
        </button>
        <span aria-live="polite" className="font-serif text-[20px] font-medium">{title}</span>
        <button type="button" aria-label="Next month" disabled={offset >= MONTHS_AHEAD} onClick={() => shift(1)} className="grid size-11 cursor-pointer place-items-center rounded-full disabled:cursor-default disabled:opacity-30">
          <NextIcon size={18} />
        </button>
      </div>
      <div role="grid" aria-label={title} className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} role="columnheader" aria-label={w} className="flex h-6 items-center justify-center text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            {w.slice(0, 1)}
            <span className="hidden md:inline">{w.slice(1)}</span>
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`x${i}`} />;
          const past = d < today;
          const selected = value && sameDay(d, value);
          const isToday = sameDay(d, today);
          return (
            <button
              key={d.getDate()}
              type="button"
              disabled={past}
              aria-pressed={!!selected}
              aria-label={`${d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}${isToday ? ", today" : ""}${past ? ", unavailable" : ""}`}
              onClick={() => onChange(d)}
              className={cn(
                "mx-auto grid size-11 cursor-pointer place-items-center rounded-full text-[15px] transition-colors",
                past && "cursor-default text-ink/30 line-through",
                !past && !selected && "hover:bg-tape",
                isToday && !selected && "shadow-[inset_0_0_0_1px_rgb(122_98_32/0.6)]",
                selected && "bg-crimson font-medium text-band",
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
