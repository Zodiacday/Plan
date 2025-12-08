export default function CategoryCardSkeleton() {
  return (
    <div className="group block relative pb-5 md:pb-6 pr-4 md:pr-6 min-h-[100px] animate-pulse">
      {/* L-shaped corner border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-white/10" />
      
      <div className="pr-4 md:pr-6 pb-5 md:pb-6 py-4">
        <div className="flex items-baseline justify-between mb-2">
          {/* Title skeleton */}
          <div className="h-6 bg-white/5 w-1/2" />
          {/* Count skeleton */}
          <div className="h-4 bg-white/5 w-8" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/5 w-full" />
          <div className="h-4 bg-white/5 w-4/5" />
        </div>
      </div>
    </div>
  );
}
