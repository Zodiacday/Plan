# ThePlugDude - Development Guide

## Available Scripts

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build production bundle
npm start        # Start production server
npm run lint     # Run ESLint
```

## Code Organization

### Page Components (app/*)
- Use `async` functions for server components
- Fetch data directly in the component
- Return JSX for rendering

### Reusable Components (components/*)
- Keep components simple and focused
- Use TypeScript interfaces for props
- Follow dark theme design system

### Database Utilities (lib/*)
- `supabase.ts` - Supabase client instance
- `types.ts` - TypeScript interfaces for database models

## Design System

### Colors
```
Background:           #000000
Background Secondary: #0a0a0a
Card Background:      #1a1a1a
Text Primary:         #ffffff
Text Secondary:       #a1a1a1
Border:               #2a2a2a
```

### Typography
- Headings: Bold weight
- Body: 16px base size
- Font: Inter (default)

### Spacing
- Use Tailwind's spacing scale
- Consistent padding: p-6 for cards
- Gaps: gap-6 for grids

### Components

#### ToolCard
Displays tool information in a card format with:
- Logo (if available)
- Name and description
- Rating and free badge
- Hover effect with lift

#### CategoryCard
Shows category with:
- Name and description
- Tool count
- Section tag
- Hover effect

## Database Queries

### Get Tools by Category
```typescript
const { data } = await supabase
  .from('tools')
  .select('*')
  .eq('category_slug', categorySlug)
  .order('rating', { ascending: false });
```

### Get Featured Tools
```typescript
const { data } = await supabase
  .from('tools')
  .select('*')
  .eq('is_free', true)
  .order('rating', { ascending: false })
  .limit(6);
```

### Get All Categories
```typescript
const { data } = await supabase
  .from('categories')
  .select('*')
  .order('name', { ascending: true });
```

## Adding New Features

### Add a New Page

1. Create file in `app/` directory
2. Export default async function
3. Fetch data if needed
4. Return JSX

Example:
```typescript
// app/about/page.tsx
export default async function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold">About</h1>
    </div>
  );
}
```

### Add a New Component

1. Create file in `components/` directory
2. Define props interface
3. Export default function

Example:
```typescript
// components/Badge.tsx
interface BadgeProps {
  text: string;
  color?: string;
}

export default function Badge({ text, color = 'green' }: BadgeProps) {
  return (
    <span className={`bg-${color}-900/30 text-${color}-400 px-2 py-1 rounded`}>
      {text}
    </span>
  );
}
```

## SEO Best Practices

### Page Metadata
```typescript
export const metadata: Metadata = {
  title: 'Page Title - ThePlugDude',
  description: 'Page description for search engines',
  keywords: ['keyword1', 'keyword2'],
};
```

### Dynamic Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const item = await fetchItem(params.slug);
  
  return {
    title: `${item.name} - ThePlugDude`,
    description: item.description,
  };
}
```

## Performance Tips

1. **Use Server Components** - Default in Next.js 15, no client JS
2. **Optimize Images** - Always use Next.js Image component
3. **Limit Database Queries** - Use `.limit()` for lists
4. **Enable Caching** - Next.js automatically caches fetch requests

## Common Patterns

### Error Handling
```typescript
const { data, error } = await supabase
  .from('tools')
  .select('*');

if (error) {
  console.error('Error:', error);
  return [];
}

return data || [];
```

### Not Found Handling
```typescript
import { notFound } from 'next/navigation';

const item = await getItem(slug);

if (!item) {
  notFound(); // Shows 404 page
}
```

### Conditional Rendering
```typescript
{items.length > 0 ? (
  <div className="grid grid-cols-3 gap-6">
    {items.map(item => <Card key={item.id} item={item} />)}
  </div>
) : (
  <p className="text-text-secondary">No items found.</p>
)}
```

## Testing Locally

1. Ensure `.env.local` is configured
2. Run `npm run dev`
3. Open http://localhost:3000
4. Test all pages:
   - Homepage: `/`
   - Categories: `/categories`
   - Category detail: `/categories/productivity`
   - Tool detail: `/tool/notion`

## Deployment Checklist

- [ ] Update Supabase URL in production env vars
- [ ] Test all pages work correctly
- [ ] Check responsive design on mobile
- [ ] Verify images load properly
- [ ] Test database queries return data
- [ ] Update sitemap URLs in `app/sitemap.ts`
- [ ] Update robots.txt domain in `app/robots.ts`

## Support

For questions or issues:
1. Check `SETUP.md` for configuration help
2. Review database schema in `database/schema.sql`
3. Check Supabase logs for database errors
4. Open an issue on GitHub
