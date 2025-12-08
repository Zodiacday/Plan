'use client';

import { useState, useMemo } from 'react';
import { Tool, FilterOptions } from '@/lib/types';
import ToolCard from './ToolCard';
import ToolFilters from './ToolFilters';
import EmptyState from './EmptyState';

interface FilteredToolsListProps {
  tools: Tool[];
}

export default function FilteredToolsList({ tools }: FilteredToolsListProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    platform: 'all',
    pricing: 'free', // Default to free
    sort: 'popular'
  });

  const filteredAndSortedTools = useMemo(() => {
    let filtered = [...tools];

    // Platform filter
    if (filters.platform !== 'all') {
      filtered = filtered.filter(tool =>
        tool.platform?.includes(filters.platform)
      );
    }

    // When pricing is 'free' (default), show free tools first, then others
    // When pricing is 'paid' or 'open-source', show only those
    const shouldShowOnlySelected = filters.pricing === 'paid' || filters.pricing === 'open-source';
    
    if (shouldShowOnlySelected) {
      filtered = filtered.filter(tool => tool.pricing_type === filters.pricing);
    }

    // Sort
    filtered.sort((a, b) => {
      // For 'free' filter (default), prioritize free tools first
      if (filters.pricing === 'free') {
        const aIsFree = a.pricing_type === 'free';
        const bIsFree = b.pricing_type === 'free';
        
        if (aIsFree && !bIsFree) return -1;
        if (!aIsFree && bIsFree) return 1;
      }
      
      // Then apply secondary sort
      switch (filters.sort) {
        case 'popular':
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'votes':
          return b.total_votes - a.total_votes;
        default:
          return 0;
      }
    });

    return filtered;
  }, [tools, filters]);

  return (
    <>
      <ToolFilters onFilterChange={setFilters} />
      
      {filteredAndSortedTools.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-text-secondary">
            Showing {filteredAndSortedTools.length} of {tools.length} tools
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredAndSortedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="No tools match your filters"
          message="Try adjusting your filter criteria"
          actionLabel="Reset filters"
          actionHref="#"
        />
      )}
    </>
  );
}
