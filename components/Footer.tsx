import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-white transition-colors">
                    Submit Tool
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="hover:text-white transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">The Plug Dude</h3>
              <p className="text-white/70 text-sm">
                Discover the best free tools on the internet, curated for you.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/70 text-sm border-t border-white/10 pt-8">
            <p>&copy; {new Date().getFullYear()} The Plug Dude. Free tools directory.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
