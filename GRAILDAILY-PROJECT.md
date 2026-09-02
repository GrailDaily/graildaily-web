# GRAILDAILY — MASTER PROJECT DOCUMENT

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

production-refactor-v1

---

# 3. PROJECT STRUCTURE

GrailDaily/
├── apps/
│   ├── web/
│   │   └── Astro website
│   │
│   └── cms/
│       └── Next.js CMS
│
└── GRAILDAILY-PROJECT.md

---

# 4. TECHNOLOGY STACK

## Web

- Astro
- Astro v7
- TypeScript
- Tailwind CSS
- MDX
- Pagefind

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
↓
Database
↓
Next.js API
↓
Astro Web
↓
Vercel
↓
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
→ Home
→ Categories
→ Popular
→ Latest
→ About
→ Search
→ Theme Toggle
→ Login
→ Subscribe

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

Pagefind integrated.

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
- Pagefind rebuild after CMS content changes

Important:

Verify that CMS article content actually exists in the generated Astro output before assuming Pagefind can index it.

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
- Verify Pagefind
- Fix broken imports/assets
- Verify environment variables

---

# 24. WEB BUILD SCRIPT

apps/web/package.json currently uses approximately:

pnpm build

which runs:

astro check
→ astro build
→ pagefind --site dist

Do not assume production readiness until this succeeds.

---

# 25. VERCEL

Vercel project observed:

grail-daily/graildaily-web-web

Known Ready deployment:

graildaily-web-45ykb19sa-grail-daily.vercel.app

Immediate diagnostic command previously planned:

vercel inspect graildaily-web-45ykb19sa-grail-daily.vercel.app

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
- Pagefind optimization
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

## PHASE 1 — FOUNDATION

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

## PHASE 2 — DESIGN SYSTEM

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

## PHASE 3 — HEADER / NAVIGATION

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

## PHASE 4 — HOMEPAGE

### Hero

- [x] Hero UI
- [ ] CMS connection
- [ ] Final CMS test
- [ ] Production test

### Editor Picks

- [x] UI
- [ ] CMS connection
- [ ] Production test

### Trending

- [x] UI
- [ ] CMS connection
- [ ] Production test

### Categories

- [x] UI
- [ ] CMS connection
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

## PHASE 5 — WEBSITE PAGES

### Home

- [x] UI
- [ ] CMS integration
- [ ] Production test

### Categories

- [x] Categories page
- [x] 14 categories
- [x] Category navigation
- [x] Category sections
- [ ] CMS integration
- [ ] Filtering
- [ ] Article listing
- [ ] Empty state
- [ ] Production test

### Popular

- [x] UI
- [x] Routes
- [x] Filters
- [x] Active filter highlighting
- [ ] CMS data
- [ ] Ranking logic
- [ ] Production test

### Latest

- [x] UI
- [x] Reading time removed
- [ ] CMS data
- [ ] Sorting
- [ ] Production test

### About

- [x] UI
- [x] Responsive
- [ ] Final content
- [ ] SEO
- [ ] Production test

---

## PHASE 6 — ARTICLE PAGE

### Design

- [x] Remove ON THIS PAGE
- [x] Move SHARE THIS ARTICLE above main image
- [x] Remove STAY CURIOUS
- [ ] Final typography audit
- [ ] Final spacing audit
- [ ] Final mobile audit

### Functionality

- [ ] Article by slug
- [ ] CMS article
- [ ] CMS featured image
- [ ] Author
- [ ] Category
- [ ] Date
- [ ] Content
- [ ] Related articles
- [ ] Share URL
- [ ] Social sharing
- [ ] 404

---

## PHASE 7 — SEARCH

- [x] Pagefind
- [x] Search UI
- [x] Search modal
- [ ] CMS article titles
- [ ] CMS descriptions
- [ ] CMS article content
- [ ] CMS category
- [ ] CMS tags
- [ ] Mobile test
- [ ] Desktop test
- [ ] Production test
- [ ] Pagefind rebuild after CMS content

---

## PHASE 8 — CONTENT MODEL

- [x] Existing schema reviewed
- [x] CMS article fields
- [ ] Evaluate old content collection
- [ ] Remove unnecessary dependencies
- [ ] Remove /src/content/posts references
- [ ] CMS becomes source of truth

---

## PHASE 9 — CMS NEXT.JS

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
- [ ] Final create UI
- [ ] Edit
- [ ] Delete
- [ ] Draft
- [ ] Publish
- [ ] Unpublish
- [ ] Slug validation
- [ ] Duplicate slug prevention
- [ ] Required validation
- [ ] Preview

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

## PHASE 10 — CMS API

- [x] /api/articles
- [x] JSON response
- [x] Article fields
- [x] Image
- [x] Category
- [x] Author
- [x] Status
- [x] Published date
- [ ] Production API
- [ ] Authentication
- [ ] Authorization
- [ ] Validation
- [ ] Error handling
- [ ] Pagination if needed
- [ ] Filtering
- [ ] Sorting
- [ ] Draft protection
- [ ] Published-only public exposure

---

## PHASE 11 — CMS ↔ ASTRO

- [x] CMS client
- [x] CMS helpers
- [x] CMS → API
- [x] API → Astro tested
- [x] Homepage → CMS
- [x] Editor Picks → CMS
- [x] Trending → CMS
- [x] Latest → CMS
- [x] Popular → CMS
- [x] Categories → CMS
- [x] Article Detail → CMS
- [ ] Related Articles → CMS
- [x] Search → CMS
- [x] Legacy cleanup

---

## PHASE 12 — ASTRO BUILD

- [x] pnpm build
- [x] Astro check
- [x] TypeScript errors resolved
- [x] GetStaticPathsRequired resolved
- [x] Dynamic article route resolved
- [x] All pages generate
- [x] Pagefind build
- [x] Broken imports resolved
- [x] Broken assets resolved
- [x] Missing environment variables resolved
- [ ] Production environment verified

---

## PHASE 13 — VERCEL

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
- [ ] Verify mobile
- [x] Final production deployment

---

## PHASE 14 — DOMAIN

- [ ] Domain configured
- [ ] DNS
- [ ] Vercel domain
- [ ] HTTPS
- [ ] Canonical URL
- [ ] Redirects
- [ ] Production verification

---

## PHASE 15 — SEO

- [ ] Titles
- [ ] Meta descriptions
- [ ] Canonicals
- [ ] Open Graph
- [ ] Twitter/X cards
- [ ] Sitemap
- [ ] Robots
- [ ] Structured data
- [ ] Article schema
- [ ] Google Search Console
- [ ] Indexing verification

---

## PHASE 16 — ANALYTICS

- [ ] Choose analytics
- [ ] Install
- [ ] Pageview tracking
- [ ] Article tracking
- [ ] Search tracking if needed
- [ ] Production verification

---

## PHASE 17 — PERFORMANCE

- [ ] Image optimization
- [ ] Font optimization
- [ ] JS optimization
- [ ] CSS optimization
- [ ] CDN
- [ ] Cache
- [ ] Pagefind optimization
- [ ] Core Web Vitals
- [ ] Lighthouse
- [ ] Final performance audit

---

## PHASE 18 — NEWSLETTER

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

## PHASE 19 — LOGIN / SUBSCRIBE

- [ ] Decide whether Login is required
- [ ] Decide Subscribe meaning
- [ ] Newsletter vs paid membership
- [ ] Authentication if needed
- [ ] User system if needed
- [ ] Payments if needed
- [ ] Access control if needed
- [ ] Security

---

## PHASE 20 — CMS PRODUCTION

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

## PHASE 21 — SECURITY

- [ ] Secrets protected
- [ ] API keys protected
- [ ] Cloudinary secrets protected
- [ ] Auth secrets protected
- [ ] .env excluded from Git
- [ ] Admin authentication
- [ ] Authorization
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

## PHASE 22 — CONTENT

- [ ] Initial articles
- [ ] Featured articles
- [ ] Trending articles
- [ ] Latest articles
- [ ] Popular articles
- [ ] Category distribution
- [ ] Article quality
- [ ] Descriptions
- [ ] Authors
- [ ] Dates
- [ ] Images
- [ ] Alt text
- [ ] Slugs
- [ ] SEO metadata

---

## PHASE 23 — RESPONSIVE QA

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

## PHASE 24 — BROWSER QA

- [ ] Chrome
- [ ] Edge
- [ ] Firefox
- [ ] Safari

---

## PHASE 25 — FUNCTIONAL QA

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

## PHASE 26 — ERROR HANDLING

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

## PHASE 27 — FINAL SEO / CONTENT AUDIT

- [ ] No placeholders
- [ ] No broken links
- [ ] No broken images
- [ ] No console errors
- [ ] Titles correct
- [ ] Descriptions correct
- [ ] Alt text correct
- [ ] Slugs correct
- [ ] Canonicals correct
- [ ] Metadata correct

---

## PHASE 28 — FINAL PRODUCTION CHECK

- [ ] Infrastructure
- [ ] Database
- [ ] CMS
- [ ] API
- [ ] Astro
- [ ] Vercel
- [ ] Domain
- [ ] CMS → DB
- [ ] DB → API
- [ ] API → Astro
- [ ] Astro → Vercel
- [ ] Vercel → GrailDaily
- [ ] End-to-end article publishing test

---

## PHASE 29 — LAUNCH

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

## PHASE 30 — POST-LAUNCH

- [ ] Monitor uptime
- [ ] Monitor errors
- [ ] Database backups
- [ ] CMS maintenance
- [ ] Dependency updates
- [ ] Content publishing workflow
- [ ] SEO monitoring
- [ ] Analytics monitoring
- [ ] Performance monitoring
- [ ] Security updates

---

# 41. CURRENT PROJECT STATE

Current phase:

CMS → API → Astro → Vercel → Website Integration / Production Verification

The project is NOT ready for final launch.

---

# 42. CURRENT PRIORITY

Priority order:

1. CMS
2. API
3. Astro
4. Local build
5. Vercel
6. Production website verification
7. CMS production
8. Domain
9. SEO
10. Analytics
11. Performance
12. Security
13. Final QA
14. Launch

Do not jump ahead without stabilizing the current phase.

---

# 43. LAST KNOWN VERCEL STATE

Known Ready deployment:

graildaily-web-45ykb19sa-grail-daily.vercel.app

Diagnostic command:

vercel inspect graildaily-web-45ykb19sa-grail-daily.vercel.app

Need to verify:

- Source commit
- Build
- Deployment configuration
- Environment variables
- Production behavior

---

# 44. IMMEDIATE NEXT STEPS

1. Verify latest Ready Vercel deployment.
2. Confirm source code is the latest CMS-integrated version.
3. Run local:

pnpm build

4. Fix build errors.
5. Fix legacy content collection references.
6. Confirm homepage uses CMS.
7. Confirm Latest uses CMS.
8. Confirm Popular uses CMS.
9. Confirm Categories uses CMS.
10. Confirm Article Detail uses CMS.
11. Confirm Search works with CMS articles.
12. Deploy final version to Vercel.
13. Test production end-to-end.
14. Deploy CMS production.
15. Connect CMS production to website production.
16. Configure graildaily.com.
17. SEO.
18. Analytics.
19. Performance.
20. Security.
21. Final QA.
22. Launch.

---

# 45. DEVELOPMENT RULES

## Rule 1 — Do not redesign completed UI

If something is [x], do not redesign it unless:

- There is a real bug
- It conflicts with architecture
- User explicitly requests a change

## Rule 2 — One step at a time

User prefers practical PowerShell instructions.

When troubleshooting:

1. Give the next command.
2. Wait for output.
3. Analyze output.
4. Give the next command.

Do not send large sequences of unrelated commands.

## Rule 3 — Never guess repository state

Verify:

- Files
- Paths
- Current code
- Package scripts
- Environment variables
- API responses
- Build output

before modifying anything.

## Rule 4 — CMS is the article source of truth

Do not reintroduce Markdown article content unless explicitly required.

## Rule 5 — Protect existing design

Desktop and mobile have already received substantial design work.

Do not unnecessarily alter:

- Header
- Typography
- Spacing
- Colors
- Responsive breakpoints
- Page structure

## Rule 6 — Production requires verification

Deployment success does not automatically mean the website works.

Verify:

CMS
→ DB
→ API
→ Astro
→ Build
→ Vercel
→ Browser

## Rule 7 — Update this document

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

2026-09-02

Working directory:

D:\GrailDaily

Current task:

Creating the master project document.

Last successful command:

New-Item -ItemType File -Path ".\GRAILDAILY-PROJECT.md" -Force

Result:

D:\GrailDaily\GRAILDAILY-PROJECT.md

---

# 48. NEXT ACTION

After writing this document, verify it using:

Get-Content ".\GRAILDAILY-PROJECT.md" -TotalCount 40

Do not run build or deploy yet.

---

# END OF MASTER PROJECT DOCUMENT
