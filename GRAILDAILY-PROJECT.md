# GRAILDAILY ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â MASTER PROJECT DOCUMENT

> Dokumen induk utama proyek GrailDaily.
> Dokumen ini adalah sumber kebenaran utama untuk melanjutkan proyek.
> Master Checklist, Project State, Technical Decisions, dan aturan pengembangan berada di dalam dokumen ini.

---

# 1. PROJECT CONTEXT

## Project

- Name: GrailDaily
- Type: Editorial / Magazine Website
- Main topics:
  - Mysteries
  - Ancient Civilizations
  - Lost History
  - Archaeology
  - Science
  - History
  - Humanity
  - Space
  - Technology

## Main Goal

Membangun website editorial GrailDaily yang modern, cepat, responsif, mudah dikelola melalui CMS, dan siap digunakan sebagai website production.

---

# 2. PROJECT LOCATION

Local project:

D:\GrailDaily

Repository:

https://github.com/GrailDaily/graildaily-web

Current branch:

main

---

# 3. PROJECT STRUCTURE

GrailDaily/
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ apps/
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡   ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ web/
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡   ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡   ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ Astro website
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡   ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡   ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ cms/
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡       ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ Next.js CMS
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ GRAILDAILY-PROJECT.md

---

# 4. TECHNOLOGY STACK

## Web

- Astro
- Astro v7
- TypeScript
- Tailwind CSS
- MDX

## CMS

- Next.js
- TypeScript
- shadcn/ui
- Nova preset
- API routes
- Database
- Cloudinary

## Runtime

Node.js:
v24.18.0

npm:
v11.16.0

pnpm:
11.20.0

## Local development

Web:
http://localhost:4321

CMS:
http://localhost:3000

---

# 5. APPLICATION ARCHITECTURE

Intended architecture:

CMS
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“
Database
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“
Next.js API
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“
Astro Web
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“
Vercel
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“
GrailDaily public website

CMS is intended to become the primary source of article content.

The old Astro Markdown content collection should not remain the source of truth for articles.

---

# 6. CMS API

Current API:

/api/articles

Previously tested successfully.

Article response contains fields including:

- id
- title
- slug
- excerpt
- content
- featuredImage
- category
- author
- status
- createdAt
- updatedAt
- publishedAt

Featured images use Cloudinary URLs.

---

# 7. ASTRO CMS CLIENT

Current file:

apps/web/src/lib/cms.ts

Uses:

import.meta.env.CMS_API_URL

Development default:

http://localhost:3000

Helpers include:

- getCmsArticles()
- getCmsArticle()

Always inspect the current repository before modifying the implementation.

---

# 8. ASTRO CMS API ROUTE

Existing route:

apps/web/src/pages/api/cms/articles/[slug]/view.ts

Current route returns the slug.

Do not assume this is the final article implementation.

---

# 9. DESIGN DIRECTION

GrailDaily should be:

- Editorial
- Premium
- Clean
- Modern
- Minimal
- Easy to read
- Not overcrowded

Visual inspiration:

Wetv.vip style, but simpler and cleaner.

Do not redesign completed pages unnecessarily.

---

# 10. LIGHT PALETTE

#142A4A
#D6B066
#FFB84D
#F6F7F9
#E6E9EE
#FFFFFF

---

# 11. DARK PALETTE

#0F172A
#1E293B
#D6B066
#FFB84D
#2A3345
#334155
#0B0F19

---

# 12. TYPOGRAPHY

Fonts:

- Playfair Display
- Inter

Playfair Display:
Editorial/display headings.

Inter:
Body/UI/interface text.

---

# 13. HEADER

Required desktop order:

Logo
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Home
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Categories
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Popular
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Latest
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ About
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Search
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Theme Toggle
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Login
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Subscribe

Desktop header refactor has already been implemented.

Relevant components include:

- Header.astro
- DesktopNav
- HeaderActions
- SearchModal

Do not change desktop header order unless explicitly requested.

---

# 14. THEME

Two modes:

- Light
- Dark

Implemented:

- Theme toggle
- Theme persistence

Remaining:

- Final theme consistency audit

---

# 15. WEBSITE PAGES

## HOME

UI largely completed.

Remaining:

- Final CMS integration
- Production verification

## CATEGORIES

14 categories:

1. Archaeology
2. Economics
3. Entertainment
4. Geography
5. History
6. Humanity
7. Mysteries
8. Mythology
9. Nature
10. Politics
11. Religion
12. Science
13. Space
14. Technology

UI implemented.

Remaining:

- CMS integration
- Filtering
- Article listing
- Empty state
- Production test

## POPULAR

Routes:

/popular/all
/popular/month
/popular/week
/popular/today

UI and active filter highlighting implemented.

Remaining:

- CMS data
- Ranking logic
- Production test

## LATEST

UI implemented.

Reading time intentionally removed.

Remaining:

- CMS data
- Sorting
- Production test

## ABOUT

UI/responsive implementation completed.

Remaining:

- Final content
- SEO
- Production verification

---

# 16. HOMEPAGE COMPONENTS

## HERO

UI implemented.

Design:

- Large hero image
- Image visually dominant
- Approximately 16:10
- Blends with header
- Subtle blur effect where appropriate

Remaining:

- CMS final test

## EDITOR PICKS

UI implemented.

Remaining:

- CMS connection
- Production test

## TRENDING

UI implemented.

Design includes:

- ArticleCard
- Horizontal track
- Five visible cards
- Draggable horizontal interaction

Remaining:

- CMS connection
- Production test

## CATEGORIES

UI implemented.

Remaining:

- CMS data/test

## NEWSLETTER

UI implemented.

Remaining:

- Provider
- Form backend
- Validation
- Production test

## FOOTER

UI largely implemented.

Previous issues:

- Duplicate logos
- Missing icons
- Theme switching
- Icon consistency

Icons.astro was created.

Remaining:

- Final icon audit
- Final link audit
- Final responsive audit

---

# 17. ARTICLE PAGE

Completed design decisions:

- Remove "ON THIS PAGE"
- Move "SHARE THIS ARTICLE" above the main image beside the title
- Remove "STAY CURIOUS"

Remaining:

- Article by slug
- Article from CMS
- Featured image from CMS
- Author
- Category
- Date
- Content
- Related articles
- Share URL
- Social sharing
- 404
- Final typography audit
- Final spacing audit
- Final mobile audit

---

# 18. SEARCH

Search integrated with CMS API.

Search UI uses a modal.

Remaining:

- CMS article titles
- CMS descriptions
- CMS article content
- CMS category
- CMS tags
- Mobile test
- Desktop test
- Production test

Important:

Verify that published CMS articles are returned correctly by the CMS API before assuming search can find them.

---

# 19. LEGACY CONTENT COLLECTION

Old Astro article directory:

apps/web/src/content/posts/

This directory no longer exists after CMS migration.

Previous warning indicated remaining legacy references may exist.

Remaining:

- Evaluate old content collection
- Remove unnecessary dependencies
- Remove references to /src/content/posts
- Make CMS source of truth
- Remove stale imports/configuration

---

# 20. CMS ARTICLE MODEL

Current fields include:

- id
- title
- slug
- excerpt
- content
- featuredImage
- category
- author
- status
- createdAt
- updatedAt
- publishedAt

Remaining:

- Final create UI
- Edit
- Delete
- Draft
- Publish
- Unpublish
- Slug validation
- Duplicate slug prevention
- Required validation
- Preview

---

# 21. CMS IMAGE MANAGEMENT

Current:

- Featured image field
- Cloudinary URL

Remaining:

- CMS upload
- Image validation
- Optimization
- Production Cloudinary
- Cleanup
- Alt text
- Metadata

---

# 22. CMS API QUALITY

Remaining:

- Production API
- Authentication if required
- Authorization
- Validation
- Error handling
- Pagination if needed
- Filtering
- Sorting
- Draft protection
- Published-only public exposure

---

# 23. ASTRO BUILD

Previous error:

GetStaticPathsRequired

Dynamic routes need either:

- getStaticPaths()
- or appropriate SSR/prerender configuration

Previous warning:

apps/web/src/content/posts/

did not exist after CMS migration.

Remaining:

- Run pnpm build
- Fix Astro errors
- Fix TypeScript errors
- Resolve GetStaticPathsRequired
- Resolve dynamic article route
- Verify all pages generate
- Verify CMS API search
- Fix broken imports/assets
- Verify environment variables

---

# 24. WEB BUILD SCRIPT

apps/web/package.json currently uses approximately:

pnpm build

which runs:

astro check
astro build

Do not assume production readiness until this succeeds.

---

# 25. VERCEL

Vercel project observed:

grail-daily/graildaily-web-web

Known Ready deployment:

graildaily-web-kbfreuyis-grail-daily.vercel.app

Immediate diagnostic command previously planned:

vercel inspect graildaily-web-kbfreuyis-grail-daily.vercel.app

Important:

Do not deploy blindly before verifying the current production state.

Canceled deployment does not automatically mean the build failed.

---

# 26. DOMAIN

Target:

graildaily.com

Not finalized yet.

Remaining:

- Domain
- DNS
- Vercel domain
- HTTPS
- Canonical URL
- Redirects
- Production verification

---

# 27. SEO

Remaining:

- Title
- Meta description
- Canonical
- Open Graph
- Twitter/X cards
- Sitemap
- Robots
- Structured data
- Article schema
- Google Search Console
- Indexing verification

---

# 28. ANALYTICS

Remaining:

- Choose analytics
- Install
- Pageview tracking
- Article tracking
- Search tracking if needed
- Production verification

---

# 29. PERFORMANCE

Remaining:

- Image optimization
- Font optimization
- JS optimization
- CSS optimization
- CDN/cache
- Core Web Vitals
- Lighthouse
- Final performance audit

---

# 30. NEWSLETTER

UI:

[x]

Remaining:

- Provider
- Subscriber list
- Form backend
- Validation
- Success
- Error
- Confirmation
- Unsubscribe
- Production test

---

# 31. LOGIN / SUBSCRIBE

Not finalized.

Need to decide:

- Whether Login is required
- Whether Subscribe means newsletter
- Whether Subscribe means paid membership
- Whether both are needed

Do not implement paid membership until explicitly decided.

---

# 32. CMS PRODUCTION

Remaining:

- Deploy CMS
- Production CMS URL
- Production database
- Production environment variables
- Production Cloudinary
- Admin authentication
- Admin user
- Roles
- Protected routes
- Create article
- Edit article
- Draft
- Image
- Publish
- Unpublish
- Delete
- Website verification

---

# 33. SECURITY

Remaining:

- Secrets protected
- API keys protected
- Cloudinary secrets protected
- Auth secrets protected
- .env excluded from Git
- Admin authentication
- Authorization
- Protected APIs
- Input validation
- Slug validation
- Image validation
- Rate limiting if needed
- CORS
- Error handling
- Database backup
- Backup schedule
- Recovery plan
- Migration strategy

---

# 34. CONTENT

Remaining:

- Initial articles
- Featured articles
- Trending articles
- Latest articles
- Popular articles
- Category distribution
- Article quality
- Descriptions
- Authors
- Dates
- Images
- Alt text
- Slugs
- SEO metadata

---

# 35. RESPONSIVE QA

Desktop/mobile design has already received substantial work.

Do not redesign unless a real bug is found.

Remaining:

- Desktop final test
- Tablet final test
- Mobile final test
- Mobile navigation
- Login behavior
- Subscribe behavior
- Multiple screen sizes

---

# 36. BROWSER QA

Remaining:

- Chrome
- Edge
- Firefox
- Safari

---

# 37. FUNCTIONAL QA

Remaining:

- Navigation
- Homepage
- Categories
- Popular
- Latest
- About
- Article
- Search
- Theme
- Share
- Newsletter
- Mobile menu

---

# 38. ERROR HANDLING

Remaining:

- 404
- API unavailable
- CMS unavailable
- Article unavailable
- Image fallback
- Empty categories
- Empty search
- CMS fallback
- Logging

---

# 39. FINAL CONTENT / SEO AUDIT

Remaining:

- No placeholders
- No broken links
- No broken images
- No console errors
- Titles correct
- Descriptions correct
- Alt text correct
- Slugs correct
- Canonicals correct
- Metadata correct

---

# 40. MASTER CHECKLIST

Legend:

[x] Completed
[~] In progress / partially completed
[ ] Not completed

---

## PHASE 1 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â FOUNDATION

- [x] Project name / GrailDaily
- [x] Website topic/focus
- [x] GitHub repository
- [x] Astro foundation
- [x] Astro 7
- [x] Monorepo
- [x] apps/web
- [x] apps/cms
- [x] pnpm
- [x] Node environment
- [x] Local development
- [x] Git workflow

---

## PHASE 2 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â DESIGN SYSTEM

- [x] Branding
- [x] Logos
- [x] Favicon
- [x] Fonts
- [x] Light palette
- [x] Dark palette
- [x] Light mode
- [x] Dark mode
- [x] Theme toggle
- [x] Theme persistence
- [ ] Final theme consistency audit

---

## PHASE 3 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â HEADER / NAVIGATION

### Desktop

- [x] Header
- [x] Logo
- [x] Home
- [x] Categories
- [x] Popular
- [x] Latest
- [x] About
- [x] Search
- [x] Theme Toggle
- [x] Login
- [x] Subscribe
- [x] Correct navigation order
- [x] Header refactor
- [x] DesktopNav
- [x] HeaderActions
- [x] SearchModal

### Mobile

- [x] Mobile header
- [x] Mobile menu
- [ ] Final mobile navigation
- [ ] Check Login visibility
- [ ] Check Subscribe visibility
- [ ] Final mobile menu test
- [ ] Multiple screen-size test

---

## PHASE 4 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â HOMEPAGE

### Hero

- [x] Hero UI
- [x] CMS connection
- [ ] Final CMS test
- [ ] Production test

### Editor Picks

- [x] UI
- [x] CMS connection
- [ ] Production test

### Trending

- [x] UI
- [x] CMS connection
- [ ] Production test

### Categories

- [x] UI
- [x] CMS connection
- [ ] Production test

### Newsletter

- [x] UI
- [ ] Provider
- [ ] Form backend
- [ ] Validation
- [ ] Success state
- [ ] Error state
- [ ] Production test

### Footer

- [x] Footer UI
- [x] Theme support
- [x] Icons component
- [ ] Final icon audit
- [ ] Final link audit
- [ ] Final responsive audit

---

## PHASE 5 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â WEBSITE PAGES

### Home

- [x] UI
- [x] CMS integration
- [ ] Production test

### Categories

- [x] Categories page
- [x] 14 categories
- [x] Category navigation
- [x] Category sections
- [x] CMS integration
- [x] Filtering
- [x] Article listing
- [ ] Empty state
- [ ] Production test

### Popular

- [x] UI
- [x] Routes
- [x] Filters
- [x] Active filter highlighting
- [x] CMS data
- [ ] Ranking logic
- [ ] Production test

### Latest

- [x] UI
- [x] Reading time removed
- [x] CMS data
- [x] Sorting
- [ ] Production test

### About

- [x] UI
- [x] Responsive
- [ ] Final content
- [ ] SEO
- [ ] Production test

---

## PHASE 6 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ARTICLE PAGE

### Design

- [x] Remove ON THIS PAGE
- [x] Move SHARE THIS ARTICLE above main image
- [x] Remove STAY CURIOUS
- [ ] Final typography audit
- [ ] Final spacing audit
- [ ] Final mobile audit

### Functionality

- [x] Article by slug
- [x] CMS article
- [x] CMS featured image
- [x] Author
- [x] Category
- [x] Date
- [x] Content
- [x] Related articles
- [ ] Share URL
- [ ] Social sharing
- [ ] 404

---

## PHASE 7 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â SEARCH

- [x] Search via CMS API
- [x] Search UI
- [x] Search modal
- [x] CMS article titles
- [x] CMS descriptions
- [x] CMS article content
- [ ] CMS category
- [ ] CMS tags
- [x] Mobile test
- [x] Desktop test
- [ ] Production test

---

## PHASE 8 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â CONTENT MODEL

- [x] Existing schema reviewed
- [x] CMS article fields
- [x] Evaluate old content collection
- [x] Remove unnecessary dependencies
- [x] Remove /src/content/posts references
- [x] CMS becomes source of truth

---

## PHASE 9 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â CMS NEXT.JS

### Foundation

- [x] Next.js CMS
- [x] shadcn/ui
- [x] Nova preset
- [x] Local CMS
- [x] Database connection foundation

### Articles

- [x] Article model
- [x] Title
- [x] Slug
- [x] Excerpt
- [x] Content
- [x] Featured image
- [x] Category
- [x] Author
- [x] Status
- [x] Published date
- [x] Final create UI
- [x] Edit
- [x] Delete
- [x] Draft
- [x] Publish
- [ ] Unpublish
- [ ] Slug validation
- [x] Duplicate slug prevention
- [x] Required validation
- [x] Preview

### Images

- [x] Featured image field
- [x] Cloudinary URL
- [ ] CMS upload
- [ ] Validation
- [ ] Optimization
- [ ] Production Cloudinary
- [ ] Cleanup
- [ ] Alt text
- [ ] Metadata

---

## PHASE 10 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â CMS API

## 27. API

- [x] `/api/articles`
- [x] `/api/articles/[slug]`
- [x] `/api/articles/hero`
- [x] `/api/articles/editors-picks`
- [x] `/api/articles/trending`
- [x] `/api/articles/popular`
- [x] `/api/articles/[slug]/view`
- [x] `/api/settings`
- [x] `/api/upload`
- [x] `/api/internal/publish-scheduled`

### Public Article API

- [x] API berhasil diuji
- [x] JSON article response
- [x] Article fields tersedia
- [x] Featured image tersedia
- [x] Category tersedia
- [x] Author tersedia
- [x] Status tersedia
- [x] Published date tersedia
- [x] API error handling
- [x] API sorting
- [x] API hanya expose published content
- [x] Draft protection
- [x] Search query title/content
- [x] Popular ranking dan range filter
- [x] Trending ranking
- [x] Hero filtering
- [x] Editor's Picks filtering

### API yang masih perlu dikerjakan

- [ ] API production
- [ ] API authentication jika diperlukan
- [ ] API authorization untuk CMS/admin
- [ ] API validation yang lebih lengkap
- [ ] API filtering umum
- [ ] API pagination jika diperlukan
- [ ] Upload file type validation
- [ ] Upload file size validation
- [ ] Upload authentication/authorization
- [ ] Settings authentication/authorization
- [ ] Pastikan `CRON_SECRET` wajib tersedia di production
- [ ] Pastikan scheduled publishing hanya dapat dipanggil oleh cron yang terotorisasi

### Catatan Audit

- Public article API sengaja hanya mengembalikan artikel `Published`.
- Pagination belum diperlukan untuk skala saat ini dan dapat ditambahkan ketika jumlah artikel sudah membutuhkan optimasi.
- CMS dashboard/API admin belum memiliki authentication/authorization yang memadai dan wajib diselesaikan sebelum CMS production.
- `/api/upload` sudah melakukan optimasi WebP dan rollback Cloudinary jika penyimpanan database gagal, tetapi validasi file dan proteksi endpoint belum selesai.
- `/api/settings` sudah memiliki validasi field wajib, tetapi endpoint PUT belum diproteksi authentication/authorization.
- `/api/internal/publish-scheduled` menggunakan `CRON_SECRET` jika tersedia; production wajib memastikan secret tersebut dikonfigurasi.

## PHASE 11 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â CMS ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ ASTRO

- [x] CMS client
- [x] CMS helpers
- [x] CMS ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ API
- [x] API ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Astro tested
- [x] Homepage ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Editor Picks ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Trending ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Latest ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Popular ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Categories ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Article Detail ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Related Articles ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Search ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ CMS
- [x] Legacy cleanup

---

## PHASE 12 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ASTRO BUILD

- [x] pnpm build
- [x] Astro check
- [x] TypeScript errors resolved
- [x] GetStaticPathsRequired resolved
- [x] Dynamic article route resolved
- [x] All pages generate
- [x] Search build/integration verified (CMS API)
- [x] Pagefind removed; CMS API menjadi source search
- [x] Broken imports resolved
- [x] Broken assets resolved
- [x] Missing environment variables resolved
- [~] Production environment verified ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â local build PASS; production environment masih perlu diverifikasi

---

## PHASE 13 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â VERCEL

- [x] Vercel project
- [x] Deployment system
- [x] Vercel CLI
- [x] Verify latest Ready deployment
- [x] Confirm source code is latest
- [x] Confirm environment variables
- [x] Confirm CMS production connection
- [x] Verify articles
- [x] Verify images
- [x] Verify routes
- [x] Verify search
- [x] Verify theme
- [x] Verify mobile
- [x] Final production deployment

---

## PHASE 14 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â DOMAIN

- [ ] Domain configured
- [ ] DNS
- [ ] Vercel domain
- [ ] HTTPS
- [ ] Canonical URL
- [ ] Redirects
- [ ] Production verification

---

## PHASE 15 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â SEO

- [x] Titles
- [x] Meta descriptions
- [x] Canonicals
- [x] Open Graph
- [x] Twitter/X cards
- [x] Sitemap
- [x] Robots
- [x] Structured data
- [x] Article schema
- [x] Article canonical URL absolute
- [ ] Google Search Console
- [ ] Indexing verification

---

## PHASE 16 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ANALYTICS

- [ ] Choose analytics
- [ ] Install
- [ ] Pageview tracking
- [ ] Article tracking
- [ ] Search tracking if needed
- [ ] Production verification

---

## PHASE 17 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â PERFORMANCE

- [ ] Image optimization
- [ ] Font optimization
- [ ] JS optimization
- [ ] CSS optimization
- [ ] CDN
- [ ] Cache
- [ ] Core Web Vitals
- [ ] Lighthouse
- [ ] Final performance audit

---

## PHASE 18 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â NEWSLETTER

- [x] UI
- [ ] Provider
- [ ] Subscriber list
- [ ] Form backend
- [ ] Validation
- [ ] Success
- [ ] Error
- [ ] Confirmation
- [ ] Unsubscribe
- [ ] Production test

---

## PHASE 19 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â LOGIN / SUBSCRIBE

- [ ] Decide whether Login is required
- [ ] Decide Subscribe meaning
- [ ] Newsletter vs paid membership
- [ ] Authentication if needed
- [ ] User system if needed
- [ ] Payments if needed
- [ ] Access control if needed
- [ ] Security

---

## PHASE 20 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â CMS PRODUCTION

- [ ] Deploy CMS
- [ ] Production CMS URL
- [ ] Production database
- [ ] Production environment variables
- [ ] Cloudinary production
- [ ] Admin authentication
- [ ] Admin user
- [ ] Roles
- [ ] Protected routes
- [ ] Create article
- [ ] Edit article
- [ ] Draft
- [ ] Image
- [ ] Publish
- [ ] Unpublish
- [ ] Delete
- [ ] Website verification

---

## PHASE 21 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â SECURITY

- [ ] Secrets protected
- [ ] API keys protected
- [ ] Cloudinary secrets protected
- [ ] Auth secrets protected
- [ ] .env excluded from Git
- [ ] Admin authentication
- [x] Authorization
- [ ] Protected APIs
- [ ] Input validation
- [ ] Slug validation
- [ ] Image validation
- [ ] Rate limiting if needed
- [ ] CORS
- [ ] Error handling
- [ ] Database backup
- [ ] Backup schedule
- [ ] Recovery plan
- [ ] Migration strategy

---

## PHASE 22 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â CONTENT

- [ ] Initial articles
- [ ] Featured articles
- [ ] Trending articles
- [ ] Latest articles
- [ ] Popular articles
- [x] Category distribution
- [ ] Article quality
- [ ] Descriptions
- [x] Authors
- [x] Dates
- [ ] Images
- [ ] Alt text
- [ ] Slugs
- [ ] SEO metadata

---

## PHASE 23 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â RESPONSIVE QA

- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] Mobile navigation
- [ ] Login behavior
- [ ] Subscribe behavior
- [ ] Multiple screen sizes
- [ ] Homepage
- [ ] Categories
- [ ] Popular
- [ ] Latest
- [ ] About
- [ ] Article
- [ ] Search

---

## PHASE 24 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â BROWSER QA

- [ ] Chrome
- [ ] Edge
- [ ] Firefox
- [ ] Safari

---

## PHASE 25 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â FUNCTIONAL QA

- [ ] Navigation
- [ ] Homepage
- [ ] Categories
- [ ] Popular
- [ ] Latest
- [ ] About
- [ ] Article
- [ ] Search
- [ ] Theme
- [ ] Share
- [ ] Newsletter
- [ ] Mobile menu

---

## PHASE 26 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ERROR HANDLING

- [ ] 404
- [ ] API unavailable
- [ ] CMS unavailable
- [ ] Article unavailable
- [ ] Image fallback
- [ ] Empty categories
- [ ] Empty search
- [ ] CMS fallback
- [ ] Logging

---

## PHASE 27 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â FINAL SEO / CONTENT AUDIT

- [ ] No placeholders
- [ ] No broken links
- [ ] No broken images
- [ ] No console errors
- [ ] Titles correct
- [ ] Descriptions correct
- [ ] Alt text correct
- [ ] Slugs correct
- [x] Canonicals correct
- [ ] Metadata correct

---

## PHASE 28 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â FINAL PRODUCTION CHECK

- [ ] Infrastructure
- [ ] Database
- [ ] CMS
- [ ] API
- [ ] Astro
- [ ] Vercel
- [ ] Domain
- [ ] CMS ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ DB
- [ ] DB ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ API
- [ ] API ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Astro
- [ ] Astro ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Vercel
- [ ] Vercel ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ GrailDaily
- [ ] End-to-end article publishing test

---

## PHASE 29 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â LAUNCH

### Pre-launch

- [ ] Final backup
- [ ] Final build
- [ ] Final deployment
- [ ] Domain verification
- [ ] SEO verification
- [ ] Analytics verification
- [ ] Mobile verification
- [ ] Desktop verification
- [ ] Browser verification
- [ ] Security verification
- [ ] Performance verification

### Launch

- [ ] Website public
- [ ] CMS operational
- [ ] First articles published
- [ ] Search operational
- [ ] Analytics operational
- [ ] Monitoring operational

---

## PHASE 30 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â POST-LAUNCH

- [ ] Monitor uptime
- [ ] Monitor errors
- [ ] Database backups
- [ ] CMS maintenance
- [ ] Dependency updates
- [x] Content publishing workflow
- [ ] SEO monitoring
- [ ] Analytics monitoring
- [ ] Performance monitoring
- [ ] Security updates

---

# 41. CURRENT PROJECT STATE

Current phase:

Production Verification / Stabilization

Verified state:

- CMS API is working.
- Astro CMS client is working.
- Local Astro build passes.
- main and origin/main are at commit 37665d1.
- Latest known Vercel deployment is Ready and Production.
- Production /about on the latest deployment returns HTTP 200.
- Production /popular/all on the latest deployment returns HTTP 200 and contains the expected Popular content.
- Production homepage `/` on the latest deployment returns HTTP 200 and contains GrailDaily content.
- Production /categories on the latest deployment returns HTTP 200 and contains Categories content.
- Search uses the CMS API rather than Pagefind.
- Basic SEO metadata, Open Graph, Twitter/X cards, sitemap, robots.txt, structured data, and article canonical URL have been verified.

The project is NOT ready for final launch.

Remaining major areas:

- CMS production hardening
- Production environment verification
- Domain graildaily.com
- Google Search Console and indexing
- Analytics
- Performance
- Security hardening
- Final QA
- Launch

---

# 42. CURRENT PRIORITY

Priority order:

1. Production website verification
2. CMS production verification
3. Production environment variables
4. Domain graildaily.com
5. Google Search Console and indexing
6. Analytics
7. Performance
8. Security
9. Final QA
10. Launch

Do not jump ahead without stabilizing the current phase.

---

# 43. LAST KNOWN VERCEL STATE

Known latest Ready deployment:

graildaily-web-kbfreuyis-grail-daily.vercel.app

Production aliases:

- graildaily-web-web.vercel.app
- graildaily-web-web-grail-daily.vercel.app
- graildaily-web-web-git-main-grail-daily.vercel.app

Deployment:

- Status: Ready
- Target: Production
- Deployment ID: belum diverifikasi dari metadata deployment terbaru.
- Framework: Astro
- Build command: pnpm run build
- Node.js: 24.x

Git:

- Branch: main
- Latest local/origin commit: 37665d1
- Commit message: `fix: sync project documentation and article canonical`

Production verification already completed:

- /about ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ HTTP 200
- /popular/all ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ HTTP 200

The deployment was created approximately 45 seconds after commit 9a0ff5d, strongly correlating it with the latest commit. Direct Git commit metadata was not exposed by the CLI inspection output, so this correlation should not be treated as a separate Vercel metadata guarantee.

---

# 44. IMMEDIATE NEXT STEPS

1. Keep the latest Vercel deployment as the current production reference.
2. Complete production verification of the remaining critical website routes.
3. Verify CMS production environment and API connectivity from the website.
4. Verify production environment variables.
5. Verify CMS create ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ publish ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ website flow end-to-end.
6. Resolve any remaining legacy content/dependency references.
7. Verify final SEO configuration on production.
8. Set up Google Search Console and indexing.
9. Configure graildaily.com.
10. Set up analytics.
11. Run performance and Core Web Vitals checks.
12. Complete security hardening.
13. Complete final desktop/mobile/browser QA.
14. Perform final production smoke test.
15. Launch GrailDaily.

---

# 45. DEVELOPMENT RULES

## Rule 1 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â Do not redesign completed UI

If something is [x], do not redesign it unless:

- There is a real bug
- It conflicts with architecture
- User explicitly requests a change

## Rule 2 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â One step at a time

User prefers practical PowerShell instructions.

When troubleshooting:

1. Give the next command.
2. Wait for output.
3. Analyze output.
4. Give the next command.

Do not send large sequences of unrelated commands.

## Rule 3 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â Never guess repository state

Verify:

- Files
- Paths
- Current code
- Package scripts
- Environment variables
- API responses
- Build output

before modifying anything.

## Rule 4 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â CMS is the article source of truth

Do not reintroduce Markdown article content unless explicitly required.

## Rule 5 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â Protect existing design

Desktop and mobile have already received substantial design work.

Do not unnecessarily alter:

- Header
- Typography
- Spacing
- Colors
- Responsive breakpoints
- Page structure

## Rule 6 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â Production requires verification

Deployment success does not automatically mean the website works.

Verify:

CMS
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ DB
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ API
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Astro
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Build
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Vercel
ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ Browser

## Rule 7 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â Update this document

When important project state changes, update:

- Master Checklist
- Current Project State
- Current Issue
- Last Command
- Last Result
- Files Involved
- Next Step

---

# 46. CHAT HANDOFF PROCEDURE

When this chat becomes too long:

1. Update this document.
2. Update Master Checklist.
3. Update Current Project State.
4. Update Current Issue.
5. Update Last Command / Result.
6. Update Next Step.
7. Copy the entire GRAILDAILY-PROJECT.md file.
8. Open a new chat.
9. Paste the document.
10. Tell the new chat:

"Lanjutkan proyek GrailDaily berdasarkan dokumen induk ini. Jangan mengulang pekerjaan yang sudah [x]. Mulai dari CURRENT PROJECT STATE dan ikuti MASTER CHECKLIST."

The document is the primary project context.

---

# 47. CURRENT SESSION

Date:

2026-09-06

Working directory:

D:\GrailDaily

Current task:

Production verification / project documentation synchronization

Last successful command:

git diff --check -- GRAILDAILY-PROJECT.md

Result:

No output. GRAILDAILY-PROJECT.md passed git diff --check.

Current verified state:

- Encoding corruption in the project document has been fixed.
- All unintended ? characters replacing ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ have been fixed.
- Project structure tree characters have been restored.
- GRAILDAILY-PROJECT.md is clean according to git diff --check.
- Latest known Vercel deployment remains Ready / Production.
- Production /about on the latest deployment returns HTTP 200 (deployment: graildaily-web-kbfreuyis-grail-daily.vercel.app).
- Production /popular/all on the latest deployment returns HTTP 200 and contains the expected Popular content.

---

# 48. NEXT ACTION

Continue production verification of the remaining critical website routes.

Do not move to domain, analytics, performance, or launch until the current production verification phase is stable.

---

# END OF MASTER PROJECT DOCUMENT
