import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { InstagramIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { instagram, services, testimonials } from "@/data/catalog";
import { fullVersionToast, useStore } from "@/state/store";
import { SITE, igLink, waLink } from "@/lib/site";
import { img } from "@/lib/utils";
import { SectionHead, wrap } from "./Section";

export function BookSection() {
  const { openBooking } = useStore();
  return (
    <section
      id="book"
      aria-labelledby="book-title"
      className="scroll-mt-20 border-t border-gold/22 bg-surface bg-[radial-gradient(ellipse_at_50%_0,rgb(232_178_92/0.12),rgb(232_178_92/0)_55%)] md:bg-[radial-gradient(ellipse_at_20%_0,rgb(232_178_92/0.12),rgb(232_178_92/0)_50%)]"
    >
      <div className={`${wrap} flex flex-col gap-6 py-16 pb-[72px] md:flex-row md:justify-between md:gap-16 md:py-[120px]`}>
        <div className="flex flex-col gap-3 md:max-w-[460px] md:gap-5">
          <span className="kicker">III · Appointments</span>
          <h2 id="book-title" className="m-0 font-serif text-[38px] font-normal leading-[1.05] md:text-[56px] md:leading-none">Visit the studio</h2>
          <p className="m-0 text-[15px] leading-[1.55] text-muted md:text-[17px] md:leading-[1.6]">
            Every piece begins with a conversation. All appointments are in-studio, {SITE.hours}, every day.
          </p>
          <Button className="mt-3 hidden w-[260px] md:inline-flex" onClick={() => openBooking()}>
            Book Appointment
          </Button>
          <span className="hidden items-center gap-2 text-[13px] text-muted md:flex">
            <WhatsAppIcon size={14} /> Prefer a video call?
            <a className="text-gold underline underline-offset-[3px]" href={waLink("Hello, I'd like a design consultation over video call.")} target="_blank" rel="noreferrer">
              Ask us on WhatsApp
            </a>
          </span>
        </div>
        <ul className="flex flex-col md:w-[52%] md:max-w-[620px]">
          {services.map((s) => (
            <li key={s.id} className="border-b border-gold/30 first:border-t">
              <button
                type="button"
                onClick={() => openBooking(s.id)}
                className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left md:min-h-[104px]"
              >
                <span className="flex flex-col gap-1.5">
                  <span className="font-serif text-[22px] transition-colors group-hover:text-champagne md:text-[30px]">{s.name}</span>
                  <span className="hidden text-[14px] text-muted md:block">{s.blurb}</span>
                  {s.id === "design" && (
                    <span className="text-[12.5px] text-muted md:hidden">Prefer a video call? Ask us on WhatsApp.</span>
                  )}
                </span>
                <span className="kicker shrink-0 text-[10px] md:text-[11px]">{s.minutes} min</span>
              </button>
            </li>
          ))}
        </ul>
        <Button className="w-full md:hidden" onClick={() => openBooking()}>
          Book Appointment
        </Button>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "I", title: "Book", body: "Pick a service and a slot. We confirm on WhatsApp within studio hours." },
  { n: "II", title: "Consult & measure", body: "Choose fabric and embroidery with the designer, then we take your measurements." },
  { n: "III", title: "Receive your outfit", body: "A final trial in studio, then collect it or have it delivered." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className={`${wrap} flex flex-col gap-7 py-16 md:gap-12 md:py-[120px]`}>
      <SectionHead kicker="IV · How it works" title={<span id="how-title">Three visits, one garment</span>} />
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-12">
        <span aria-hidden className="absolute bottom-11 left-[21px] top-11 border-l border-dashed border-gold/55 md:bottom-auto md:left-[60px] md:right-[33%] md:top-[30px] md:border-l-0 md:border-t" />
        {STEPS.map((s) => (
          <li key={s.n} className="relative flex gap-5 md:flex-col md:gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/60 bg-night font-serif text-[20px] text-gold md:size-[60px] md:text-[24px]">
              {s.n}
            </span>
            <div className="flex flex-col gap-1.5 pt-1.5 md:gap-4 md:pt-0">
              <span className="font-serif text-[24px] md:text-[30px]">{s.title}</span>
              <span className="max-w-[320px] text-[14px] leading-[1.5] text-muted md:text-[15px] md:leading-[1.6]">{s.body}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function InstagramGallery() {
  return (
    <section aria-labelledby="ig-title" className="border-t border-gold/22 py-16 md:py-[100px]">
      <div className="flex flex-col gap-6 md:gap-10">
        <SectionHead
          className={wrap}
          kicker="V · From the studio"
          title={<span id="ig-title" className="text-[34px] md:text-[44px]">@{SITE.instagram}</span>}
          action={
            <Button variant="link" size="sm" asChild className="h-11 md:text-[12px] md:tracking-[0.16em]">
              <a href={igLink} target="_blank" rel="noreferrer">
                <InstagramIcon size={16} /> <span className="md:hidden">Follow</span><span className="hidden md:inline">Follow on Instagram</span>
              </a>
            </Button>
          }
        />
        {/* Tiles keep the photo as posted, watermark and all: this is the feed. */}
        <ul className="m-0 grid w-full list-none grid-cols-3 gap-1.5 p-0 md:mx-auto md:max-w-[1440px] md:grid-cols-6 md:gap-3 md:px-[clamp(24px,8.3vw,120px)]">
          {instagram.map((t, i) => (
            <li key={t.image} className={i >= 6 ? "md:hidden" : undefined}>
              <a href={igLink} target="_blank" rel="noreferrer" className="reveal block aspect-[3/4] overflow-hidden" style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
                <img src={img(t.image)} alt={t.alt} loading="lazy" className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-settle)] hover:scale-[1.04]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="words-title" className={`${wrap} flex flex-col gap-6 py-16 md:gap-12 md:py-[120px]`}>
      <SectionHead
        kicker="VI · Kind words"
        title={<span id="words-title">Worn, and remembered</span>}
        action={<span className="inline-flex h-[22px] shrink-0 items-center border border-dashed border-gold/60 px-2.5 text-[9.5px] uppercase tracking-[0.2em] md:h-6 md:text-[10px]">Sample reviews</span>}
      />
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {testimonials.map((t) => (
          <figure key={t.who} className="reveal m-0 flex min-h-44 flex-col justify-between gap-6 border-t border-gold/50 bg-surface p-[22px] md:min-h-60 md:p-8">
            <blockquote className="m-0 font-serif text-[19px] italic leading-[1.35] md:text-[23px]">“{t.quote}”</blockquote>
            <figcaption className="kicker text-[10px] text-muted">
              Sample · {t.who} · {t.what}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="scroll-mt-20 border-t border-gold/22">
      <div className={`${wrap} flex flex-col gap-6 py-16 md:flex-row md:items-center md:gap-24 md:py-[120px]`}>
        <div className="flex flex-col gap-3 md:hidden">
          <span className="kicker">VII · The studio</span>
          <h2 className="m-0 font-serif text-[38px] font-normal leading-[1.05]">A room lit for couture</h2>
        </div>
        <img
          src={img("studio")}
          alt="The Dazzle Couture studio: crystal chandeliers over two embroidered sherwanis"
          loading="lazy"
          className="reveal aspect-[342/260] w-full object-cover md:aspect-[620/520] md:w-[48%] md:max-w-[620px]"
        />
        <div className="flex flex-col gap-6 md:gap-[22px]">
          <span className="kicker hidden md:block">VII · The studio</span>
          <h2 id="studio-title" className="m-0 hidden font-serif text-[56px] font-normal leading-none md:block">
            A room lit <em className="text-champagne">for couture</em>
          </h2>
          <p className="m-0 text-[15px] leading-[1.65] text-muted md:text-[17px] md:leading-[1.7]">
            Under the chandeliers of our Kolkata studio, each outfit is drawn, embroidered and fitted by hand. Bring a reference, a colour, or only a date: we'll build the rest with you, fitting by fitting.
          </p>
          <div className="hairline hidden md:block" />
          <div className="grid gap-4 text-[14px] md:grid-cols-2">
            <span className="flex items-center gap-2 md:flex-col md:items-start md:gap-1.5">
              <span className="kicker flex items-center gap-2 text-[10px]"><PinIcon /> Visit</span>
              Kolkata · {SITE.address}
            </span>
            <span className="hidden flex-col gap-1.5 md:flex">
              <span className="kicker text-[10px]">Hours</span>
              {SITE.hours}, every day
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter an email address like you@example.com");
      return;
    }
    setError("");
    setEmail("");
    fullVersionToast("Newsletter sign-up is switched off in the demo.");
  };
  return (
    <section aria-labelledby="news-title" className="bg-surface">
      <div className={`${wrap} flex flex-col gap-3.5 py-12 md:h-[280px] md:flex-row md:items-center md:justify-between md:py-0`}>
        <div className="flex flex-col gap-3">
          <h2 id="news-title" className="m-0 font-serif text-[30px] font-normal md:text-[44px]">Private previews</h2>
          <p className="m-0 text-[14px] leading-[1.5] text-muted md:text-[15px]">New collections, trunk shows and fitting-day openings. Once a month.</p>
        </div>
        <form onSubmit={submit} noValidate className="mt-2.5 flex flex-col gap-2 md:mt-0 md:w-[540px]">
          <div className="flex items-end gap-3 md:gap-6">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="kicker text-[9.5px] text-muted md:text-[10px]">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!!error}
                aria-describedby={error ? "news-error" : undefined}
                className="h-11 border-0 border-b border-gold/60 bg-transparent p-0 text-[15px] font-light text-ivory placeholder:text-muted/70 focus:border-gold focus:outline-none md:h-12 md:text-[16px]"
              />
            </label>
            <Button variant="link" type="submit" className="h-11 md:h-12">
              Subscribe
            </Button>
          </div>
          {error && (
            <span id="news-error" role="alert" className="text-[12.5px] text-champagne">
              {error}
            </span>
          )}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gold/22">
      <div className={`${wrap} flex flex-col gap-6 pb-7 pt-12 md:gap-9 md:pb-9 md:pt-[72px]`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <img src="/logo-gold.png" alt="Dazzle Couture" loading="lazy" className="h-[54px] w-auto self-start md:h-[63px]" />
          <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-[18px] text-[13.5px] leading-[1.5] md:grid-cols-4 md:gap-8 md:text-[14px]">
            <div className="flex flex-col gap-1">
              <dt className="kicker text-[9.5px] md:text-[10px]">Visit</dt>
              <dd className="m-0">{SITE.city}<br /><span className="text-muted">{SITE.address}</span></dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="kicker text-[9.5px] md:text-[10px]">Hours</dt>
              <dd className="m-0">{SITE.hours}<br /><span className="text-muted">Every day</span></dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="kicker text-[9.5px] md:text-[10px]">WhatsApp</dt>
              <dd className="m-0"><a className="text-ivory hover:text-gold" href={waLink("Hello Dazzle Couture")} target="_blank" rel="noreferrer">{SITE.whatsappDisplay}</a></dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="kicker text-[9.5px] md:text-[10px]">Instagram</dt>
              <dd className="m-0"><a className="text-ivory hover:text-gold" href={igLink} target="_blank" rel="noreferrer">@{SITE.instagram}</a></dd>
            </div>
          </dl>
        </div>
        <div className="hairline" />
        <div className="flex justify-between gap-4 text-[11px] text-muted md:text-[12px]">
          <span>© 2026 {SITE.name}</span>
          <span>{SITE.credit}</span>
        </div>
      </div>
    </footer>
  );
}
