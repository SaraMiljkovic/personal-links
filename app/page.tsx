import { EditorialPhoto } from "@/src/components/EditorialPhoto";
import { DiscountSection } from "@/src/components/DiscountSection";
import { hasDestination, isWebUrl, LinksList, SocialLinks } from "@/src/components/Links";
import { ProfileHeader } from "@/src/components/ProfileHeader";
import { site, type ContactEntry, type LinkEntry } from "@/src/config/site";

export default function Home() {
  const socials = Object.values(site.socials).filter(hasDestination);
  const collaborations = site.collaborations.filter(hasDestination);
  const discounts = site.discounts.filter(
    ({ enabled, brand, code, shopUrl }) => enabled && brand.trim() && code.trim() && isWebUrl(shopUrl),
  );
  const sections = { collaborations, discounts };

  const email = site.businessEmail.trim();
  const mainLinks = site.mainLinks.flatMap<LinkEntry | ContactEntry>((entry) => {
    if (!entry.enabled || !entry.title.trim()) return [];
    if ("contact" in entry) {
      return /^[^\s@]+@[^\s@]+$/.test(email) ? [{ ...entry, email }] : [];
    }
    if ("section" in entry) {
      return sections[entry.section].length ? [{ ...entry, href: `#${entry.section}` }] : [];
    }
    const destination = "social" in entry ? site.socials[entry.social] : entry;
    return hasDestination(destination) ? [{ ...entry, href: destination.href }] : [];
  });
  const contact = mainLinks.find((entry) => "email" in entry);
  const hasContent = socials.length || mainLinks.length || collaborations.length || discounts.length;

  return (
    <div className="site-shell">
      <main>
        <ProfileHeader profile={site.profile} />
        {mainLinks.length > 0 && (
          <nav className="content-section primary-links" aria-label={site.labels.links}>
            <LinksList links={mainLinks} />
          </nav>
        )}
        <EditorialPhoto {...site.editorial} />
        {collaborations.length > 0 && (
          <section className="content-section" id="collaborations" aria-labelledby="collaborations-title">
            <h2 id="collaborations-title">{site.labels.collaborations}</h2>
            <LinksList links={collaborations} />
          </section>
        )}
        {discounts.length > 0 && <DiscountSection title={site.labels.discounts} discounts={discounts} />}
        {!hasContent && site.labels.empty && <p className="empty-state">{site.labels.empty}</p>}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} {site.profile.name}</p>
        <SocialLinks links={socials} contactId={contact?.id} />
      </footer>
    </div>
  );
}
