export default function ToolCardSkeleton() {
  return (
    <div className="group block relative pb-6 md:pb-8 pr-4 md:pr-6 min-h-[80px] animate-pulse">
      {/* L-shaped corner border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-white/10" />
      
      <div className="pr-4 md:pr-6 pb-6 md:pb-8">
        <div className="flex items-start gap-4 md:gap-6">
          {/* Logo skeleton */}
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 flex-shrink-0" />
          
          <div className="flex-1 min-w-0">
            {/* Title skeleton */}
            <div className="h-6 bg-white/5 mb-3 w-1/3" />
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-white/5 w-full" />
              <div className="h-4 bg-white/5 w-5/6" />
            </div>
            
            {/* Metadata skeleton */}
            <div className="flex gap-4">
              <div className="h-3 bg-white/5 w-16" />
              <div className="h-3 bg-white/5 w-20" />
              <div className="h-3 bg-white/5 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
