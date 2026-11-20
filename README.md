# Sara Miljkovic | Links

A personal link-in-bio page for fitness, Pilates, lifestyle, and brand collaborations. It uses Next.js App Router, TypeScript, Tailwind CSS, self-hosted Inter, and Lucide React. Next.js exports ordinary HTML, CSS, JavaScript, and images for static hosting.

## Run locally

Use Node.js 24 LTS and pnpm 11.25.0. Then run these commands from the repository root.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address printed in your terminal (usually `http://localhost:3000`).

## Update the page

Edit [src/config/site.ts](src/config/site.ts). Save and refresh the page to see your changes.

- **Profile** — Edit `name`, `username`, `bio`, and `tagline` in `profile`.
- **Profile photo** — The site uses `public/images/sara-profile.webp`. To replace it, update the file or set `profile.photoPath` to a new public image path. Adjust `profile.photoPosition` to frame the face. If the file is missing, the profile displays initials.
- **Pilates photo** — The site uses `public/images/sara-pilates.webp`. To replace it, update the file or set `editorial.photoPath` to a new public image path. The full image fits inside the editorial frame, with the caption below it. If the file is missing, the caption appears on its own. The WebP versions are sized for the page and the original PNGs are retained.
- **Socials** — Set your Instagram and TikTok URLs in `socials`. Update `businessEmail` with the plain address shown in the Business Inquiries card.
- **Main links** — Add an item with a unique `id`, a `title`, an HTTPS `href`, and `enabled: true`. You can also add a `description`, an `icon` from `IconName`, or `featured: true`. Move entries up or down in the array to reorder them. Remove an entry or set `enabled: false` to hide it.
- **Prozis** — Find `id: "prozis-shop"` in `mainLinks`, paste the approved HTTPS shopping URL into `href`, and set `enabled: true`. Keep `featured: true` for the charcoal styling. Rebuild to update the static site.
- **Collaborations** — Replace or duplicate the disabled example in `collaborations` with a real title, URL, and unique ID. Enable the entry when it is ready.
- **Discounts** — Replace or duplicate the disabled example in `discounts` with a unique ID, brand name, code, description, and shopping URL. Add `percentage` if applicable, then set `enabled: true`. The section and its navigation card appear when there is a complete active offer. Clipboard copying works on HTTPS or localhost. The code is also selectable.
- **Social previews** — Set `seo.siteUrl` to your final HTTPS origin, such as your assigned Pages domain. This gives sharing platforms an absolute URL for `public/images/social-preview.png`. Update that graphic and `seo.description` if the branding changes.
- **Colors** — Edit the variables at the top of [app/globals.css](app/globals.css). If you change the background, also update the browser theme color in [app/layout.tsx](app/layout.tsx).

## Check and build

```sh
pnpm lint
pnpm typecheck
pnpm build
```

The production site is written to `out/`. To preview that exact build, run `python3 -m http.server 8080 --directory out` and open `http://localhost:8080`. Rebuild after editing the configuration. The footer year is set at build time.

## Deploy to Cloudflare Pages

In Cloudflare, open **Workers & Pages**, create a **Pages** project, and connect the existing GitHub repository. Select your production branch and apply these settings.

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Root directory | Repository root |
| Build command | `pnpm build` |
| Build output directory | `out` |
| `NODE_VERSION` build variable | `24.22.0` |
| `PNPM_VERSION` build variable | `11.25.0` |

The build variables pin the toolchain. The page itself requires no runtime environment variables. After receiving your Pages domain, add it to `seo.siteUrl` and rebuild to enable preview images in shared links.

[Cloudflare’s static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) · [Pages build image and version overrides](https://developers.cloudflare.com/pages/configuration/build-image/)
