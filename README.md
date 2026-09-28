# Dazzle Couture: one-page demo

A sales demo for Dazzle Couture, a Kolkata couture studio ([@dazzle.couture](https://instagram.com/dazzle.couture)). It follows the **Night Window** design direction: dark-first, photos that dissolve into the page, a crimson pill and a gold text link as equal-weight actions.

Demo concept by Windleaf Technology.

## Run it

```bash
npm install
npm run dev      # crops the photos, then starts Vite
npm run build    # crops, typechecks, builds to dist/
npm run preview
```

Stack: Vite, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui-style components (Radix Dialog, vaul Drawer, Sonner), all restyled to the brand tokens in `src/index.css`.

## What's where

| Path | What |
| --- | --- |
| `src/index.css` | Design tokens (`@theme`), reveal/glow/tape utilities, reduced-motion rules |
| `src/components/sections/` | The 13 page sections, header, mobile menu, floating WhatsApp |
| `src/components/booking/` | Booking flow: measuring-tape progress, calendar, slots, validation, fitting card, `.ics` export |
| `src/components/OrderSlip.tsx` | The cart as an order slip |
| `src/components/ui/` | Restyled shadcn primitives: button, dialog, sheet, drawer, toaster |
| `src/data/catalog.ts` | Products, categories, services, sample reviews, Instagram tiles |
| `src/data/crops.json` + `scripts/crop-images.mjs` | Focal-point crops of the studio photos, exported to `public/img/` with sharp |
| `src/lib/site.ts` | Studio address, hours, WhatsApp number, Instagram handle |

## Images

Every studio photo has a "DAZZLE COUTURE" watermark baked in near the bottom. Product and category tiles are cut from focal points in `crops.json` (4:5 for products), so the watermark never appears in them. Instagram tiles keep the photo as posted. Originals live in `assets-src/`. `public/img/` is generated, so edit the JSON rather than the output.

## Before this goes to the client

- **Placeholders.** Fill in `SITE.address`, `SITE.whatsapp` and `SITE.whatsappDisplay` in `src/lib/site.ts`. The WhatsApp links currently point at a dummy number.
- **Stand-in image.** The Lehenga tile uses the crimson bridal photo, marked "Stand-in". Swap `c-lehenga` in `crops.json` once real lehenga photos arrive.
- **Sample content.** Prices are INR placeholders, and the reviews are labelled as samples.
- **Demo-only features.** Checkout, newsletter sign-up and collection pages show an "Available in the full version" toast.
- **No backend.** Bookings aren't stored. The fitting card's "Confirm on WhatsApp" opens a prefilled chat with the booking details. Booked slots are simulated, and stay the same for each date.
