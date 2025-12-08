'use client';

import { useState, useEffect } from 'react';
import { Tool, Category } from '@/lib/types';
import CompactToolCard from './CompactToolCard';
import CompactCategoryCard from './CompactCategoryCard';
import { supabase } from '@/lib/supabase';

export default function InstantSearch() {
  const [query, setQuery] = useState('');
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setTools([]);
      setCategories([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      
      const searchQuery = `%${query.trim()}%`;
      
      const [toolsResult, categoriesResult] = await Promise.all([
        supabase
          .from('tools')
          .select('*')
          .eq('status', 'approved')
          .or(`name.ilike.${searchQuery},description.ilike.${searchQuery}`)
          .order('upvotes', { ascending: false })
          .limit(6),
        supabase
          .from('categories')
          .select('*')
          .or(`name.ilike.${searchQuery},description.ilike.${searchQuery}`)
          .order('tool_count', { ascending: false })
          .limit(4)
      ]);

      setTools(toolsResult.data || []);
      setCategories(categoriesResult.data || []);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const hasResults = tools.length > 0 || categories.length > 0;
  const showResults = query.trim().length >= 2;

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for tools..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 sm:px-6 md:px-8 py-4 md:py-6 bg-black border-2 border-white/30 text-white text-base md:text-xl placeholder-muted focus:outline-none focus:border-white transition-colors"
      />
      
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black border-2 border-white/30 max-h-[70vh] overflow-y-auto z-50">
          {isSearching ? (
            <div className="p-6 text-center text-white/70 text-sm">Searching...</div>
          ) : hasResults ? (
            <div>
              {categories.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold text-white/70 mb-2 px-3 pt-3">CATEGORIES</h3>
                  <div>
                    {categories.map((category) => (
                      <CompactCategoryCard key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              )}
              
              {tools.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/70 mb-2 px-3 pt-3">TOOLS</h3>
                  <div>
                    {tools.map((tool) => (
                      <CompactToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              )}
              
              {(tools.length >= 6 || categories.length >= 4) && (
                <div className="mt-2 pt-3 pb-3 border-t border-white/10 text-center">
                  <a 
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    View all results →
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-white/70 text-sm">
              No results for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
