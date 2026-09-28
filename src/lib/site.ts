// Studio details. Bracketed values are placeholders until the client confirms them.
export const SITE = {
  name: "Dazzle Couture",
  city: "Kolkata, West Bengal",
  address: "[Studio address]",
  hours: "11:00–21:00",
  openHour: 11,
  closeHour: 21,
  // Digits only, with country code, for wa.me links. Replace with the studio's number.
  whatsapp: "910000000000",
  whatsappDisplay: "+91 [number]",
  instagram: "dazzle.couture",
  credit: "Demo concept by Windleaf Technology",
};

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const igLink = `https://instagram.com/${SITE.instagram}`;
