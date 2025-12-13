import { Category } from '@/lib/types';
import CategoryCard from '@/components/CategoryCard';
import InstantSearch from '@/components/InstantSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Categories - The Plug Dude',
  description: 'Browse all tool categories and find the perfect free tools for your needs.',
};

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

async function getAllCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('tool_count', { ascending: false });
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data || [];
}

const categoryGroupTitles: Record<string, { title: string; icon: string; description: string }> = {
  creative: {
    title: 'Creative Tools',
    icon: '🎨',
    description: 'Design, video, and creative content tools'
  },
  productivity: {
    title: 'Productivity',
    icon: '⚡',
    description: 'Get more done with less effort'
  },
  development: {
    title: 'Developer Tools',
    icon: '💻',
    description: 'Tools for building and coding'
  },
  ai: {
    title: 'AI & Automation',
    icon: '🤖',
    description: 'Intelligent and automated solutions'
  },
  business: {
    title: 'Business & Marketing',
    icon: '📈',
    description: 'Grow and market your business'
  },
  learning: {
    title: 'Learning & Education',
    icon: '📚',
    description: 'Learn new skills and knowledge'
  }
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  // Group categories by category_group
  const groupedCategories = categories.reduce((acc, category) => {
    const group = category.category_group || 'other';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(category);
    return acc;
  }, {} as Record<string, Category[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Browse by Category</h1>
        <p className="text-text-secondary mb-8">
          Explore tools organized by category to find exactly what you need
        </p>
        
        {/* Search Bar */}
        <div className="max-w-3xl">
          <InstantSearch />
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="space-y-16">
          {Object.entries(groupedCategories).map(([groupKey, groupCategories], index) => {
            const groupInfo = categoryGroupTitles[groupKey] || { 
              title: groupKey.charAt(0).toUpperCase() + groupKey.slice(1), 
              icon: '📦',
              description: ''
            };
            
            return (
              <div key={groupKey} className={index > 0 ? "border-t border-white/10 pt-16" : ""}>
                <div className="mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{groupInfo.title}</h2>
                    {groupInfo.description && (
                      <p className="text-white/70 text-base">{groupInfo.description}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupCategories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-text-secondary">No categories available yet.</p>
          <p className="text-text-secondary text-sm mt-2">
            Configure your Supabase database to add categories.
          </p>
        </div>
      )}
    </div>
  );
}
