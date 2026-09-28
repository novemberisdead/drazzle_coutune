import { STEP_LABELS } from "./logic";
import { cn } from "@/lib/utils";

/**
 * Progress as a measuring tape: the tape slides under a fixed crimson needle so the
 * current step sits at the centre. Completed steps can be tapped to go back; the tape
 * is not draggable (it would fight the bottom sheet's swipe).
 */
export function Tape({ step, onJump, spacing = 120 }: { step: number; onJump: (s: number) => void; spacing?: number }) {
  const first = spacing / 2;
  const pos = (i: number) => first + i * spacing;
  const width = first * 2 + spacing * 8;
  return (
    <nav aria-label="Booking progress" className="relative h-[70px] overflow-hidden">
      <ol
        className="absolute top-2.5 m-0 h-[60px] list-none p-0 transition-[left] duration-[600ms] ease-[var(--ease-settle)]"
        style={{ width, left: `calc(50% - ${pos(step - 1)}px)` }}
      >
        <li aria-hidden className="tape-band absolute inset-x-0 top-0 h-[30px] border-y border-gold-deep/50">
          <span className="absolute -top-[3px] left-0 h-9 w-2 rounded-[2px] bg-gold-deep" />
        </li>
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const done = n < step;
          const current = n === step;
          return (
            <li key={label} className="absolute top-0 w-[100px]" style={{ left: pos(i) - 50 }}>
              <button
                type="button"
                disabled={!done}
                onClick={() => onJump(n)}
                aria-current={current ? "step" : undefined}
                aria-label={`Step ${n}, ${label}${done ? ", completed. Go back to this step" : current ? ", current" : ""}`}
                className="flex h-[60px] w-full cursor-pointer flex-col items-center disabled:cursor-default"
              >
                <span className="mt-3 font-serif text-[14px] font-medium leading-none text-gold-deeper">{n}</span>
                <span
                  className={cn(
                    "mt-[15px] text-[9.5px] uppercase leading-none tracking-[0.18em] md:text-[10px]",
                    current ? "font-medium text-ink" : "text-ink-muted",
                    done && "underline decoration-gold-deep/40 underline-offset-2",
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <span aria-hidden className="absolute left-1/2 top-0 h-[42px] w-0.5 -translate-x-1/2 bg-crimson" />
    </nav>
  );
}
