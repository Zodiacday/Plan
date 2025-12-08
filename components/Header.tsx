'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/10">
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="The Plug Dude" 
              width={40} 
              height={40}
              priority
            />
            <span className="text-2xl font-bold">The Plug Dude</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-10 items-center">
            <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/categories" className="text-sm text-white/70 hover:text-white transition-colors">
              Categories
            </Link>
            <Link 
              href="/submit" 
              className="border-2 border-white px-5 py-2 text-sm font-bold hover:bg-white hover:text-black transition-colors"
            >
              Submit
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-base text-white hover:text-white/70 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="text-base text-white hover:text-white/70 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/submit" 
                className="border-2 border-white px-5 py-3 text-base font-bold hover:bg-white hover:text-black transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Submit
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
