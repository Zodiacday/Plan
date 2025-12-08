import Link from 'next/link';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="group block relative pb-5 md:pb-6 pr-4 md:pr-6 hover:bg-white/5 transition-colors no-underline min-h-[100px]"
    >
      {/* L-shaped corner border: bottom + right */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      
      <div className="pr-4 md:pr-6 pb-5 md:pb-6 py-4">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-bold text-lg md:text-xl group-hover:text-gray-300 transition-colors">{category.name}</h3>
          <span className="text-xs md:text-sm text-white/70 ml-3 md:ml-4 flex-shrink-0">{category.tool_count}</span>
        </div>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">{category.description}</p>
      </div>
    </Link>
  );
}
