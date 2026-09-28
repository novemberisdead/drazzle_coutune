import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn Button, restyled: no radius-md box, no shadow. Two equal-weight characters:
// a crimson pill and a gold text link with a hairline underline.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans font-medium uppercase transition-colors duration-200 ease-[var(--ease-settle)] disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        pill: "rounded-full bg-crimson text-band hover:bg-crimson-hover",
        link: "text-gold shadow-[inset_0_-1px_0_rgb(184_152_60/0.55)] hover:text-gold-bright hover:shadow-[inset_0_-1px_0_var(--color-gold-bright)]",
        linkDeep: "text-gold-deep shadow-[inset_0_-1px_0_rgb(122_98_32/0.6)] hover:text-ink",
        icon: "rounded-full text-current hover:text-gold",
      },
      size: {
        md: "h-[52px] px-[26px] text-[12px] tracking-[0.16em]",
        lg: "h-14 px-[30px] text-[12.5px] tracking-[0.18em]",
        sm: "h-[52px] px-2.5 text-[11px] tracking-[0.12em]",
        icon: "size-11 p-0",
      },
    },
    compoundVariants: [
      { variant: ["link", "linkDeep"], size: ["md", "lg", "sm"], class: "px-1" },
    ],
    defaultVariants: { variant: "pill", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { buttonVariants };
