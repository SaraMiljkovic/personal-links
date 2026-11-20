import type { Discount } from "@/src/config/site";
import { CopyCode } from "./CopyCode";
import { externalAttributes } from "./Links";

export function DiscountSection({ title, discounts }: { title: string; discounts: Discount[] }) {
  return (
    <section className="content-section" id="discounts" aria-labelledby="discounts-title">
      <h2 id="discounts-title">{title}</h2>
      <ul className="link-list">
        {discounts.map(({ id, brand, code, description, shopUrl, percentage }) => (
          <li key={id} className="discount-card">
            <div className="discount-heading">
              <h3>{brand}</h3>
              {percentage !== undefined && <span className="discount-badge">{percentage}% off</span>}
            </div>
            {description && <p className="link-description">{description}</p>}
            <code className="discount-code">{code}</code>
            <div className="discount-actions">
              <CopyCode code={code} brand={brand} />
              <a className="action shop-link" href={shopUrl} aria-label={`Shop Now at ${brand}`} {...externalAttributes(shopUrl)}>
                Shop Now
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
