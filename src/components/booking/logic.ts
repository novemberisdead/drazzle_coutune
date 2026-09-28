import { services } from "@/data/catalog";
import { SITE } from "@/lib/site";

export type Details = {
  name: string;
  phone: string;
  email: string;
  eventDate: string; // yyyy-mm-dd, optional
  budget: string;
  notes: string;
};

export const emptyDetails: Details = { name: "", phone: "", email: "", eventDate: "", budget: "", notes: "" };

export const STEP_LABELS = ["Service", "Date", "Time", "Details", "Review"] as const;

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fmtDay = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
export const fmtLong = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
export const fmtISO = (iso: string) => (iso ? new Date(`${iso}T00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

const hm = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
export const endTime = (start: string, minutes: number) => {
  const [h, m] = start.split(":").map(Number);
  return hm(h * 60 + m + minutes);
};

// Small stable hash so the same day always shows the same "Booked" slots in the demo.
function hash(s: string) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967295;
}

export type Slot = { time: string; state: "open" | "booked" | "passed" };

/** 30-minute starts from opening, ending by closing time. */
export function slotsFor(date: Date, minutes: number, now = new Date()): Slot[] {
  const out: Slot[] = [];
  const isToday = sameDay(date, now);
  const cutoff = now.getHours() * 60 + now.getMinutes() + 60;
  for (let t = SITE.openHour * 60; t + minutes <= SITE.closeHour * 60; t += 30) {
    const time = hm(t);
    let state: Slot["state"] = hash(`${toISO(date)} ${time}`) < 0.27 ? "booked" : "open";
    if (isToday && t < cutoff) state = "passed";
    out.push({ time, state });
  }
  return out;
}

export function groupSlots(slots: Slot[]) {
  const mins = (s: Slot) => Number(s.time.slice(0, 2)) * 60 + Number(s.time.slice(3));
  return [
    { label: "Late morning", slots: slots.filter((s) => mins(s) < 13 * 60) },
    { label: "Afternoon", slots: slots.filter((s) => mins(s) >= 13 * 60 && mins(s) < 17 * 60) },
    { label: "Evening", slots: slots.filter((s) => mins(s) >= 17 * 60) },
  ].filter((g) => g.slots.length);
}

export type Errors = Partial<Record<keyof Details, string>>;

export const cleanPhone = (raw: string) => raw.replace(/[^\d]/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

export function validate(d: Details, today = startOfDay(new Date())): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please add your name";
  if (!/^[6-9]\d{9}$/.test(cleanPhone(d.phone))) e.phone = "Enter a 10-digit mobile number";
  if (d.email.trim() && !/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = "That email doesn't look right";
  if (d.eventDate && new Date(`${d.eventDate}T00:00`) < today) e.eventDate = "Pick a date from today onwards";
  return e;
}

export const serviceById = (id: string | null) => services.find((s) => s.id === id) ?? null;

export function makeBookingId(date = new Date()) {
  return `DZ-${date.getFullYear()}-${String(Math.floor(100 + Math.random() * 9900)).padStart(4, "0")}`;
}

export type Booking = { id: string; serviceId: string; date: Date; time: string; details: Details };

export function whatsappText(b: Booking) {
  const s = serviceById(b.serviceId)!;
  const lines = [
    `Hello Dazzle Couture, I'd like to confirm my appointment.`,
    ``,
    `Booking ID: ${b.id}`,
    `Service: ${s.name} (${s.minutes} min)`,
    `Date: ${fmtLong(b.date)}`,
    `Time: ${b.time}–${endTime(b.time, s.minutes)}`,
    `Name: ${b.details.name.trim()}`,
    `Phone: +91 ${cleanPhone(b.details.phone)}`,
  ];
  if (b.details.eventDate) lines.push(`Event date: ${fmtISO(b.details.eventDate)}`);
  if (b.details.budget) lines.push(`Budget: ${b.details.budget}`);
  if (b.details.notes.trim()) lines.push(`Notes: ${b.details.notes.trim()}`);
  return lines.join("\n");
}

/** A calendar file for the appointment, in Kolkata time. */
export function icsFile(b: Booking) {
  const s = serviceById(b.serviceId)!;
  const d = toISO(b.date).replaceAll("-", "");
  const t = (x: string) => `${x.replace(":", "")}00`;
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dazzle Couture//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${b.id}@dazzle-couture`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;TZID=Asia/Kolkata:${d}T${t(b.time)}`,
    `DTEND;TZID=Asia/Kolkata:${d}T${t(endTime(b.time, s.minutes))}`,
    `SUMMARY:${s.name} · Dazzle Couture`,
    `LOCATION:Dazzle Couture\\, ${SITE.city}`,
    `DESCRIPTION:Booking ${b.id}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return new Blob([body], { type: "text/calendar" });
}
