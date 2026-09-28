// Prices are plausible INR placeholders for the demo, not the studio's real prices.

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: "New" | "Detail";
  line: string;
  colour: string;
};

export const products: Product[] = [
  { id: "sharara", name: "Crimson Zardozi Sharara", price: 68500, image: "p-sharara", tag: "New", line: "Lehenga · Made to measure", colour: "Crimson" },
  { id: "dupatta", name: "Bridal Dupatta Set", price: 24900, image: "p-dupatta", tag: "Detail", line: "Bridal · Hand zardozi", colour: "Crimson" },
  { id: "resham", name: "Ivory Resham Sherwani", price: 54000, image: "p-resham", tag: "New", line: "Sherwani · Raw silk", colour: "Ivory" },
  { id: "placket", name: "Champagne Placket Sherwani", price: 61500, image: "p-placket", tag: "Detail", line: "Sherwani · Sequin vine", colour: "Champagne" },
  { id: "crystal", name: "Crystal Lapel Tuxedo", price: 38500, image: "p-crystal", tag: "New", line: "Tuxedo · Hand-set crystal", colour: "Black" },
  { id: "vine", name: "Gold Vine Dinner Jacket", price: 42000, image: "p-vine", tag: "Detail", line: "Party · Bead embroidery", colour: "Black and gold" },
  { id: "velvet", name: "Midnight Velvet Suit", price: 18900, image: "p-velvet", tag: "New", line: "Suits · Velvet & zari", colour: "Midnight blue" },
  { id: "marigold", name: "Marigold Organza Suit", price: 16500, image: "p-marigold", tag: "New", line: "Suits · Organza dupatta", colour: "Marigold" },
];

export type Category = { id: string; name: string; image: string; standIn?: boolean };

// Lehenga leads per the BRD. Its photo is a stand-in until real lehenga shots arrive.
export const categories: Category[] = [
  { id: "lehenga", name: "Lehenga", image: "c-lehenga", standIn: true },
  { id: "bridal", name: "Bridal", image: "c-bridal" },
  { id: "sherwani", name: "Sherwani", image: "c-sherwani" },
  { id: "tuxedo", name: "Tuxedo & Party", image: "c-tuxedo" },
  { id: "suits", name: "Suits", image: "c-suits" },
];

export type Service = { id: string; name: string; minutes: number; blurb: string };

export const services: Service[] = [
  { id: "design", name: "Design Consultation", minutes: 45, blurb: "Sketch your outfit with the designer" },
  { id: "bridal", name: "Bridal Consultation", minutes: 60, blurb: "Lehenga, dupatta and trousseau planning" },
  { id: "measure", name: "Measurement", minutes: 30, blurb: "A full set of measurements, kept on file" },
  { id: "fitting", name: "Trial / Fitting", minutes: 30, blurb: "Try it on, adjust, try again" },
  { id: "alteration", name: "Alteration Drop-off", minutes: 15, blurb: "Leave a piece with us for alterations" },
];

export const budgets = ["Under ₹50k", "₹50k–1L", "₹1–2L", "₹2L+"] as const;

// Clearly labelled samples for the demo.
export const testimonials = [
  { quote: "They re-drew the neckline three times until it sat exactly right. I felt like the only bride they had.", who: "Ananya R.", what: "Bridal lehenga" },
  { quote: "Matching sherwanis for my brother and me, fitted in two visits. The embroidery photographs beautifully.", who: "Rohit S.", what: "Sherwani pair" },
  { quote: "Booked on WhatsApp at midnight, measured the next evening. The reception tux fit like it was mine.", who: "Farhan M.", what: "Party tuxedo" },
];

export const instagram = [
  { image: "ig-bridal", alt: "Crimson bridal sharara on a mannequin under chandeliers" },
  { image: "ig-pair", alt: "A pair of ivory sherwanis under crystal chandeliers" },
  { image: "ig-tuxedo", alt: "Three embellished tuxedos on stands" },
  { image: "ig-sleeve", alt: "Sequinned tuxedo sleeve, close detail" },
  { image: "ig-suits", alt: "Five salwar suits with rose petals on the floor" },
  { image: "ig-zardozi", alt: "Zardozi embroidery on crimson silk, close detail" },
  { image: "ig-sherwani", alt: "Ivory sherwani with champagne embroidery" },
  { image: "ig-velvet", alt: "Midnight blue velvet suit, close detail" },
  { image: "ig-collar", alt: "Embroidered sherwani collar, close detail" },
];
