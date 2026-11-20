export type IconName = "collaborations" | "discounts" | "instagram" | "tiktok" | "email" | "shopping";

export type Profile = {
  name: string;
  username: string;
  bio: string;
  tagline: string;
  photoPath: string;
  photoPosition: string;
};

export type LinkEntry = {
  id: string;
  title: string;
  href: string;
  icon?: IconName;
  description?: string;
  enabled: boolean;
  featured?: boolean;
};

export type ContactEntry = Pick<LinkEntry, "id" | "title" | "description"> & { email: string };

export type Discount = {
  id: string;
  brand: string;
  code: string;
  description: string;
  shopUrl: string;
  percentage?: number;
  enabled: boolean;
};

type SocialName = "instagram" | "tiktok";
type SectionName = "collaborations" | "discounts";

export type MainLink = Omit<LinkEntry, "href"> & (
  | { href: string }
  | { social: SocialName }
  | { section: SectionName }
  | { contact: true }
);

type SiteConfig = {
  profile: Profile;
  seo: { description: string; siteUrl: string };
  businessEmail: string;
  socials: Record<SocialName, LinkEntry>;
  mainLinks: MainLink[];
  collaborations: LinkEntry[];
  discounts: Discount[];
  labels: Record<SectionName, string> & { links: string; empty: string };
  editorial: { photoPath: string; alt: string; caption: string };
};

export const site: SiteConfig = {
  profile: {
    name: "Sara Miljkovic",
    username: "@sara_miljkovicc",
    bio: "Fitness · Pilates · Lifestyle",
    tagline: "Movement, balance & everything in between.",
    photoPath: "/images/sara-profile.webp",
    photoPosition: "48% 34%",
  },
  seo: {
    description: "Fitness, Pilates, lifestyle, collaborations and more. Explore Sara Miljkovic's links.",
    siteUrl: "", // Optional. Enter the final HTTPS origin to enable the social preview image.
  },
  businessEmail: "saramiljkovicbiz2@gmail.com",
  socials: {
    instagram: { id: "social-instagram", title: "Instagram", href: "https://www.instagram.com/sara_miljkovicc/", icon: "instagram", enabled: true },
    tiktok: { id: "social-tiktok", title: "TikTok", href: "https://www.tiktok.com/@saritakiii", icon: "tiktok", enabled: true },
  },
  mainLinks: [
    { id: "main-instagram", title: "Instagram", description: "Follow my everyday moments", social: "instagram", icon: "instagram", enabled: true },
    { id: "main-contact", title: "Business Inquiries", description: "Let's work together", contact: true, icon: "email", enabled: true },
    {
      id: "prozis-shop",
      title: "Shop My Prozis Favorites",
      description: "My favorite fitness & lifestyle essentials",
      href: "",
      icon: "shopping",
      enabled: false,
      featured: true,
    },
    {
      id: "main-collaborations",
      title: "Brand Collaborations",
      description: "Explore my brand partnerships",
      section: "collaborations",
      icon: "collaborations",
      enabled: true,
    },
    {
      id: "main-discounts",
      title: "Discount Codes",
      description: "Find a code for your next order",
      section: "discounts",
      icon: "discounts",
      enabled: true,
    },
    { id: "main-tiktok", title: "TikTok", description: "Follow me on TikTok", social: "tiktok", icon: "tiktok", enabled: true },
  ],
  collaborations: [
    // Disabled example. Add a real partnership title and URL before enabling.
    { id: "example-collaboration", title: "", href: "", icon: "collaborations", enabled: false },
  ],
  discounts: [
    // Disabled example. Fill in your brand, code, description and shopping URL before enabling.
    { id: "example-discount", brand: "", code: "", description: "", shopUrl: "", enabled: false },
  ],
  labels: {
    links: "Links",
    collaborations: "Brand Collaborations",
    discounts: "Discount Codes",
    empty: "Links coming soon.",
  },
  editorial: {
    photoPath: "/images/sara-pilates.webp",
    alt: "Sara Miljkovic practicing Pilates",
    caption: "MOVE WITH INTENTION.",
  },
};
