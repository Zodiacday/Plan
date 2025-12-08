import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  
  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug')
    .order('name');

  const categoryUrls: MetadataRoute.Sitemap = (categories || []).map((category) => ({
    url: `https://theplugdude.com/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  }));

  return [
    {
      url: 'https://theplugdude.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://theplugdude.com/categories',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryUrls,
  ];
}
