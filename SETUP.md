# ThePlugDude - Free Tools Directory

A fast, minimal directory website listing free tools built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- 🎨 **Ultra-dark minimal UI** - Clean design with no unnecessary elements
- ⚡ **Server-side rendering** - Fast page loads with Next.js App Router
- 🗄️ **Supabase database** - PostgreSQL backend for tools and categories
- 📱 **Fully responsive** - Works seamlessly on all devices
- 🔍 **SEO optimized** - Meta tags, sitemap, and robots.txt included
- 🎯 **TypeScript** - Type-safe development

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS (dark mode only)
- **Language:** TypeScript
- **Deployment:** Vercel

## Project Structure

```
app/
  ├── layout.tsx           # Root layout with header/footer
  ├── page.tsx             # Homepage with featured tools & categories
  ├── globals.css          # Global styles
  ├── not-found.tsx        # 404 page
  ├── robots.ts            # Robots.txt configuration
  ├── sitemap.ts           # Sitemap configuration
  ├── categories/
  │   ├── page.tsx         # All categories list
  │   └── [slug]/
  │       └── page.tsx     # Category detail page
  └── tool/
      └── [slug]/
          └── page.tsx     # Tool detail page

components/
  ├── Header.tsx           # Site header with navigation
  ├── Footer.tsx           # Site footer
  ├── ToolCard.tsx         # Tool card component
  └── CategoryCard.tsx     # Category card component

lib/
  ├── supabase.ts          # Supabase client
  └── types.ts             # TypeScript interfaces

database/
  └── schema.sql           # Database schema and sample data
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `database/schema.sql`
3. Get your project URL and anon key from **Settings → API**

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Database Schema

### Categories Table

```sql
categories (
  id              SERIAL PRIMARY KEY,
  slug            VARCHAR UNIQUE,
  name            VARCHAR,
  description     TEXT,
  tool_count      INTEGER,
  section         VARCHAR
)
```

### Tools Table

```sql
tools (
  id              SERIAL PRIMARY KEY,
  slug            VARCHAR UNIQUE,
  name            VARCHAR,
  description     TEXT,
  url             VARCHAR,
  logo            VARCHAR,
  category_slug   VARCHAR,
  tags            TEXT[],
  rating          REAL,
  is_free         BOOLEAN,
  pros            TEXT[],
  cons            TEXT[],
  platforms       TEXT[],
  alternatives    TEXT[],
  upvotes         INTEGER,
  downvotes       INTEGER
)
```

## Adding Content

### Add a Category

Use the Supabase dashboard or insert directly:

```sql
INSERT INTO categories (slug, name, description, tool_count, section)
VALUES ('your-category', 'Category Name', 'Description here', 0, 'Section');
```

### Add a Tool

```sql
INSERT INTO tools (slug, name, description, url, category_slug, tags, rating, is_free)
VALUES (
  'tool-slug',
  'Tool Name',
  'Tool description',
  'https://example.com',
  'category-slug',
  ARRAY['tag1', 'tag2'],
  4.5,
  true
);
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

The site will automatically deploy on every push to the main branch.

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  background: '#000000',
  'background-secondary': '#0a0a0a',
  'background-card': '#1a1a1a',
  'text-primary': '#ffffff',
  'text-secondary': '#a1a1a1',
  border: '#2a2a2a',
}
```

### Logo/Branding

Update the site name in:
- `components/Header.tsx` - Header logo text
- `app/layout.tsx` - Site metadata

## Performance

- All pages use server-side rendering (SSR)
- Images are optimized with Next.js Image component
- Minimal JavaScript bundle size
- Static assets cached by CDN

## Future Enhancements (Phase 2 & 3)

- [ ] Search functionality
- [ ] Tool submission form
- [ ] User ratings and reviews
- [ ] Admin panel
- [ ] Newsletter integration
- [ ] Advanced filtering

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
