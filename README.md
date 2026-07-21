# Trabowl Tattoo Haus — Project Architecture Blueprint

## 1. Project Overview & Tech Stack

Trabowl Tattoo Haus is a luxury tattoo studio web application built for a Nairobi-based studio. It serves as a public-facing brand site, portfolio gallery, booking interface, and an authenticated admin workspace for managing portfolio content.

**What the app does:**
- Displays a brand identity hero with auto-rotating imagery
- Showcases a masonry portfolio grid with lightbox viewing
- Provides a multi-step booking wizard (concept, reference upload, calendar, contact) that generates WhatsApp deep links
- Offers a services catalog with pricing cards
- Includes FAQ, testimonials, and aftercare content sections
- Exposes a protected admin dashboard for uploading, viewing, and deleting portfolio posts via Supabase

**Frameworks & Libraries:**
- **Framework:** Next.js 15 (App Router) with React 19 and TypeScript
- **Styling:** Tailwind CSS 3.4 with a custom design token system and CSS variables for theming
- **Animation:** Framer Motion 12 (page transitions, lightboxes, accordions, carousel scrub) and GSAP 3.12 (horizontal scroll-triggered featured carousel)
- **Icons:** Lucide React
- **Theme Management:** next-themes (class-based dark/light mode with SSR-safe mounting)
- **Database / Storage:** Supabase (PostgreSQL + Storage) via `@supabase/supabase-js`
- **Analytics:** Vercel Analytics
- **Utility:** clsx + tailwind-merge (class name merging)
- **Image Handling:** Next.js Image component with remote patterns configured for Supabase CDN and Unsplash

---

## 2. Directory Structure

```
Trabowl Tattoo Haus/
├── .env.example                     # Environment variable template (Supabase keys)
├── .env.local                       # Local secrets (gitignored)
├── middleware.ts                    # Next.js middleware for admin route protection
├── next.config.js                   # Next.js config (image domains, redirects)
├── tailwind.config.ts               # Tailwind theme extension (colors, fonts, shadows)
├── tsconfig.json                    # TypeScript config with @ path alias
├── package.json                     # Dependencies and scripts
├── postcss.config.js                # PostCSS config for Tailwind
│
├── app/                             # Next.js App Router (pages & API routes)
│   ├── layout.tsx                   # Root layout — ThemeProvider + PageShell
│   ├── providers.tsx                # Client-side theme provider (next-themes)
│   ├── globals.css                  # Global styles, CSS variables, utility classes
│   ├── page.tsx                     # Homepage (Hero + brand section + testimonials)
│   ├── portfolio/
│   │   ├── page.tsx                 # Server component — fetches posts from Supabase
│   │   └── portfolio-client.tsx     # Client component — masonry grid + lightbox
│   ├── booking/
│   │   └── page.tsx                 # Booking wizard with WhatsApp deep link
│   ├── book/
│   │   └── page.tsx                 # Enhanced booking form with inline calendar
│   ├── services/
│   │   └── page.tsx                 # Services & pricing page
│   ├── faq/
│   │   └── page.tsx                 # FAQ accordion page
│   ├── admin/
│   │   ├── page.tsx                 # Admin dashboard hub
│   │   ├── login/
│   │   │   └── page.tsx             # Admin password login form
│   │   ├── portfolio/
│   │   │   ├── page.tsx             # Server component — fetches all posts
│   │   │   └── admin-client.tsx     # Client component — upload, grid, delete
│   │   └── upload/
│   │       └── page.tsx             # Standalone upload panel
│   └── api/
│       ├── admin/auth/
│       │   └── route.ts             # POST — validates password, sets HTTP-only cookie
│       ├── portfolio/
│       │   ├── upload/
│       │   │   └── route.ts         # POST — uploads image to Storage + DB insert
│       │   └── delete/
│       │       └── route.ts         # POST — deletes storage file + DB row
│
├── components/                      # Reusable UI components
│   ├── page-shell.tsx               # Layout wrapper — header, footer, ambient glow
│   ├── site-header.tsx              # Fixed nav, mobile menu, theme toggle
│   ├── site-footer.tsx              # Footer with contact, social, policy
│   ├── hero.tsx                     # Auto-rotating hero slideshow with AnimatePresence
│   ├── section.tsx                  # Generic section wrapper (title + children)
│   ├── loading-screen.tsx           # Fade-out loading overlay
│   ├── floating-book-now.tsx        # Mobile-only sticky CTA button
│   ├── featured-carousel.tsx        # GSAP ScrollTrigger horizontal pinned carousel
│   ├── gallery-grid.tsx             # Masonry gallery with keyboard-accessible lightbox
│   ├── service-cards.tsx            # Animated service catalog cards
│   ├── booking-form.tsx             # Multi-step booking wizard (WhatsApp/Instagram)
│   ├── testimonials.tsx             # Auto-rotating testimonial carousel
│   ├── faq-accordion.tsx            # Lightweight FAQ accordion (native <details>)
│   ├── instagram-preview.tsx        # Social proof placeholder grid
│   ├── aftercare-guide.tsx          # Aftercare timeline placeholder
│   └── trending-styles.tsx          # Style tag chips
│
├── lib/                             # Shared utilities and data
│   ├── config.ts                    # Studio configuration object (contact, services, pricing)
│   ├── data.ts                      # Static content (nav items, testimonials, FAQs, aftercare)
│   ├── supabase.ts                  # Supabase client factory
│   └── utils.ts                     # cn() helper (clsx + tailwind-merge)
│
├── public/                          # Static assets
│   ├── brand/                       # Logo and brand images
│   ├── media/Tattoos/               # Tattoo artwork images
│   └── docs/                        # PDF aftercare guide
│
├── .next/                           # Build output (gitignored)
├── node_modules/                    # Dependencies
└── styles/                          # Empty (legacy, unused in current build)
```

---

## 3. Configuration & Core Setup

### Environment Variables

Create a `.env.local` file at the project root. The `.env.example` template defines the required keys:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
```

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are client-safe and used in browser-side Supabase calls.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and used in API routes to bypass Row Level Security (RLS) for uploads and deletes.
- `ADMIN_PASSWORD` is a simple shared secret validated by the `/api/admin/auth` route to gate the admin panel.

### Tailwind Configuration

The design system is built on CSS custom properties defined in `globals.css`, referenced from `tailwind.config.ts` as dynamic color values:

- **Colors:** `obsidian` (#0B0B0B), `charcoal` (#161616), `bone` (#F5F5F5), `bronze` (#C5A880), `ember` (#A96E49), plus a neutral scale.
- **Semantic tokens:** `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `ring` all map to `var(--*)` CSS variables.
- **Fonts:** `display` maps to Playfair Display; `sans` maps to DM Sans.
- **Dark mode:** Enabled via the `class` strategy (`darkMode: "class"`), toggled by `next-themes` on the `<html>` element.

### Theme Provider Pattern

`app/providers.tsx` wraps the app in `ThemeProvider` with a mounted guard to prevent hydration mismatches:

```tsx
"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <>{children}</>;

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
```

The `layout.tsx` applies `suppressHydrationWarning` to `<html>` because `next-themes` injects the dark class client-side.

### Global CSS Utilities

`app/globals.css` defines:
- CSS variable themes for dark (`:root`, `[data-theme="dark"]`) and light (`[data-theme="light"]`)
- Font imports via Google Fonts
- Utility classes: `.font-display`, `.font-body`, `.text-gold`, `.bg-obsidian`, `.bg-charcoal`, `.border-gold`, `.gold-glow`
- Animations: `.animated-underline`, `.glass` (backdrop-filter glassmorphism), `.grain` (SVG noise overlay)
- `@layer components` for reusable component classes: `.eyebrow`, `.display`, `.frame`, `.button-gold`, `.button-ghost`, `.panel`

### Path Alias

`tsconfig.json` maps `@/*` to the project root, enabling imports like `@/components/hero` and `@/lib/config`.

---

## 4. Core Components & Architecture

### Page Architecture Pattern

The app uses a **Server Component + Client Component** pattern for data-fetching pages:

1. **Server Page** (`app/portfolio/page.tsx`): Fetches data from Supabase, passes it as a prop to the client component.
2. **Client Component** (`portfolio-client.tsx`): Receives data, manages local UI state (lightbox, animations), and renders interactive UI.

This keeps data-fetching on the server while keeping interactivity client-side.

### Layout Shell

`components/page-shell.tsx` wraps every page with:
- An ambient mouse-following radial gradient glow
- `SiteHeader` (fixed nav, mobile menu, theme toggle)
- `main` content area with top padding for the fixed header
- `SiteFooter` (contact, social links, policy)
- `FloatingBookNow` (mobile-only sticky CTA)

### State Management

No external state library is used. State is managed via:
- **React `useState`** for local component state (forms, lightboxes, accordions)
- **Next.js `useRouter`** for programmatic navigation (admin auth redirects)
- **`next-themes` `useTheme`** for theme toggling in `site-header`
- **Server-side data fetching** in page components via Supabase client
- **HTTP-only cookies** for admin session persistence (`trabowl_admin_token`)

### Authentication Flow

1. User visits `/admin/login` — `middleware.ts` redirects authenticated users to `/admin/portfolio`.
2. Login form posts password to `/api/admin/auth`.
3. Server compares against `ADMIN_PASSWORD` env var.
4. On success, sets an HTTP-only, `secure` (in production), `sameSite: strict` cookie valid for 7 days.
5. Middleware checks for this cookie on all `/admin/:path*` routes and redirects to login if missing.

### Data Layer

- **Supabase Realtime is not used** — all data is fetched server-side at request time with `dynamic = "force-dynamic"` and `revalidate = 0`.
- **Storage:** Portfolio images are uploaded to the `portfolio-gallery` bucket.
- **Database:** `portfolio_posts` table stores `id`, `title`, `category`, `image_url`, `storage_path`, `created_at`.
- **Client-side uploads** (booking reference images) use the anon key directly in the browser.

### Animation Strategy

- **Framer Motion:** Used for page transitions (`AnimatePresence`), lightbox modals, mobile menu clip-path reveals, testimonial carousels, hero slide transitions, and spring animations on the floating CTA.
- **GSAP + ScrollTrigger:** Used exclusively in `featured-carousel.tsx` for a pinned horizontal scroll section that scrubs a track based on vertical scroll progress.

---

## 5. Reusable Code Blueprints

### 5.1 Theme Provider (SSR-Safe)

```tsx
// app/providers.tsx
"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <>{children}</>;

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
```

### 5.2 Root Layout with Hydration Guard

```tsx
// app/layout.tsx
import "./globals.css";
import { PageShell } from "@/components/page-shell";
import { ThemeProvider } from "./providers";

export const metadata = {
  title: "Trabowl Tattoo Studio | Nairobi",
  description: "A private Nairobi studio for intentional tattoos and precision piercings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PageShell>{children}</PageShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 5.3 Page Shell with Ambient Glow

```tsx
// components/page-shell.tsx
"use client";
import { ReactNode, useEffect, useState } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { FloatingBookNow } from "./floating-book-now";

export function PageShell({ children }: { children: ReactNode }) {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState(false);

  useEffect(() => {
    const fn = (e: MouseEvent) => setPoint({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", fn, { passive: true });
    return () => window.removeEventListener("pointermove", fn);
  }, []);

  useEffect(() => {
    const checkTheme = () => { setLight(document.body.dataset.theme === "light"); };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
        style={{ background: `radial-gradient(500px circle at ${point.x}px ${point.y}px, rgba(197,168,128,.075), transparent 45%)` }}
      />
      <SiteHeader />
      <main className="relative z-10 pt-[70px]">{children}</main>
      <SiteFooter />
      <FloatingBookNow />
    </>
  );
}
```

### 5.4 Server Component Data Fetch + Client Component Bridge

```tsx
// app/portfolio/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@/lib/supabase";
import PortfolioClient from "./portfolio-client";

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("portfolio_posts")
    .select("id, title, image_url, category")
    .order("created_at", { ascending: false });

  if (error) console.error("Database fetch failed:", error.message);

  return (
    <main className="bg-[#FBF9F6] dark:bg-[#0B0B0B] min-h-screen transition-colors">
      <PortfolioClient items={posts || []} />
    </main>
  );
}
```

### 5.5 Masonry Portfolio Grid with Lightbox

```tsx
// app/portfolio/portfolio-client.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  image?: string;
  image_url?: string;
}

const heights = [340, 280, 310, 260, 330, 290, 350, 270, 300];

export default function PortfolioClient({ items = [] }: { items?: PortfolioItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const safeItems = items || [];

  const prev = () => setLightboxIndex((i) => i !== null ? (i - 1 + safeItems.length) % safeItems.length : null);
  const next = () => setLightboxIndex((i) => i !== null ? (i + 1) % safeItems.length : null);

  return (
    <div className="min-h-screen pb-24">
      <div className="p-8 md:p-12 border-b border-neutral-300 dark:border-[rgba(197,168,128,0.12)]">
        <p className="text-[0.6rem] tracking-[0.3em] text-[#A47E4B] dark:text-[#C5A880] mb-2 font-semibold">OUR WORK</p>
        <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-black text-neutral-900 dark:text-[#F5F5F5] leading-[0.95] tracking-[-0.03em]">
          The <span className="italic text-[#C5A880]">Portfolio</span>
        </h1>
      </div>

      <div className="p-5 md:p-8 columns-1 sm:columns-2 lg:columns-3 gap-3">
        {safeItems.map((item, i) => (
          <motion.div
            key={`${item.id}-${i}`}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="break-inside-avoid mb-3 relative overflow-hidden rounded-[2rem] border border-neutral-300 dark:border-[rgba(197,168,128,0.12)] bg-white dark:bg-[#161616] cursor-pointer group shadow-sm"
            style={{ height: `${heights[i % heights.length]}px` }}
            onClick={() => setLightboxIndex(i)}
          >
            <Image src={item.image || item.image_url || ""} alt={item.title || "Tattoo Artwork"} fill className="object-cover transition-transform duration-400 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.7)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-white font-medium text-sm drop-shadow-md">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center p-4 bg-white/95 dark:bg-[rgba(0,0,0,0.95)] backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-4 right-4 bg-transparent border-none text-[#C5A880] text-2xl cursor-pointer z-[510] p-2" onClick={() => setLightboxIndex(null)} aria-label="Close lightbox">✕</button>
            <motion.div key={lightboxIndex} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative h-[80vh] w-full max-w-4xl overflow-hidden rounded-[2rem]"
              drag="x" dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => { if (info.offset.x > 70) prev(); if (info.offset.x < -70) next(); }}
              onClick={(e) => e.stopPropagation()}>
              <Image src={safeItems[lightboxIndex].image || safeItems[lightboxIndex].image_url || ""} alt={safeItems[lightboxIndex].title || "Tattoo Detail"} fill className="object-contain" sizes="100vw" priority />
            </motion.div>
            <div className="flex items-center gap-6 mt-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={prev} className="bg-transparent border border-[#A47E4B]/40 text-[#A47E4B] w-10 h-10 rounded-full flex items-center justify-center transition hover:bg-[#A47E4B]/10" aria-label="Previous image">←</button>
              <button onClick={next} className="bg-transparent border border-[#A47E4B]/40 text-[#A47E4B] w-10 h-10 rounded-full flex items-center justify-center transition hover:bg-[#A47E4B]/10" aria-label="Next image">→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 5.6 Supabase Client Factory

```ts
// lib/supabase.ts
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase Environment Variables!");
  }

  return supabaseCreateClient(supabaseUrl || "", supabaseAnonKey || "");
};
```

### 5.7 Admin API Route (Upload with Service Role)

```ts
// app/api/portfolio/upload/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string || "Untitled Artwork";
    const category = formData.get("category") as string || "FINE LINE";

    if (!file) return NextResponse.json({ error: "No media file provided for upload." }, { status: 400 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Server configuration mismatch: SUPABASE_SERVICE_ROLE_KEY is missing." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: storageError } = await supabase.storage.from("portfolio-gallery").upload(uniqueFileName, buffer, {
      contentType: file.type, cacheControl: "3600", upsert: false
    });
    if (storageError) return NextResponse.json({ error: `Storage upload failed: ${storageError.message}` }, { status: 500 });

    const { data: urlData } = supabase.storage.from("portfolio-gallery").getPublicUrl(uniqueFileName);
    const imageUrl = urlData.publicUrl;

    const { data: dbData, error: dbError } = await supabase
      .from("portfolio_posts")
      .insert([{ title, category, image_url: imageUrl, storage_path: uniqueFileName, created_at: new Date().toISOString() }])
      .select().single();

    if (dbError) return NextResponse.json({ error: `Database insertion failed: ${dbError.message}` }, { status: 500 });

    return NextResponse.json(dbData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### 5.8 Middleware for Admin Route Protection

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has("trabowl_admin_token");

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!hasToken) return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/admin/login") && hasToken) {
    return NextResponse.redirect(new URL("/admin/portfolio", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
```

### 5.9 Utility Class Merger

```ts
// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: Parameters<typeof clsx>) => twMerge(clsx(args));
```

### 5.10 Studio Configuration Object

```ts
// lib/config.ts
export const STUDIO_CONFIG = {
  brandName: "Trabowl Tattoo Studio",
  instagramHandle: "@trabowl_tattoo.haus",
  instagramLink: "https://instagram.com/trabowl_tattoo.haus",
  contactPhone: "0796062689",
  secondaryPhone: "0114341570",
  contactEmail: "trabowltattoohaus@gmail.com",
  depositRequirement: "30%",
  businessHours: { weekdays: "10:00 AM - 7:00 PM", weekends: "11:00 AM - 6:00 PM" },
  pricingPlaceholders: { minimumCharge: "KES 4,000", piercingBase: "KES 1,000" },
  services: [
    { id: "custom", name: "Custom Tattoos", basePrice: "KES 5,000" },
    { id: "coverup", name: "Cover-Up Tattoos", basePrice: "KES 6,000" },
    { id: "flash", name: "Flash Tattoos", basePrice: "KES 4,000" },
    { id: "piercing", name: "Piercings", basePrice: "KES 1,000" },
  ],
  whatsapp: "+254796062689",
} as const;

export const studioConfig = STUDIO_CONFIG;
```

---

## 6. Setup & Deployment Instructions

### Prerequisites

- Node.js 18+ (for Next.js 15 / React 19 compatibility)
- npm, yarn, or pnpm
- A Supabase project with:
  - A `portfolio_posts` table with columns: `id`, `title`, `category`, `image_url`, `storage_path`, `created_at`
  - A `portfolio-gallery` storage bucket (public)

### Installation

```bash
# 1. Clone or navigate to the project directory
cd "Trabowl Tattoo Haus"

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
```

### Environment Configuration

Edit `.env.local` and add your Supabase credentials and admin password:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-secure-password
```

### Development

```bash
# Run the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

### Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables in the Vercel project settings.
4. Deploy.

### Key Deployment Notes

- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in the deployment environment.
- Ensure `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_PASSWORD` are set in the deployment environment (these are server-only and not exposed to the browser).
- The `next.config.js` allows remote images from `images.unsplash.com` and your Supabase project CDN domain (`*.supabase.co`). Add additional domains if needed.
- The app uses permanent redirects (`/gallery` -> `/portfolio`) defined in `next.config.js`.

---

## Reusable Patterns Summary

| Pattern | Location | Purpose |
|---------|----------|---------|
| SSR-safe theme provider | `app/providers.tsx` | Prevents hydration mismatch with `next-themes` |
| Server-to-client data bridge | `app/portfolio/page.tsx` + `portfolio-client.tsx` | Fetch on server, interact on client |
| Supabase client factory | `lib/supabase.ts` | Centralized env var handling for client creation |
| Admin auth middleware | `middleware.ts` | Route-level cookie protection for `/admin/*` |
| Upload API with service role | `app/api/portfolio/upload/route.ts` | Server-side privileged file upload + DB insert |
| Delete API with cleanup | `app/api/portfolio/delete/route.ts` | Removes storage file and DB row atomically |
| Ambient mouse glow | `components/page-shell.tsx` | Radial gradient following pointer position |
| Glassmorphism utility | `app/globals.css` | `.glass` class for backdrop-blur panels |
| Design token system | `tailwind.config.ts` + `globals.css` | CSS variables for consistent theming across light/dark |
| WhatsApp booking deep link | `app/booking/page.tsx`, `app/book/page.tsx` | Encodes form state into a `wa.me` URL |
| Masonry lightbox | `app/portfolio/portfolio-client.tsx` | CSS columns layout with Framer Motion modal |
| Scroll-triggered horizontal carousel | `components/featured-carousel.tsx` | GSAP ScrollTrigger with `pin` and `scrub` |
