import { Toaster as Sonner } from "sonner";

// Sonner, restyled: surface card, gold hairline and glow, 14px radius.
export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      duration={4000}
      offset={{ bottom: 96 }}
      mobileOffset={{ bottom: 96, left: 16, right: 16 }}
      style={{ ["--width" as string]: "min(460px, calc(100vw - 32px))" }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-full items-center gap-3.5 rounded-[14px] border border-gold/55 bg-surface py-3.5 pl-5 pr-3.5 text-ivory shadow-[0_0_40px_rgb(232_178_92/0.14)] font-sans",
          title: "text-[14.5px] font-normal",
          description: "text-[12.5px] text-muted",
          icon: "text-gold",
          closeButton: "text-muted",
          actionButton:
            "ml-auto shrink-0 cursor-pointer whitespace-nowrap px-1 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-gold shadow-[inset_0_-1px_0_rgb(184_152_60/0.55)] hover:text-gold-bright",
        },
      }}
    />
  );
}
