import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/catalog";

type Line = { product: Product; qty: number };

type Store = {
  lines: Line[];
  count: number;
  subtotal: number;
  add: (p: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  slipOpen: boolean;
  setSlipOpen: (open: boolean) => void;
  bookingOpen: boolean;
  bookingService: string | null;
  openBooking: (serviceId?: string) => void;
  setBookingOpen: (open: boolean) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [slipOpen, setSlipOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | null>(null);

  const add = useCallback((p: Product) => {
    setLines((ls) => {
      const hit = ls.find((l) => l.product.id === p.id);
      return hit ? ls.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { product: p, qty: 1 }];
    });
    toast(`${p.name} added to your order slip`, {
      action: { label: "View slip", onClick: () => setSlipOpen(true) },
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((ls) => (qty < 1 ? ls.filter((l) => l.product.id !== id) : ls.map((l) => (l.product.id === id ? { ...l, qty } : l))));
  }, []);

  const remove = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.product.id !== id)), []);

  const openBooking = useCallback((serviceId?: string) => {
    setBookingService(serviceId ?? null);
    setSlipOpen(false);
    setBookingOpen(true);
  }, []);

  const value = useMemo<Store>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      add,
      setQty,
      remove,
      slipOpen,
      setSlipOpen,
      bookingOpen,
      bookingService,
      openBooking,
      setBookingOpen,
    }),
    [lines, add, setQty, remove, slipOpen, bookingOpen, bookingService, openBooking],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside StoreProvider");
  return s;
}

/** The demo's answer to anything outside its scope. */
export function fullVersionToast(detail = "This part of the site is switched off in the demo.") {
  toast("Available in the full version", { description: detail });
}
