'use client';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ 
  message = "Something went wrong", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="py-16 text-center border-2 border-white/10 bg-white/5">
      <div className="max-w-md mx-auto px-4">
        <div className="text-4xl mb-4">⚠</div>
        <h3 className="text-xl font-bold mb-2">Error</h3>
        <p className="text-white/70 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition-colors min-h-[44px]"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
