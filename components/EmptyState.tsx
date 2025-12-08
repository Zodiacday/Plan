'use client';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ 
  title = "Nothing here yet",
  message = "Check back later for updates",
  actionLabel,
  actionHref
}: EmptyStateProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (actionHref === '#') {
      e.preventDefault();
      window.location.reload();
    }
  };
  
  return (
    <div className="py-16 text-center">
      <div className="max-w-md mx-auto px-4">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-white/70 text-lg mb-6">{message}</p>
        {actionLabel && actionHref && (
          <a
            href={actionHref}
            onClick={handleClick}
            className="inline-block px-6 py-3 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-colors min-h-[44px] cursor-pointer"
          >
            {actionLabel}
          </a>
        )}
      </div>
    </div>
  );
}
