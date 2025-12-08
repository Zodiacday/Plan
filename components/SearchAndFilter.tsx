'use client';

import { useState, useEffect } from 'react';
import { FilterOptions } from '@/lib/types';

interface SearchAndFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  showPlatformFilter?: boolean;
  showPricingFilter?: boolean;
  showSort?: boolean;
}

export default function SearchAndFilter({ 
  onFilterChange,
  showPlatformFilter = true,
  showPricingFilter = true,
  showSort = true
}: SearchAndFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    platform: 'all',
    pricing: 'all',
    sort: 'popular'
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search tools..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="w-full px-4 py-3 bg-black border-2 border-white/30 text-white placeholder-muted focus:outline-none focus:border-white"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4">
        {showPlatformFilter && (
          <select
            value={filters.platform}
            onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
            className="px-4 py-2 bg-black border-2 border-white/30 text-white text-sm focus:outline-none focus:border-white"
          >
            <option value="all">All Platforms</option>
            <option value="web">Web</option>
            <option value="mac">Mac</option>
            <option value="windows">Windows</option>
            <option value="linux">Linux</option>
            <option value="ios">iOS</option>
            <option value="android">Android</option>
          </select>
        )}

        {showPricingFilter && (
          <select
            value={filters.pricing}
            onChange={(e) => setFilters(prev => ({ ...prev, pricing: e.target.value }))}
            className="px-4 py-2 bg-black border-2 border-white/30 text-white text-sm focus:outline-none focus:border-white"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="open-source">Open Source</option>
          </select>
        )}

        {showSort && (
          <select
            value={filters.sort}
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
            className="px-4 py-2 bg-black border-2 border-white/30 text-white text-sm focus:outline-none focus:border-white"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest First</option>
            <option value="name">Name (A-Z)</option>
            <option value="votes">Highest Rated</option>
          </select>
        )}

        {(filters.search || filters.platform !== 'all' || filters.pricing !== 'all') && (
          <button
            onClick={() => setFilters({ search: '', platform: 'all', pricing: 'all', sort: 'popular' })}
            className="px-4 py-2 text-sm text-white/70 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
