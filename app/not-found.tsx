import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold mb-8">404</h1>
        
        {/* Message */}
        <h2 className="text-3xl font-bold mb-4">Oops! This plug got disconnected</h2>
        <p className="text-xl text-white/70 mb-12">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="border-2 border-white px-8 py-3 font-bold hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
          >
            Back to Home
          </Link>
          <Link 
            href="/categories"
            className="border-2 border-white/30 px-8 py-3 font-bold hover:border-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
