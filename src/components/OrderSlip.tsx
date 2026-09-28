import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/Icons";
import { fullVersionToast, useStore } from "@/state/store";
import { img, inr } from "@/lib/utils";

const slipDate = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** The cart as an order slip: perforated edge, stitched dividers, a serif total. */
export function OrderSlip() {
  const { lines, subtotal, setQty, remove, slipOpen, setSlipOpen, openBooking } = useStore();
  const empty = lines.length === 0;

  return (
    <Sheet open={slipOpen} onOpenChange={setSlipOpen}>
      <SheetContent className="on-band w-[calc(100vw-22px)] max-w-[480px] bg-band text-ink">
        <div aria-hidden className="perforated-top h-3 shrink-0 md:hidden" />
        <div aria-hidden className="absolute -left-1.5 inset-y-0 hidden w-3 bg-[radial-gradient(circle_at_0_7px,rgb(11_9_8/0.8)_5px,transparent_5.5px)] bg-[length:12px_14px] bg-repeat-y md:block" />
        <div className="flex shrink-0 items-start justify-between pl-6 pr-3 pt-3.5 md:pl-10 md:pr-7 md:pt-7">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <span className="text-[9.5px] uppercase tracking-[0.2em] text-ink-muted md:text-[10px]">{empty ? slipDate() : `No. 0142 · ${slipDate()}`}</span>
            <SheetTitle className="m-0 font-serif text-[32px] font-normal md:text-[40px]">Order slip</SheetTitle>
          </div>
          <button type="button" aria-label="Close order slip" onClick={() => setSlipOpen(false)} className="grid size-11 cursor-pointer place-items-center">
            <CloseIcon size={20} />
          </button>
        </div>
        <div className="stitch mx-6 mt-3.5 md:ml-10 md:mr-8" />

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-[18px] px-9 text-center">
            <svg aria-hidden width="92" height="120" viewBox="0 0 92 120" fill="none">
              <path d="M22 4h48l18 16v96H4V20z" stroke="#7a6220" strokeDasharray="4 4" />
              <circle cx="46" cy="22" r="6" stroke="#7a6220" />
              <path d="M20 60h52M20 74h52M20 88h32" stroke="rgb(122 98 32 / 0.4)" />
            </svg>
            <h3 className="m-0 font-serif text-[30px] font-normal">Nothing on the slip yet</h3>
            <SheetDescription className="m-0 text-[14px] leading-[1.55] text-ink-muted">
              Every piece is made to measure. Start with a look you love, or come in and we'll design one with you.
            </SheetDescription>
            <div className="mt-1.5 flex w-full flex-col gap-2">
              <Button asChild className="w-full">
                <a href="#shop" onClick={() => setSlipOpen(false)}>Browse new arrivals</a>
              </Button>
              <Button variant="linkDeep" className="mx-auto" onClick={() => openBooking()}>
                Book Appointment
              </Button>
            </div>
          </div>
        ) : (
          <>
            <SheetDescription className="sr-only">Pieces you have added. Checkout is switched off in this demo.</SheetDescription>
            <ul className="m-0 flex min-h-0 flex-1 list-none flex-col overflow-y-auto px-6 md:pl-10 md:pr-8">
              {lines.map(({ product: p, qty }) => (
                <li key={p.id} className="flex gap-3.5 border-b border-dashed border-gold-deep/70 py-4 md:gap-[18px] md:py-5">
                  <img src={img(p.image)} alt="" className="h-[95px] w-[76px] shrink-0 object-cover md:h-[120px] md:w-24" />
                  <div className="flex flex-1 flex-col gap-1.5 md:gap-2">
                    <div className="flex justify-between gap-2">
                      <span className="font-serif text-[19px] font-medium leading-[1.1] md:text-[22px]">{p.name}</span>
                      <span className="whitespace-nowrap text-[14px] md:text-[15px]">{inr(p.price * qty)}</span>
                    </div>
                    <span className="text-[12px] text-ink-muted md:text-[13px]">Made to measure · {p.colour}</span>
                    <div className="mt-0.5 flex items-center gap-0.5">
                      <button type="button" aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQty(p.id, qty - 1)} className="grid size-9 cursor-pointer place-items-center rounded-full border border-gold-deep/40 md:size-10">
                        <MinusIcon />
                      </button>
                      <span aria-live="polite" className="w-8 text-center text-[14px]">{qty}</span>
                      <button type="button" aria-label={`Increase quantity of ${p.name}`} onClick={() => setQty(p.id, qty + 1)} className="grid size-9 cursor-pointer place-items-center rounded-full border border-gold-deep/40 md:size-10">
                        <PlusIcon size={16} />
                      </button>
                      <button type="button" onClick={() => remove(p.id)} className="ml-auto cursor-pointer text-[10px] font-medium uppercase tracking-[0.16em] text-gold-deep underline underline-offset-[3px]">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              <li className="flex flex-col pt-1">
                <SlipRow k="Subtotal" v={inr(subtotal)} />
                <SlipRow k="Fitting" v="Included" tight />
                <SlipRow k="Delivery" v="Calculated at checkout" tight muted />
                <div className="border-t border-ink" />
                <div className="flex items-baseline justify-between py-3">
                  <span className="text-[9.5px] font-medium uppercase tracking-[0.2em] text-ink md:text-[10px]">Total</span>
                  <span className="font-serif text-[28px] font-medium md:text-[32px]">{inr(subtotal)}</span>
                </div>
              </li>
            </ul>
            <div className="flex shrink-0 flex-col gap-2.5 border-t border-gold-deep/20 px-6 pb-[max(26px,env(safe-area-inset-bottom))] pt-3.5 md:pl-10 md:pr-8">
              <Button className="w-full" onClick={() => fullVersionToast("Checkout is switched off in this demo.")}>
                Proceed to checkout
              </Button>
              <span className="text-center text-[12px] text-ink-muted">Made to order · lead time confirmed at your fitting</span>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function SlipRow({ k, v, tight, muted }: { k: string; v: string; tight?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between ${tight ? "pb-3" : "py-3"}`}>
      <span className="text-[9.5px] uppercase tracking-[0.2em] text-ink-muted md:text-[10px]">{k}</span>
      <span className={muted ? "text-[13px] text-ink-muted" : "text-[15px]"}>{v}</span>
    </div>
  );
}
