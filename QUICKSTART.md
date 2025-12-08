# Quick Start Guide

## 1. Set up environment variables

Copy the example file and add your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase URL and anon key.

## 2. Set up the database

1. Go to your Supabase project
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL commands

This will create:
- Categories table
- Tools table
- Sample data (3 tools, 8 categories)
- Automatic tool count triggers

## 3. Start the development server

```bash
npm run dev
```

Visit http://localhost:3000

## 4. Build for production

```bash
npm run build
npm start
```

## Troubleshooting

**Issue:** "Cannot connect to Supabase"
- Check your `.env.local` file has correct credentials
- Verify your Supabase project is active

**Issue:** "No tools or categories showing"
- Run the `database/schema.sql` in Supabase SQL Editor
- Check the sample data was inserted

**Issue:** TypeScript errors
- Run `npm install` again
- Restart your IDE/editor

## Next Steps

See `SETUP.md` for complete documentation and customization options.
