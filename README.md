# Plan 
ThePlugDude - Free Tools Directory (Simplified Dark UI)

Project Overview

A fast, minimal directory website listing free tools. Users can browse by category, search, and view tool details.Design principle: Ultra-dark, clean, no extra colors, no unnecessary code.

Tech Stack

Framework: Next.js 15+ (App Router)

Database: Supabase (PostgreSQL)

Styling: Tailwind CSS (dark mode only)

UI Components: shadcn/ui

Language: TypeScript

Deployment: Vercel

Core Features

Homepage: Search bar, featured tools grid, category grid.

Categories Page: List all categories with counts.

Category Detail Page: Tools in that category, simple cards.

Tool Detail Page: Tool info (name, description, logo, link, tags, rating, platforms, pros/cons, alternatives, upvotes/downvotes).

Search (Phase 2): Filter by name, description, tags.

Database Schema (Simplified)

categories

id serial primary key
slug varchar unique
name varchar
description text
tool_count integer
section varchar

tools

id serial primary key
slug varchar unique
name varchar
description text
url varchar
logo varchar
category_slug varchar
tags text[]
rating real
is_free boolean
pros text[]
cons text[]
platforms text[]
alternatives text[]
upvotes integer
downvotes integer

Design Requirements

Dark mode only:

Background: #000000 / #0a0a0a / #1a1a1a

Text: #ffffff (primary), #a1a1a1 (secondary)

Borders: #2a2a2a

Cards: Flat, dark background, subtle border, hover lift.

Typography: Inter/Geist, bold headings, 16px body.

Layout: Simple grids, no animations.

Responsive: Works on all devices.

Technical Requirements

Server-side rendering (SSR) for all pages.

No client-side fetching on load.

Next.js Image optimization.

SEO basics: meta tags, sitemap, robots.txt.

Error handling: Simple fallback messages.

File Structure

app/
  layout.tsx
  page.tsx
  categories/
    page.tsx
    [slug]/page.tsx
  tool/
    [slug]/page.tsx

components/
  Header.tsx
  Footer.tsx
  ToolCard.tsx
  CategoryCard.tsx

lib/
  supabase.ts

Implementation Phases

Phase 1 (MVP): Homepage, categories, category detail, tool detail, header/footer.

Phase 2 (Polish): Search, SEO, error states, performance tweaks.

Phase 3 (Features): Submission form, admin panel, ratings/reviews, newsletter.

Key Principles

Ultra-dark, minimal UI.

Only necessary code.

Fast & responsive.

Data-driven (Supabase).

Maintainable.
