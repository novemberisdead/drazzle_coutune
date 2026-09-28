import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { BagIcon, CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/Icons";
import { useStore } from "@/state/store";
import { SITE, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#lehenga", label: "Lehenga" },
  { href: "#bridal", label: "Bridal" },
  { href: "#sherwani", label: "Sherwani" },
  { href: "#tuxedo", label: "Tuxedo & Party" },
  { href: "#suits", label: "Suits" },
  { href: "#studio", label: "Studio" },
];

export function AnnouncementBar() {
  return (
    <div className="flex h-9 items-center justify-center gap-7 border-b border-gold/22 bg-surface px-4 text-center md:h-10">
      <span className="kicker text-[9.5px] tracking-[0.22em] md:text-[10px]">Complimentary fitting on every bridal order</span>
      <span aria-hidden className="hidden size-1 rounded-full bg-gold md:block" />
      <span className="kicker hidden text-[10px] text-muted md:block">Studio open {SITE.hours}, every day</span>
    </div>
  );
}

function SlipButton() {
  const { count, setSlipOpen } = useStore();
  return (
    <Button
      variant="icon"
      size="icon"
      className="relative text-ivory"
      aria-label={count ? `Order slip, ${count} item${count > 1 ? "s" : ""}` : "Order slip, empty"}
      onClick={() => setSlipOpen(true)}
    >
      <BagIcon />
      {count > 0 && (
        <span className="absolute right-1 top-1.5 grid size-4 place-items-center rounded-full bg-crimson text-[9px] font-medium text-band">
          {count}
        </span>
      )}
    </Button>
  );
}

export function Header() {
  const { openBooking } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-500 ease-[var(--ease-settle)]",
        scrolled ? "border-b border-gold/22 bg-night/88 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-2 md:h-[88px] md:px-[clamp(24px,8.3vw,120px)]">
        <Button variant="icon" size="icon" className="text-ivory md:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
          <MenuIcon />
        </Button>
        <a href="#top" className="md:w-40" aria-label="Dazzle Couture, back to top">
          <img src="/logo-gold.png" alt="Dazzle Couture" width={787} height={249} className="h-[39px] w-auto md:h-[50px]" />
        </a>
        <nav aria-label="Collections" className="hidden gap-[clamp(18px,2.5vw,36px)] lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="py-3.5 text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Button variant="link" className="hidden h-10 text-[11.5px] md:inline-flex" onClick={() => openBooking()}>
            Book Appointment
          </Button>
          <SlipButton />
        </div>
      </div>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="w-[min(340px,88vw)] bg-night px-6 pb-8 pt-4 text-ivory shadow-[1px_0_0_rgb(184_152_60/0.3)]">
          <div className="flex items-center justify-between">
            <SheetTitle asChild>
              <img src="/logo-gold.png" alt="Dazzle Couture" className="h-9 w-auto" />
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="icon" size="icon" aria-label="Close menu" className="text-ivory">
                <CloseIcon />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <nav aria-label="Menu" className="mt-8 flex flex-col">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="border-b border-gold/20 py-4 font-serif text-[28px] leading-none text-ivory hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <Button
              onClick={() => {
                setMenu(false);
                openBooking();
              }}
            >
              Book Appointment
            </Button>
            <Button variant="link" asChild>
              <a href={waLink("Hello Dazzle Couture, I have a question.")} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={16} /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hello Dazzle Couture, I'd like to know more.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with the studio on WhatsApp"
      className="fixed bottom-6 right-4 z-30 grid size-14 place-items-center rounded-full border border-gold/70 bg-surface text-gold shadow-[0_0_24px_rgb(232_178_92/0.28)] transition-colors hover:text-gold-bright md:bottom-10 md:right-10 md:size-[60px]"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
