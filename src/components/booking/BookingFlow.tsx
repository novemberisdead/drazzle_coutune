import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertIcon, BackIcon, CloseIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { budgets, services } from "@/data/catalog";
import { SITE, waLink } from "@/lib/site";
import { cn, img } from "@/lib/utils";
import { Calendar } from "./Calendar";
import { FittingCard } from "./FittingCard";
import { Tape } from "./Tape";
import {
  emptyDetails,
  endTime,
  fmtDay,
  fmtISO,
  fmtLong,
  groupSlots,
  icsFile,
  makeBookingId,
  serviceById,
  slotsFor,
  toISO,
  validate,
  whatsappText,
  type Booking,
  type Details,
  type Errors,
} from "./logic";

type Variant = "sheet" | "dialog";
type TitleComp = ComponentType<{ className?: string; children: ReactNode }>;

type Props = {
  variant: Variant;
  initialService: string | null;
  onClose: () => void;
  Title: TitleComp;
  Description: TitleComp;
};

const field =
  "h-[46px] w-full rounded-[12px] border border-gold-deep/35 bg-band-field px-3.5 text-[15px] font-normal text-ink placeholder:text-ink/45 focus:border-gold-deep focus:shadow-[0_0_0_3px_rgb(122_98_32/0.22)] focus:outline-none aria-[invalid=true]:border-[1.5px] aria-[invalid=true]:border-crimson aria-[invalid=true]:bg-[#fff9f6]";
const label = "text-[9.5px] uppercase tracking-[0.2em] text-ink-muted";

export function BookingFlow({ variant, initialService, onClose, Title, Description }: Props) {
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [serviceId, setServiceId] = useState<string | null>(initialService);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Errors>({});
  const [booking, setBooking] = useState<Booking | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dialog = variant === "dialog";

  const service = serviceById(serviceId);

  // A longer service may no longer fit the chosen slot.
  useEffect(() => {
    if (!date || !time || !service) return;
    const ok = slotsFor(date, service.minutes).some((s) => s.time === time && s.state === "open");
    if (!ok) setTime(null);
  }, [serviceId, date, time, service]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const go = (s: number) => setStep(s);

  const next = () => {
    if (step === 4) {
      const e = validate(details);
      setErrors(e);
      const first = Object.keys(e)[0];
      if (first) {
        requestAnimationFrame(() => document.getElementById(`bk-${first}`)?.focus());
        return;
      }
    }
    if (step === 5 && service && date && time) {
      setBooking({ id: makeBookingId(), serviceId: service.id, date, time, details });
      setStep(6);
      return;
    }
    setStep((s) => s + 1);
  };

  const canContinue =
    (step === 1 && !!serviceId) || (step === 2 && !!date) || (step === 3 && !!time) || step === 4 || step === 5;

  const primaryLabel =
    step === 2 && date ? `Continue · ${fmtDay(date)}` : step === 3 && time ? `Continue · ${time}` : step === 4 ? "Review booking" : step === 5 ? "Confirm booking" : "Continue";

  const set = <K extends keyof Details>(k: K, v: Details[K]) => {
    setDetails((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  if (step === 6 && booking) {
    return <Confirmation booking={booking} dialog={dialog} onClose={onClose} Title={Title} Description={Description} />;
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  const body = (
    <>
      {step === 1 && (
        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="mb-3 font-serif text-[28px] leading-[1.1] md:text-[32px]">What brings you in?</legend>
          {services.map((s) => (
            <label
              key={s.id}
              className="flex min-h-[58px] cursor-pointer flex-wrap items-center gap-x-3.5 gap-y-1 rounded-[14px] border border-gold-deep/25 bg-band-field px-4 py-2.5 has-[:checked]:border-[1.5px] has-[:checked]:border-gold-deep has-[:checked]:bg-[#fffdf8] has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-gold-deep"
            >
              <input type="radio" name="service" value={s.id} checked={serviceId === s.id} onChange={() => setServiceId(s.id)} className="peer sr-only" />
              <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-gold-deep/60 peer-checked:border-crimson peer-checked:after:size-2.5 peer-checked:after:rounded-full peer-checked:after:bg-crimson peer-checked:after:content-['']" />
              <span className="text-[16px] font-normal">{s.name}</span>
              <span className="ml-auto whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-gold-deep">{s.minutes} min</span>
              {s.id === "design" && (
                <span className="w-full pl-[34px] text-[12.5px] text-ink-muted">
                  Prefer a video call?{" "}
                  <a className="text-gold-deep underline underline-offset-[3px]" href={waLink("Hello, I'd like a design consultation over video call.")} target="_blank" rel="noreferrer">
                    Ask us on WhatsApp
                  </a>
                </span>
              )}
            </label>
          ))}
        </fieldset>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-3">
          <h3 className="m-0 font-serif text-[28px] font-normal leading-[1.1] md:text-[32px]">Pick a day</h3>
          <Calendar value={date} onChange={setDate} />
          <span className="text-[12.5px] text-ink-muted">Open every day · {SITE.hours}</span>
        </div>
      )}

      {step === 3 && date && service && (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <h3 className="m-0 font-serif text-[28px] font-normal leading-[1.1] md:text-[32px]">Choose a time</h3>
            <span className="text-[13px] text-ink-muted">
              {fmtDay(date)} · {service.name}, {service.minutes} min · studio time (IST)
            </span>
          </div>
          {groupSlots(slotsFor(date, service.minutes)).map((g) => (
            <div key={g.label} role="group" aria-label={g.label} className="flex flex-col gap-2">
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink-muted">{g.label}</span>
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6 md:gap-2.5">
                {g.slots.map((s) => {
                  const on = time === s.time;
                  const closed = s.state !== "open";
                  return (
                    <button
                      key={s.time}
                      type="button"
                      disabled={closed}
                      aria-pressed={on}
                      aria-label={`${s.time}${s.state === "booked" ? ", booked" : s.state === "passed" ? ", no longer available" : ""}`}
                      onClick={() => setTime(s.time)}
                      className={cn(
                        "flex h-11 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full border text-[14px] transition-colors md:h-[46px]",
                        closed
                          ? "cursor-default border-dashed border-ink/20 text-[13px] text-ink/40 line-through"
                          : on
                            ? "border-crimson bg-crimson font-medium text-band"
                            : "border-gold-deep/40 bg-band-field hover:bg-tape",
                      )}
                    >
                      {s.time}
                      {s.state === "booked" && <small className="text-[8px] uppercase tracking-[0.14em] no-underline">Booked</small>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 4 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-3"
        >
          <h3 className="m-0 font-serif text-[28px] font-normal leading-[1.1] md:text-[32px]">About you</h3>
          {errorCount > 0 && (
            <div role="alert" className="flex items-center gap-2.5 rounded-[12px] border border-crimson bg-[#fff9f6] px-3.5 py-3 text-[13.5px] text-crimson">
              <AlertIcon size={18} />
              {errorCount === 1 ? "One detail needs" : `${errorCount === 2 ? "Two" : errorCount} details need`} a look before we can hold your slot.
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2 md:gap-x-3.5">
            <Field id="name" label="Full name" error={errors.name}>
              <input id="bk-name" autoComplete="name" value={details.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "bk-name-err" : undefined} className={field} />
            </Field>
            <Field id="phone" label="Phone (WhatsApp)" error={errors.phone}>
              <input id="bk-phone" type="tel" inputMode="tel" autoComplete="tel" value={details.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98300 12345" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "bk-phone-err" : undefined} className={field} />
            </Field>
            <Field id="email" label="Email · optional" error={errors.email}>
              <input id="bk-email" type="email" autoComplete="email" value={details.email} onChange={(e) => set("email", e.target.value)} placeholder="you@mail.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "bk-email-err" : undefined} className={field} />
            </Field>
            <Field id="eventDate" label="Event date · optional" error={errors.eventDate}>
              <input id="bk-eventDate" type="date" min={toISO(new Date())} value={details.eventDate} onChange={(e) => set("eventDate", e.target.value)} aria-invalid={!!errors.eventDate} aria-describedby={errors.eventDate ? "bk-eventDate-err" : undefined} className={field} />
            </Field>
          </div>
          <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
            <legend className={cn(label, "mb-1.5")}>Budget range · optional</legend>
            <div className="flex gap-2">
              {budgets.map((b) => (
                <label key={b} className="flex-1">
                  <input type="radio" name="budget" value={b} checked={details.budget === b} onChange={() => set("budget", b)} className="peer sr-only" />
                  <span className="flex h-10 cursor-pointer items-center justify-center rounded-full border border-gold-deep/40 bg-band-field px-1 text-center text-[12px] peer-checked:border-ink peer-checked:bg-ink peer-checked:text-band peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-gold-deep md:text-[13px]">
                    {b}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field id="notes" label="Notes · optional">
            <textarea id="bk-notes" rows={2} value={details.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Colours, references, anything we should know" className={cn(field, "h-auto min-h-[60px] resize-none py-2.5 leading-[1.4]")} />
          </Field>
          <button type="submit" hidden />
        </form>
      )}

      {step === 5 && service && date && time && (
        <div className="flex flex-col gap-2.5">
          <h3 className="m-0 font-serif text-[28px] font-normal leading-[1.1] md:text-[32px]">One last look</h3>
          <dl className="m-0 rounded-[14px] border border-gold-deep/30 bg-band-field px-[18px] py-1.5 md:px-[22px]">
            <Row k="Service" v={`${service.name} · ${service.minutes} min`} edit={() => go(1)} />
            <div className="stitch" />
            <Row k="Date" v={fmtLong(date)} edit={() => go(2)} />
            <div className="stitch" />
            <Row k="Time" v={`${time} – ${endTime(time, service.minutes)}`} edit={() => go(3)} />
            <div className="stitch" />
            <Row k="Name" v={details.name.trim()} edit={() => go(4)} />
            <Row k="Phone" v={details.phone.trim()} tight />
            {details.email.trim() && <Row k="Email" v={details.email.trim()} tight />}
            {details.eventDate && <Row k="Event" v={fmtISO(details.eventDate)} tight />}
            {details.budget && <Row k="Budget" v={details.budget} tight />}
          </dl>
          <span className="flex items-center gap-2 text-[12.5px] text-ink-muted">
            <PinIcon /> Dazzle Couture studio, Kolkata · {SITE.address}
          </span>
        </div>
      )}
    </>
  );

  const pane = (
    <div className={cn("on-band flex min-h-0 flex-1 flex-col bg-band text-ink", dialog && "px-10 pb-7 pt-5")}>
      <div className={cn("flex shrink-0 items-center justify-between", dialog ? "h-11" : "h-[52px] px-2")}>
        {!dialog && (
          <span className="w-11">
            {step > 1 && (
              <button type="button" aria-label="Back" onClick={() => go(step - 1)} className="grid size-11 cursor-pointer place-items-center">
                <BackIcon />
              </button>
            )}
          </span>
        )}
        <Title className="m-0 font-serif text-[20px] font-normal md:text-[22px]">Book an appointment</Title>
        <button type="button" aria-label="Close booking" onClick={onClose} className="grid size-11 cursor-pointer place-items-center">
          <CloseIcon size={20} />
        </button>
      </div>
      <Description className="sr-only">
        Step {step} of 5. All appointments are in-studio in Kolkata, {SITE.hours} every day.
      </Description>
      <div className={cn("shrink-0", !dialog && "px-6")}>
        <Tape step={step} onJump={go} spacing={dialog ? 150 : 120} />
      </div>
      <div ref={bodyRef} className={cn("min-h-0 flex-1 overflow-y-auto pt-3", !dialog && "px-6 pb-4")}>
        {body}
      </div>
      <div className={cn("flex shrink-0 items-center gap-3 border-t border-gold-deep/20", dialog ? "justify-between pt-4" : "flex-col px-6 pb-[max(26px,env(safe-area-inset-bottom))] pt-3.5")}>
        {dialog && (step > 1 ? <Button variant="linkDeep" className="h-12" onClick={() => go(step - 1)}>← Back</Button> : <span className="text-[13px] text-ink-muted">All appointments are in-studio</span>)}
        <Button className={dialog ? "w-60" : "w-full"} disabled={!canContinue} onClick={next}>
          {primaryLabel}
        </Button>
        {!dialog && step === 1 && <span className="text-[12px] text-ink-muted">All appointments are in-studio, Kolkata</span>}
        {!dialog && step === 5 && <span className="text-[12px] text-ink-muted">We'll send the details to your WhatsApp</span>}
      </div>
    </div>
  );

  if (!dialog) return pane;

  return (
    <div className="flex h-[680px] w-[940px] max-w-[calc(100vw-48px)]">
      <aside className="relative w-80 shrink-0 bg-night text-ivory">
        <img src={img("visit-panel")} alt="" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_9_8/0.2)_0,rgb(11_9_8/0.5)_40%,#0b0908_78%)]" />
        <div className="absolute inset-x-8 bottom-9 flex flex-col gap-3.5">
          <span className="kicker">Your visit</span>
          <span className="font-serif text-[30px] leading-[1.1]">{service?.name ?? "Choose a service to begin"}</span>
          <div className="h-px bg-gold/45" />
          <div className="flex flex-col gap-2 text-[14px]">
            <span className="text-muted">{service ? `${service.minutes} min · In studio` : "In studio · Kolkata"}</span>
            {date ? <span>{fmtLong(date)}</span> : <span className="text-muted">Open every day, {SITE.hours}</span>}
            {time && service && <span>{time} – {endTime(time, service.minutes)}</span>}
            {step === 5 && details.name && <span className="text-muted">{details.name}</span>}
          </div>
        </div>
      </aside>
      {pane}
    </div>
  );
}

function Field({ id, label: text, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`bk-${id}`} className={label}>
        {text}
      </label>
      {children}
      {error && (
        <span id={`bk-${id}-err`} className="flex items-center gap-1.5 text-[12.5px] font-normal text-crimson">
          <AlertIcon /> {error}
        </span>
      )}
    </div>
  );
}

function Row({ k, v, edit, tight }: { k: string; v: string; edit?: () => void; tight?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-3", tight ? "pb-2.5" : "py-2.5")}>
      <dt className="text-[9.5px] uppercase tracking-[0.2em] text-ink-muted">{k}</dt>
      <dd className="m-0 text-right text-[15px] leading-[1.3]">
        {v}
        {edit && (
          <button type="button" onClick={edit} className="ml-3 cursor-pointer text-[10px] font-medium uppercase tracking-[0.16em] text-gold-deep underline underline-offset-[3px]">
            Edit<span className="sr-only"> {k.toLowerCase()}</span>
          </button>
        )}
      </dd>
    </div>
  );
}

function Confirmation({ booking, dialog, onClose, Title, Description }: { booking: Booking; dialog: boolean; onClose: () => void; Title: TitleComp; Description: TitleComp }) {
  const downloadIcs = () => {
    const url = URL.createObjectURL(icsFile(booking));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${booking.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const actions = (
    <div className={cn("flex items-center gap-3", dialog ? "mt-2 gap-8" : "w-full flex-col")}>
      <Button asChild className={dialog ? "" : "w-full"}>
        <a href={waLink(whatsappText(booking))} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={18} strokeWidth={1.4} /> Confirm on WhatsApp
        </a>
      </Button>
      <Button variant="link" className="h-12" onClick={downloadIcs}>
        Add to calendar
      </Button>
    </div>
  );

  return (
    <div
      data-confirmed
      className={cn(
        "relative flex bg-night text-ivory",
        dialog ? "h-[680px] w-[940px] max-w-[calc(100vw-48px)] items-center gap-14 px-14" : "min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto px-6 pb-8 pt-4",
      )}
      style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgb(232 178 92 / 0.2), rgb(232 178 92 / 0) 45%)" }}
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute right-3 top-3 grid size-11 cursor-pointer place-items-center text-muted hover:text-ivory">
        <CloseIcon size={20} />
      </button>
      {!dialog && (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="kicker">Booked</span>
          <Title className="m-0 font-serif text-[34px] font-normal leading-[1.05]">See you at the studio</Title>
        </div>
      )}
      <div className={dialog ? "-rotate-2" : ""}>
        <FittingCard booking={booking} large={dialog} />
      </div>
      <div className={cn("flex flex-col gap-4", dialog && "flex-1")}>
        {dialog && (
          <>
            <span className="kicker">Booked</span>
            <Title className="m-0 font-serif text-[54px] font-normal leading-none">
              See you at <em className="text-champagne">the studio</em>
            </Title>
          </>
        )}
        <Description className={cn("m-0 text-muted", dialog ? "text-[16px] leading-[1.6]" : "text-center text-[14px] leading-[1.5]")}>
          Send this card to us on WhatsApp and we'll confirm within studio hours. Your booking ID is {booking.id}.
        </Description>
        {actions}
      </div>
    </div>
  );
}
