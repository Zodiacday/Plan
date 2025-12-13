import { Tool, Category } from '@/lib/types';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import InstantSearch from '@/components/InstantSearch';
import Link from 'next/link';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

async function getFeaturedTools(): Promise<Tool[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('featured', true)
    .order('upvotes', { ascending: false })
    .limit(12);
  if (error) {
    console.error('Error fetching featured tools:', error);
    return [];
  }
  return data || [];
}

async function getFeaturedCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('tool_count', { ascending: false })
    .limit(8);
  if (error) {
    console.error('Error fetching featured categories:', error);
    return [];
  }
  return data || [];
}

export default async function HomePage() {
  const [featuredTools, featuredCategories] = await Promise.all([
    getFeaturedTools(),
    getFeaturedCategories(),
  ]);

  const totalCategories = featuredCategories.length > 0 ? featuredCategories.length : 21;
  const totalTools = featuredCategories.reduce((acc, cat) => acc + cat.tool_count, 0);

  return (
    <div>
      {/* Hero Section - Above the Fold */}
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
            Best free tools for you
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/70 mb-12 md:mb-20 italic">
            — The Plug dude
          </p>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-10 md:mb-16 leading-relaxed px-4">
            Hand-picked. No junk. Always free.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8 md:mb-12 max-w-2xl mx-auto w-full">
            <InstantSearch />
          </div>
          
          {/* Browse Link */}
          <Link 
            href="/categories"
            className="text-base md:text-xl text-white hover:text-white/70 transition-colors inline-block min-h-[44px] flex items-center justify-center"
          >
            Browse Categories →
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 text-sm animate-bounce hidden sm:block">
          ↓
        </div>
      </div>

      {/* Content Below the Fold */}
      <div className="px-4 sm:px-8 lg:px-12">
        {/* Social Proof Stats */}
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 md:gap-20 text-sm max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-white/70">Tools Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{totalCategories}</div>
              <div className="text-white/70">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-white/70">Free Tier</div>
            </div>
          </div>
        </section>

        {/* Top Categories - SEO Important */}
        <section className="py-16 md:py-24 max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Browse by Category</h2>
            <p className="text-white/70 text-base md:text-xl">Find the best free tools for your needs</p>
          </div>
          {featuredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {featuredCategories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg">No categories available yet</p>
              <p className="text-sm text-white/70 mt-2">Please run the database migration</p>
            </div>
          )}
          
          <div className="mt-12 md:mt-16 text-center">
            <Link 
              href="/categories" 
              className="text-base md:text-xl text-white/70 hover:text-white transition-colors inline-block min-h-[44px] flex items-center justify-center"
            >
              View all {totalCategories} categories →
            </Link>
          </div>
        </section>

        {/* Top Rated Tools - Social Proof */}
        <section className="py-16 md:py-24 max-w-5xl mx-auto">
          <div className="mb-12 md:mb-16 text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Top Rated Tools</h2>
            <p className="text-white/70 text-base md:text-xl">Most popular tools chosen by the community</p>
          </div>
          {featuredTools.length > 0 ? (
            <div className="space-y-1">
              {featuredTools.slice(0, 6).map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg">No tools available yet</p>
              <p className="text-sm text-white/70 mt-2">Please run the database migration</p>
            </div>
          )}
        </section>

        {/* Trust Signals */}
        <section className="py-16 md:py-24 border-t border-white/10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center px-4">
            <div>
              <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Updated Weekly</div>
              <p className="text-white/70 text-base md:text-lg">Fresh tools added and reviewed every week</p>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4">No Affiliate Spam</div>
              <p className="text-white/70 text-base md:text-lg">Pure recommendations, no hidden commissions</p>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Community Driven</div>
              <p className="text-white/70 text-base md:text-lg">Rankings based on real user votes and reviews</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
