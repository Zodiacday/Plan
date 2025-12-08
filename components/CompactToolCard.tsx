'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Tool } from '@/lib/types';

interface CompactToolCardProps {
  tool: Tool;
}

export default function CompactToolCard({ tool }: CompactToolCardProps) {
  return (
    <Link 
      href={`/tool/${tool.slug}`}
      className="group block relative px-3 py-3 hover:bg-white/5 transition-colors"
    >
      {/* L-shaped corner border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      
      <div className="flex items-center gap-3 pr-3">
        {tool.logo_url && (
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image 
              src={tool.logo_url} 
              alt={tool.name}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm group-hover:text-gray-300 transition-colors truncate">
            {tool.name}
          </h3>
          <p className="text-xs text-white/70 truncate">
            {tool.description}
          </p>
        </div>
        {tool.pricing_type && (
          <span className="text-xs text-white/70 flex-shrink-0">
            {tool.pricing_type === 'freemium' ? 'Free' : tool.pricing_type === 'open-source' ? 'Open Source' : tool.pricing_type.charAt(0).toUpperCase() + tool.pricing_type.slice(1)}
          </span>
        )}
      </div>
    </Link>
  );
}
