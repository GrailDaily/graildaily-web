# GrailDaily

GrailDaily is an editorial website focused on mysteries, ancient civilizations, lost history, archaeology, science, history, humanity, space, and technology.

## Architecture

```text
CMS (Next.js)
    ↓
Database (Prisma)
    ↓
CMS API
    ↓
Astro Website
    ↓
Vercel
    ↓
GrailDaily
```

## Project Structure

```text
GrailDaily/
├── apps/
│   ├── web/              # Astro website
│   └── cms/              # Next.js CMS
├── pnpm-workspace.yaml
└── GRAILDAILY-PROJECT.md
```

## Web — `apps/web`

The public GrailDaily website is built with Astro 7, TypeScript, Tailwind CSS 4, Pagefind, and the Vercel adapter.

The website consumes published article content from the CMS through its API.

## CMS — `apps/cms`

The GrailDaily CMS is built with Next.js 16, React 19, Prisma, Cloudinary, Tailwind CSS, shadcn/ui, and Zod.

The CMS manages article content and exposes API endpoints consumed by the Astro website.

## Local Development

Install dependencies from the repository root:

```bash
pnpm install
```

Start the CMS:

```bash
pnpm --filter cms dev
```

The CMS runs at `http://localhost:3000`.

Start the website in another terminal:

```bash
pnpm --filter astro-paper-v6 dev
```

The website runs at `http://localhost:4321`.

## Environment Variables

The website uses `CMS_API_URL` to connect to the CMS API.

For local development, the default CMS URL is `http://localhost:3000`.

The website may also use `PUBLIC_GOOGLE_SITE_VERIFICATION` for Google site verification.

CMS environment variables contain database and service configuration. Secrets must never be committed to Git.

## Build

Build the website:

```bash
pnpm --filter astro-paper-v6 build
```

The web build performs Astro type checking, the production Astro build, and Pagefind indexing.

Build the CMS:

```bash
pnpm --filter cms build
```

The CMS build generates Prisma client code and then builds Next.js.

## CMS API

The CMS exposes article endpoints including:

- `/api/articles`
- `/api/articles/[slug]`
- `/api/articles/popular`
- `/api/articles/hero`
- `/api/articles/editors-picks`
- `/api/articles/trending`

The Astro CMS client is located at `apps/web/src/lib/cms.ts`.

## Website Features

- Homepage
- Hero
- Editor Picks
- Trending
- Categories
- Popular
- Latest
- About
- Article pages
- Search with Pagefind
- Light and dark theme
- Newsletter UI
- Responsive desktop and mobile layouts

## Categories

GrailDaily currently uses 14 categories:

- Archaeology
- Economics
- Entertainment
- Geography
- History
- Humanity
- Mysteries
- Mythology
- Nature
- Politics
- Religion
- Science
- Space
- Technology

## Deployment

The public website is deployed with Vercel.

The CMS is maintained as a separate application and is intended to be deployed independently.

```text
GrailDaily CMS
      ↓
Production Database
      ↓
CMS API
      ↓
Astro Website
      ↓
Vercel
      ↓
graildaily.com
```

## Development Principles

- The CMS is the source of truth for article content.
- Do not reintroduce the old Astro content collection as the primary article source.
- Do not use the old Netlify/Decap CMS configuration.
- Keep the public website and CMS separated.
- Test CMS → API → Astro integration before production deployment.
- Do not commit secrets or production credentials.
- Prefer small, verifiable changes during development.

## Project Documentation

The complete development checklist and project history are maintained in `GRAILDAILY-PROJECT.md`.

This file is the primary project checklist and should be kept synchronized with major development milestones.
