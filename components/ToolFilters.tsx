'use client';

import { useState, useEffect } from 'react';
import { FilterOptions } from '@/lib/types';

interface ToolFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  showPlatformFilter?: boolean;
  showPricingFilter?: boolean;
  showSort?: boolean;
}

export default function ToolFilters({ 
  onFilterChange,
  showPlatformFilter = true,
  showPricingFilter = true,
  showSort = true
}: ToolFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    platform: 'all',
    pricing: 'free', // Default to free
    sort: 'popular'
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="mb-8">
      {/* Filters Row */}
      <div className="flex flex-wrap gap-4">
        {showPlatformFilter && (
          <div className="relative group">
            <select
              value={filters.platform}
              onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
              className="relative px-4 py-2 pr-8 bg-black border-0 text-white text-sm focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Platforms</option>
              <option value="web">Web</option>
              <option value="mac">Mac</option>
              <option value="windows">Windows</option>
              <option value="linux">Linux</option>
              <option value="ios">iOS</option>
              <option value="android">Android</option>
            </select>
            {/* Dropdown arrow - chevron made with lines */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-2 h-2">
              <div className="absolute top-0 left-0 w-full h-px bg-white/50 rotate-45 origin-left"></div>
              <div className="absolute top-0 right-0 w-full h-px bg-white/50 -rotate-45 origin-right"></div>
            </div>
            {/* L-shaped borders */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 group-hover:bg-white/30 transition-colors pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors pointer-events-none" />
          </div>
        )}

        {showPricingFilter && (
          <div className="relative group">
            <select
              value={filters.pricing}
              onChange={(e) => setFilters(prev => ({ ...prev, pricing: e.target.value }))}
              className="relative px-4 py-2 pr-8 bg-black border-0 text-white text-sm focus:outline-none appearance-none cursor-pointer"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="open-source">Open Source</option>
            </select>
            {/* Dropdown arrow - chevron made with lines */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-2 h-2">
              <div className="absolute top-0 left-0 w-full h-px bg-white/50 rotate-45 origin-left"></div>
              <div className="absolute top-0 right-0 w-full h-px bg-white/50 -rotate-45 origin-right"></div>
            </div>
            {/* L-shaped borders */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 group-hover:bg-white/30 transition-colors pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors pointer-events-none" />
          </div>
        )}

        {showSort && (
          <div className="relative group">
            <select
              value={filters.sort}
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
              className="relative px-4 py-2 pr-8 bg-black border-0 text-white text-sm focus:outline-none appearance-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="votes">Highest Rated</option>
            </select>
            {/* Dropdown arrow - chevron made with lines */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-2 h-2">
              <div className="absolute top-0 left-0 w-full h-px bg-white/50 rotate-45 origin-left"></div>
              <div className="absolute top-0 right-0 w-full h-px bg-white/50 -rotate-45 origin-right"></div>
            </div>
            {/* L-shaped borders */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 group-hover:bg-white/30 transition-colors pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors pointer-events-none" />
          </div>
        )}

        {(filters.platform !== 'all' || filters.pricing !== 'free') && (
          <button
            onClick={() => setFilters({ search: '', platform: 'all', pricing: 'free', sort: 'popular' })}
            className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
