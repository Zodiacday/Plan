'use client';

import Link from 'next/link';
import { Category } from '@/lib/types';

interface CompactCategoryCardProps {
  category: Category;
}

export default function CompactCategoryCard({ category }: CompactCategoryCardProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="group block relative px-3 py-3 hover:bg-white/5 transition-colors"
    >
      {/* L-shaped corner border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      
      <div className="flex items-center justify-between pr-3">
        <h3 className="font-bold text-sm group-hover:text-gray-300 transition-colors">
          {category.name}
        </h3>
        <span className="text-xs text-white/70 ml-3 flex-shrink-0">
          {category.tool_count}
        </span>
      </div>
    </Link>
  );
}
