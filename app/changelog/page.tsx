import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog - The Plug Dude',
  description: 'See what\'s new and what we\'ve been working on.',
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">Changelog</h1>
          <p className="text-xl text-white/80">
            Keep track of all updates, new features, and improvements to The Plug Dude.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {/* December 8, 2025 */}
          <div className="border-l-2 border-white/20 pl-8 pb-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">December 8, 2025</h2>
              <p className="text-white/60 text-sm">Initial Launch</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span>✨</span> New Features
                </h3>
                <ul className="list-disc list-inside space-y-1 text-white/80 ml-6">
                  <li>Launched The Plug Dude website</li>
                  <li>Added About page with our story and mission</li>
                  <li>Created Privacy Policy and Terms of Service</li>
                  <li>Implemented header navigation with logo</li>
                  <li>Added footer with copyright information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span>🔧</span> Improvements
                </h3>
                <ul className="list-disc list-inside space-y-1 text-white/80 ml-6">
                  <li>Optimized logo loading with Next.js Image component</li>
                  <li>Set up favicon for browser tabs</li>
                  <li>Responsive design for mobile and desktop</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Placeholder for future updates */}
          <div className="border border-white/10 p-8 text-center">
            <p className="text-white/60">
              More updates coming soon! Check back regularly to see what's new.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
