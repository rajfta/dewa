# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based corporate website for DEWA Zrt., a Hungarian industrial painting equipment company. The site features product catalogs, references/galleries, blog posts, and contact forms. Content is managed through TinaCMS, stored as Markdown files in the `cms/` directory.

## Essential Commands

### Development
```bash
pnpm dev              # Start Next.js dev server with TinaCMS
pnpm build            # Build TinaCMS admin + Next.js production build
pnpm start            # Build and start production server
pnpm export           # Export static site
pnpm serve            # Serve exported static files
pnpm check            # Run Biome linter and formatter checks
pnpm fix              # Auto-fix linting and formatting issues
```

### Important Notes
- Always run `pnpm build` to verify changes compile successfully
- TinaCMS builds admin interface in `public/admin/` before Next.js build
- Development server runs TinaCMS alongside Next.js on default ports
- This project uses **pnpm** (not yarn or npm) for package management

## Architecture

### Content Management System

**TinaCMS Integration:**
- Configuration: `tina/config.ts` defines all content collections and schemas
- Content stored as Markdown files in `cms/` directory structure:
  - `cms/posts/` - Blog articles
  - `cms/references/` - Project references (uses templates: `referencia` and `reference_gallery`)
  - `cms/termekek/[category]/` - Product catalogs for 4 divisions
  - `cms/pages/` - Homepage content
  - `cms/kapcsolat/` - Contact page employees

**Content Parser (`util/parser.ts`):**
- `getAllContents(type, fields)` - Fetch all content of a type
- `getContentBySlug(type, slug, fields)` - Fetch single content item
- `getContentSlugs(type)` - List all slugs for a type
- Uses `gray-matter` to parse Markdown frontmatter
- `ContentType` enum maps to CMS directory structure

### Page Architecture

**Static Generation Strategy:**
- All pages use `getStaticProps` for build-time data fetching
- Dynamic routes use `getStaticPaths` with `fallback: false`
- Content fetched via parser utilities, not TinaCMS runtime API

**Key Routes:**
- `/` - Homepage (data from `cms/pages/`)
- `/cikkek` - Articles listing
- `/cikkek/[slug]` - Article detail pages
- `/referenciak` - References listing (separates hall of fame vs galleries by `_template` field)
- `/referenciak/[slug]` - Reference detail with markdown body or image gallery
- `/termekek/[slug]` - Product catalog pages (4 divisions: fenyezofulkek, feluletkezeles, tuzelestechnika, szorastechnika)
- `/kapcsolat` - Contact page with employee list

### State Management

**Zustand Store (`store/`):**
- `initStore()` creates store instances
- `useStore(selector)` hook for consuming state
- Currently manages `editableSite` boolean flag
- Uses localStorage persistence via `loadState`/`saveState` utilities
- Store provider wraps entire app in `_app.tsx`

**Context Providers:**
- `ContactContext` - Modal state for contact form (opened from navbar)
- `MenuContext` - Mobile menu drawer state
- Both use Chakra UI's `useDisclosure` hook

### Styling

**CSS Framework Stack:**
- Chakra UI v2.8.2 (UI components and design system)
- TailwindCSS v3.4.0 (utility classes, configured in `tailwind.config.js`)
- Framer Motion v11 (animations, especially hover effects)
- Custom theme in `components/theme/`

**Important Styling Notes:**
- TailwindCSS v3 (NOT v4) - PostCSS config uses `tailwindcss` plugin directly
- Color palette: primary (blue), secondary (red), tertiary (yellow), grey scale
- Responsive breakpoints follow Chakra UI defaults
- Custom wrapper class for max-width containers

### Components Structure

**Navigation:**
- `Nav/Navbar.tsx` - Top navigation with logo, menu, and contact modal
- `Nav/Navlist.tsx` - Desktop/mobile menu items, includes product dropdown
- `Nav/Contact.tsx` - Contact button trigger

**Content Display:**
- `Article.tsx` - Blog post card with hover animation
- `Reference.tsx` - Reference card for "hall of fame" items
- `Gallery.tsx` - Gallery card for reference galleries
- `Product.tsx` - Product card for catalog items
- `PageBody.tsx` - Renders markdown content with custom components (uses react-markdown)
- `PageHeader.tsx` - Reusable page header component

**Layout:**
- `Footer.tsx` - Site footer with company info and links
- `Carousel.tsx` - Image carousel wrapper (react-responsive-carousel)
- `Perspective.tsx` - 3D tilt effect wrapper component

### TypeScript Types

**Core Types (`types/index.ts`):**
- `ContentType` - Union type for all CMS content categories
- `PostType` - Blog posts and references (includes `_template` discriminator)
- `ProductType` - Product catalog items (nev, alkategoria, divizio, etc.)
- `ContactType` - Employee contact information
- `HomePageType` - Homepage content fields (hero, about, services sections)

### API Routes

**Contact Form (`pages/api/contact.ts`):**
- Receives form submissions from contact modal
- Uses Nodemailer to send emails
- Requires environment variables for email configuration

## Development Guidelines

### Next.js Link Components
- Modern Next.js (v13+): `<Link>` renders anchor tags automatically
- ❌ Never wrap `<a>` inside `<Link>`: `<Link><a>...</a></Link>`
- ✅ Correct usage: `<Link href="/path">Content</Link>`
- For styling: add className directly to `<Link>` component

### Content Type Mapping
When working with content, understand the type-to-directory mapping:
- `posts` → `cms/posts/`
- `references` → `cms/references/` (check `_template` field)
- `feluletkezeles` → `cms/termekek/feluletkezeles/`
- `fenyezofulkek` → `cms/termekek/fenyezofulkek/`
- `tuzelestechnika` → `cms/termekek/tuzelestechnika/`
- `szorastechnika` → `cms/termekek/szorastechnika/`
- `fooldal` → `cms/pages/`
- `kapcsolat` → `cms/kapcsolat/`

### Package Version Constraints
- **Chakra UI**: Must stay on v2.x (v3 removed critical form components)
- **TailwindCSS**: Must stay on v3.x (v4 has different PostCSS plugin structure)
- **React**: v19.x (some third-party components show peer dependency warnings but work)
- **Next.js**: v15.x

### Common Patterns
- Content fetching: Use `getAllContents()` or `getContentBySlug()` from `util/parser.ts`
- Images: Use Next.js `<Image>` component with `layout="fill"` and `objectFit`
- Animations: Framer Motion with `whileHover`, `onHoverStart/End` for cards
- State: Zustand for global state, Context for UI state (modals, drawers)
- Styling: Mix of Chakra props and Tailwind classes (avoid conflicts)

### TinaCMS Schema
- Collection schemas defined in `tina/config.ts`
- Field templates imported from `tina/templates/`
- References collection uses templates for different content types
- All collections use Markdown format with rich-text body field

## Environment Variables
Required for development (see `next.config.js`):
- `GITHUB_CLIENT_ID` - For TinaCMS GitHub authentication
- `REPO_FULL_NAME` - Repository identifier
- `BASE_BRANCH` - Git branch for TinaCMS
- `TINACMS_PUBLIC_CLIENT_ID` - TinaCMS client ID
- `TINACMS_TOKEN` - TinaCMS authentication token
- Email configuration for Nodemailer (API route)
