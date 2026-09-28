import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 22, strokeWidth = 1.3, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: P) => <Svg {...p}><path d="M3 7h18M3 12h12M3 17h18" /></Svg>;
export const BagIcon = (p: P) => <Svg {...p}><path d="M5.5 8h13l-1 12.5h-11z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></Svg>;
export const CloseIcon = (p: P) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const ArrowIcon = (p: P) => <Svg size={16} strokeWidth={1.4} {...p}><path d="M4 12h15M14 7l5 5-5 5" /></Svg>;
export const BackIcon = (p: P) => <Svg size={20} {...p}><path d="M15 5l-7 7 7 7" /></Svg>;
export const NextIcon = (p: P) => <Svg size={20} {...p}><path d="M9 5l7 7-7 7" /></Svg>;
export const PlusIcon = (p: P) => <Svg size={18} {...p}><path d="M12 5v14M5 12h14" /></Svg>;
export const MinusIcon = (p: P) => <Svg size={16} {...p}><path d="M5 12h14" /></Svg>;
export const TapeIcon = (p: P) => <Svg {...p}><circle cx="9" cy="11" r="6" /><circle cx="9" cy="11" r="1.6" /><path d="M9 17h12v-4M13 17v-2M16 17v-2M19 17v-2" /></Svg>;
export const FabricIcon = (p: P) => <Svg {...p}><path d="M4 6c3-2 5 2 8 0s5-2 8 0v12c-3-2-5 2-8 0s-5-2-8 0z" /></Svg>;
export const BoxIcon = (p: P) => <Svg {...p}><path d="M3 8l9-4 9 4-9 4z" /><path d="M3 8v8l9 4 9-4V8M12 12v8" /></Svg>;
export const PinIcon = (p: P) => <Svg size={14} {...p}><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></Svg>;
export const SparkIcon = (p: P) => <Svg {...p}><path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" /></Svg>;
export const AlertIcon = (p: P) => <Svg size={14} strokeWidth={1.5} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></Svg>;
export const InstagramIcon = (p: P) => <Svg {...p}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r=".6" /></Svg>;
export const WhatsAppIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 20l1.2-3.7A8 8 0 1 1 8.2 19z" />
    <path d="M9 9.2c.2 3 2.6 5.5 5.7 5.7l1-1.4-1.9-1-1 .7a4 4 0 0 1-2-2l.7-1-1-1.9z" />
  </Svg>
);
