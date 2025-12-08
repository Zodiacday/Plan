import { supabase } from '@/lib/supabase';
import { Tool, Category } from '@/lib/types';
import FilteredToolsList from '@/components/FilteredToolsList';
import EmptyState from '@/components/EmptyState';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

async function getCategory(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

async function getToolsByCategory(categoryId: string): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', categoryId)
    .eq('status', 'approved')
    .order('upvotes', { ascending: false });

  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }

  return data || [];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const seoTitle = `Best Free ${category.name} in 2025 - The Plug Dude`;
  const seoDescription = `Discover the best free ${category.name.toLowerCase()} with powerful features for creators in 2025. Compare tools, read reviews, and find the perfect free ${category.name.toLowerCase()} for your needs.`;
  const url = `https://theplugdude.com/categories/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const tools = await getToolsByCategory(category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 pb-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          {category.icon && <span className="text-4xl">{category.icon}</span>}
          <h1 className="text-3xl md:text-5xl font-bold">Best Free {category.name}</h1>
        </div>
        
        {/* SEO-optimized intro */}
        <div className="mb-6">
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            Looking for the best free {category.name.toLowerCase()}? We've curated a comprehensive list of top-rated free tools that deliver professional-grade features without the price tag. Whether you're a creator, professional, or hobbyist, these {category.name.toLowerCase()} offer powerful capabilities at zero cost.
          </p>
          <p className="text-white/70 text-base leading-relaxed">
            {category.description} Browse {category.tool_count} carefully selected {category.tool_count !== 1 ? 'tools' : 'tool'} below, compare features, and find the perfect solution for your needs.
          </p>
        </div>
      </div>

      {tools.length > 0 ? (
        <FilteredToolsList tools={tools} />
      ) : (
        <EmptyState
          title="No tools in this category yet"
          message="Check back soon for new tools"
          actionLabel="Browse all categories"
          actionHref="/categories"
        />
      )}
    </div>
  );
}
