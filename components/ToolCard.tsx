import Link from 'next/link';
import Image from 'next/image';
import { Tool } from '@/lib/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link 
      href={`/tool/${tool.slug}`}
      className="group block relative pb-6 md:pb-8 pr-4 md:pr-6 hover:bg-white/5 transition-colors no-underline min-h-[80px]"
    >
      {/* L-shaped corner border: bottom + right */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors" />
      
      <div className="pr-4 md:pr-6 pb-6 md:pb-8">
        <div className="flex items-start gap-4 md:gap-6">
          {tool.logo_url && (
            <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0">
              <Image 
                src={tool.logo_url} 
                alt={tool.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3 group-hover:text-gray-300 transition-colors">{tool.name}</h3>
            <p className="text-white/70 text-sm md:text-base mb-3 md:mb-4 leading-relaxed">{tool.description}</p>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-white/70">
              {tool.total_votes > 0 && (
                <span>↑ {tool.upvotes} ↓ {tool.downvotes}</span>
              )}
              {tool.pricing_type && (
                <span>{tool.pricing_type === 'freemium' ? 'Free' : tool.pricing_type === 'open-source' ? 'Open Source' : tool.pricing_type.charAt(0).toUpperCase() + tool.pricing_type.slice(1)}</span>
              )}
              {tool.platform && tool.platform.length > 0 && (
                <span>{tool.platform.slice(0, 3).join(', ')}{tool.platform.length > 3 && ` +${tool.platform.length - 3}`}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
