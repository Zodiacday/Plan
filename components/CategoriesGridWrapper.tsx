'use client';

import { Suspense } from 'react';
import CategoryCardSkeleton from './CategoryCardSkeleton';

interface CategoriesGridWrapperProps {
  children: React.ReactNode;
  count?: number;
}

export default function CategoriesGridWrapper({ children, count = 6 }: CategoriesGridWrapperProps) {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    }>
      {children}
    </Suspense>
  );
}
