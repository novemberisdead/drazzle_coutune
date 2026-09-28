import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

// shadcn Sheet (Radix Dialog), restyled: no border or shadow, slides 480 ms on the settle curve.
export const Sheet = DialogPrimitive.Root;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

type Side = "left" | "right";

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: Side }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-night/78 data-[state=open]:animate-[fade-in_420ms_var(--ease-settle)] data-[state=closed]:animate-[fade-out_240ms_ease-in]" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col outline-none",
          side === "right"
            ? "right-0 data-[state=open]:animate-[slide-in-right_480ms_var(--ease-settle)] data-[state=closed]:animate-[slide-out-right_280ms_ease-in]"
            : "left-0 data-[state=open]:animate-[slide-in-left_480ms_var(--ease-settle)] data-[state=closed]:animate-[slide-out-left_280ms_ease-in]",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
