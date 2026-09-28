import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowIcon, BoxIcon, FabricIcon, TapeIcon, WhatsAppIcon } from "@/components/Icons";
import { useParallax } from "@/hooks/useParallax";
import { useStore } from "@/state/store";
import { img } from "@/lib/utils";
import { wrap } from "./Section";

export function Hero() {
  const { openBooking } = useStore();
  const photo = useRef<HTMLDivElement>(null);
  useParallax(photo);

  return (
    <section id="top" aria-label="Welcome" className="relative -mt-16 h-[640px] overflow-hidden md:-mt-[88px] md:h-[820px]">
      {/* Photo: full-bleed on mobile, anchored right on desktop; edges dissolve into the page. */}
      <div ref={photo} className="absolute inset-x-0 top-0 h-[560px] will-change-transform md:left-[39%] md:h-full">
        <img
          src={img("hero-bridal")}
          alt="Crimson zardozi sharara on a mannequin beside a lit crystal chandelier"
          width={1170}
          height={1560}
          fetchPriority="high"
          className="size-full object-cover object-[62%_0] md:object-[50%_18%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_9_8/0.8)_0,rgb(11_9_8/0)_20%,rgb(11_9_8/0)_40%,rgb(11_9_8/0.86)_70%,#0b0908_88%)] md:bg-[linear-gradient(90deg,#0b0908_0,rgb(11_9_8/0)_34%),linear-gradient(180deg,rgb(11_9_8/0.85)_0,rgb(11_9_8/0.4)_10%,rgb(11_9_8/0)_20%,rgb(11_9_8/0)_70%,#0b0908_100%)]"
        />
      </div>
      <div
        aria-hidden
        className="glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgb(232_178_92/0.2),rgb(232_178_92/0)_42%)] md:bg-[radial-gradient(circle_at_62%_26%,rgb(232_178_92/0.16),rgb(232_178_92/0)_30%)]"
      />

      <div className={`${wrap} relative flex h-full flex-col justify-end pb-7 md:justify-center md:pb-0 md:pt-10`}>
        <div className="flex max-w-[560px] flex-col gap-3.5 md:gap-[22px]">
          <span className="kicker">Kolkata · Couture atelier</span>
          <h1 className="m-0 font-serif text-[46px] font-normal leading-[1.02] md:text-[84px] md:leading-[0.98] md:tracking-[-0.01em]">
            Couture, cut to <br className="md:hidden" />
            <em className="text-champagne">your measure</em>
          </h1>
          <p className="m-0 max-w-[440px] text-[15px] leading-[1.55] text-muted md:text-[17px] md:leading-[1.6]">
            Bridal lehengas, sherwanis and evening tuxedos, hand-embroidered and fitted in our studio.
          </p>
          {/* Two equal-weight actions: same height, width and label size; different character. */}
          <div className="mt-2 grid grid-cols-2 gap-3 md:mt-3 md:flex md:gap-10">
            <Button size="sm" className="md:h-14 md:w-60 md:px-[30px] md:text-[12.5px] md:tracking-[0.18em]" onClick={() => openBooking()}>
              Book Appointment
            </Button>
            <Button variant="link" size="sm" asChild className="md:h-14 md:w-60 md:text-[12.5px] md:tracking-[0.18em]">
              <a href="#shop">
                Shop Collection <ArrowIcon />
              </a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-12 hidden items-center gap-4 md:flex">
          <span aria-hidden className="h-px w-12 bg-gold" />
          <span className="kicker text-[10px] text-muted">On the mannequin · Crimson zardozi sharara</span>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: TapeIcon, title: "Custom fitting", sub: "Cut to your measurements" },
  { icon: FabricIcon, title: "Premium fabrics", sub: "Silks, velvets, organza" },
  { icon: WhatsAppIcon, title: "WhatsApp support", sub: "A stylist, 11:00–21:00" },
  { icon: BoxIcon, title: "Pan-India delivery", sub: "Boxed and insured" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why Dazzle Couture" className="border-y border-gold/22">
      <ul className={`${wrap} grid h-28 grid-cols-4 px-0 md:h-[120px]`}>
        {TRUST.map(({ icon: Icon, title, sub }) => (
          <li key={title} className="flex flex-col items-center justify-center gap-2.5 text-center md:flex-row md:justify-start md:gap-4 md:text-left">
            <Icon className="text-gold" size={26} strokeWidth={1.15} />
            <div className="flex flex-col gap-1">
              <span className="px-1 text-[9.5px] uppercase leading-[1.5] tracking-[0.16em] md:text-[11px] md:tracking-[0.24em]">{title}</span>
              <span className="hidden text-[13px] text-muted md:block">{sub}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
