import { ArrowDownRight, ArrowUpRight, Handshake, Mail, ShoppingBag, Tag } from "lucide-react";
import type { ContactEntry, IconName, LinkEntry } from "@/src/config/site";

import { ContactCard, ContactShortcut } from "./ContactCard";

const icons = { collaborations: Handshake, discounts: Tag, email: Mail, shopping: ShoppingBag };

function LinkIcon({ name }: { name: IconName }) {
  if (name === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M15.4 2h-3.1v13.5a2.8 2.8 0 1 1-2.8-2.8h.6V9.6h-.6a5.9 5.9 0 1 0 5.9 5.9V8.6a7.5 7.5 0 0 0 4.6 1.6V7.1A4.6 4.6 0 0 1 15.4 2Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="20" height="20" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  const Icon = icons[name];
  return <Icon size={20} strokeWidth={1.75} aria-hidden="true" />;
}

export function isWebUrl(href: string) {
  return /^https?:\/\//i.test(href) && URL.canParse(href);
}

export function hasDestination({ enabled, href, title }: LinkEntry) {
  return enabled && Boolean(title.trim()) && (
    isWebUrl(href) || /^mailto:[^\s@?]+@[^\s@?]+(?:\?\S*)?$/i.test(href)
  );
}

export function externalAttributes(href: string) {
  return isWebUrl(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function SocialLinks({ links, contactId }: { links: LinkEntry[]; contactId?: string }) {
  if (!links.length && !contactId) return null;

  return (
    <nav className="socials" aria-label="Social and contact links">
      {links.map(({ id, href, title, icon }) => (
        <a key={id} href={href} aria-label={title} {...externalAttributes(href)}>
          <LinkIcon name={icon ?? "email"} />
        </a>
      ))}
      {contactId && <ContactShortcut contactId={contactId} />}
    </nav>
  );
}

export function LinksList({ links }: { links: (LinkEntry | ContactEntry)[] }) {
  return (
    <ul className="link-list">
      {links.map((entry, index) => (
        <li key={entry.id} style={{ animationDelay: `${Math.min(index, 5) * 55}ms` }}>
          {"email" in entry ? <ContactCard {...entry} /> : <LinkCard {...entry} />}
        </li>
      ))}
    </ul>
  );
}

function LinkCard({ href, title, description, icon, featured }: LinkEntry) {
  return (
    <a className="link-card" data-featured={featured || undefined} href={href} {...externalAttributes(href)}>
      {icon && <span className="link-icon"><LinkIcon name={icon} /></span>}
      <span className="link-copy">
        <span className="link-title">{title}</span>
        {description && <span className="link-description">{description}</span>}
      </span>
      {href.startsWith("#")
        ? <ArrowDownRight className="link-arrow" size={17} aria-hidden="true" />
        : <ArrowUpRight className="link-arrow" size={17} aria-hidden="true" />}
    </a>
  );
}
