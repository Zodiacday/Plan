import { supabase } from '@/lib/supabase';
import { Tool, Category } from '@/lib/types';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function searchTools(query: string): Promise<Tool[]> {
  if (!query || query.trim().length < 2) return [];
  
  const searchQuery = `%${query.trim()}%`;
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'approved')
    .or(`name.ilike.${searchQuery},description.ilike.${searchQuery}`)
    .order('upvotes', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error searching tools:', error);
    return [];
  }

  return data || [];
}

async function searchCategories(query: string): Promise<Category[]> {
  if (!query || query.trim().length < 2) return [];
  
  const searchQuery = `%${query.trim()}%`;
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .or(`name.ilike.${searchQuery},description.ilike.${searchQuery}`)
    .order('tool_count', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error searching categories:', error);
    return [];
  }

  return data || [];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  const [tools, categories] = await Promise.all([
    searchTools(query),
    searchCategories(query),
  ]);

  const hasResults = tools.length > 0 || categories.length > 0;

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-16 md:py-24 max-w-6xl mx-auto">
      <div className="mb-12">
        <Link 
          href="/"
          className="text-sm text-white/70 hover:text-white transition-colors inline-block mb-6"
        >
          ← Back to home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>
        
        {query && (
          <p className="text-white/70 text-lg">
            Found {tools.length} tool{tools.length !== 1 ? 's' : ''} and {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'}
          </p>
        )}
      </div>

      {!query ? (
        <div className="text-center py-16">
          <p className="text-white/70 text-xl mb-8">Enter a search query to find tools and categories</p>
          <Link 
            href="/"
            className="text-lg text-white hover:text-white/70 transition-colors"
          >
            Go to homepage →
          </Link>
        </div>
      ) : !hasResults ? (
        <div className="text-center py-16">
          <p className="text-2xl font-bold mb-4">No results found</p>
          <p className="text-white/70 text-lg mb-8">Try a different search term or browse our categories</p>
          <Link 
            href="/categories"
            className="text-lg text-white hover:text-white/70 transition-colors"
          >
            Browse categories →
          </Link>
        </div>
      ) : (
        <div>
          {categories.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-white/10">
                Categories ({categories.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>
          )}

          {tools.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-white/10">
                Tools ({tools.length})
              </h2>
              <div className="space-y-1">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
