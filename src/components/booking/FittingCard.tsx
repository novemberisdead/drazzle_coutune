import { endTime, fmtLong, serviceById, type Booking } from "./logic";
import { SITE } from "@/lib/site";

/** The confirmation as a tailor's tag: punched hole, gold string, stitched dividers. */
export function FittingCard({ booking, large = false }: { booking: Booking; large?: boolean }) {
  const s = serviceById(booking.serviceId)!;
  return (
    <div className="relative animate-[tag-swing_700ms_var(--ease-settle)] pt-14">
      <svg aria-hidden className="absolute left-1/2 top-0 -translate-x-1/2" width="120" height="70" viewBox="0 0 120 70" fill="none">
        <path d="M60 68 C 52 36, 96 32, 82 0" stroke="#b8983c" strokeWidth="1" />
        <path d="M60 68 C 68 38, 26 30, 38 0" stroke="#b8983c" strokeWidth="1" />
      </svg>
      <div
        className="on-band relative flex flex-col gap-3.5 bg-band px-[26px] pb-[22px] pt-10 text-ink md:gap-[18px] md:px-9 md:pt-14"
        style={{ clipPath: "polygon(22% 0, 78% 0, 100% 9%, 100% 100%, 0 100%, 0 9%)", width: large ? 380 : "min(310px, 100%)" }}
      >
        <span aria-hidden className="absolute left-1/2 top-2.5 size-6 -translate-x-1/2 rounded-full bg-night shadow-[0_0_0_3px_#b8983c] md:top-3.5 md:size-7" />
        <div className="mt-2 flex flex-col items-center gap-1.5">
          <span className="font-serif text-[13px] font-semibold uppercase tracking-[0.34em] text-gold-deep md:text-[15px]">Dazzle Couture</span>
          <span className="text-[9.5px] uppercase tracking-[0.2em] text-ink-muted">Fitting card</span>
        </div>
        <div className="stitch" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9.5px] uppercase tracking-[0.2em] text-ink-muted">Booking ID</span>
          <span className="font-serif text-[32px] font-medium tracking-[0.04em] md:text-[40px]">{booking.id}</span>
        </div>
        <div className="stitch" />
        <dl className="m-0 grid grid-cols-2 gap-x-3 gap-y-3.5">
          {[
            ["Service", s.name],
            ["Length", `${s.minutes} min`],
            ["Date", fmtLong(booking.date)],
            ["Time", `${booking.time} – ${endTime(booking.time, s.minutes)}`],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1.5">
              <dt className="text-[9.5px] uppercase tracking-[0.2em] text-ink-muted">{k}</dt>
              <dd className="m-0 text-[15px] md:text-[16px]">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="stitch" />
        <span className="text-center text-[12.5px] leading-[1.45] text-ink-muted">
          Bring any references or fabric you love.
          <br />
          Kolkata studio · {SITE.address}
        </span>
      </div>
    </div>
  );
}
