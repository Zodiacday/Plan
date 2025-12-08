'use client';

import { Suspense } from 'react';
import ToolCardSkeleton from './ToolCardSkeleton';

interface ToolsListWrapperProps {
  children: React.ReactNode;
  count?: number;
}

export default function ToolsListWrapper({ children, count = 6 }: ToolsListWrapperProps) {
  return (
    <Suspense fallback={
      <div className="space-y-1">
        {Array.from({ length: count }).map((_, i) => (
          <ToolCardSkeleton key={i} />
        ))}
      </div>
    }>
      {children}
    </Suspense>
  );
}
