export const site = {
  name: "YouWin Educational Consulting",
  shortName: "YouWin",
  url: "https://youwinconsult.com",
  tagline: "Expert Guidance for Your Global Education Journey",
  description:
    "YouWin Educational Consulting is a global education consultancy with offices in the UK, Nigeria, and the UAE, helping students secure admissions, visas, and scholarships at top universities in the UK, USA, Canada, and Europe.",
  address: {
    street: "4 Broad Street",
    locality: "Lagos Island",
    region: "Lagos",
    country: "Nigeria",
  },
  addressUK: {
    street: "6 Parkland Rise",
    locality: "Minehead",
    country: "United Kingdom",
    full: "6 Parkland Rise, Minehead, UK",
  },
  phones: ["+234 8167972108", "+234 806 701 6166"],
  whatsapp: "+234 8167972108",
  whatsappHref: "https://wa.me/2348167972108",
  email: "hello@youwinconsult.com",
  formsEmail: "form@youwinconsult.com",
  social: {
    facebook: "https://www.facebook.com/youwinconsult/",
  },
  offices: ["UK", "Nigeria", "UAE"],
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog & News", href: "/blog-news" },
  { label: "Contact", href: "/contact" },
] as const;

export const studyAbroadNav = [
  {
    label: "United Kingdom",
    href: "/destinations/united-kingdom",
    flag: "/images/flags/united-kingdom.png",
  },
  {
    label: "Ireland",
    href: "/destinations/ireland",
    flag: "/images/flags/ireland.png",
  },
  {
    label: "United States",
    href: "/destinations/usa",
    flag: "/images/flags/usa.png",
  },
  {
    label: "Canada",
    href: "/destinations/canada",
    flag: "/images/flags/canada.png",
  },
  {
    label: "Australia",
    href: "/destinations/australia",
    flag: "/images/flags/australia.png",
  },
] as const;
