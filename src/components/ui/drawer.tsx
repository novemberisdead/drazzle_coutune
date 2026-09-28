import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

// shadcn Drawer (vaul), restyled as the ivory bottom sheet: 24px top corners, no border.
export const Drawer = DrawerPrimitive.Root;
export const DrawerTitle = DrawerPrimitive.Title;
export const DrawerDescription = DrawerPrimitive.Description;

export function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-night/78" />
      <DrawerPrimitive.Content
        className={cn(
          "on-band fixed inset-x-0 bottom-0 z-50 flex max-h-[94dvh] flex-col rounded-t-[24px] bg-band text-ink outline-none has-[[data-confirmed]]:bg-night",
          className,
        )}
        {...props}
      >
        <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-ink/18" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}
