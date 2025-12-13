import { Tool } from '@/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import VoteButtons from '@/components/VoteButtons';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

async function getTool(slug: string): Promise<Tool | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) {
    console.error('Error fetching tool:', error);
    return null;
  }
  return data || null;
}

async function getCategory(categoryId: string) {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();
  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }
  return data || null;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - The Plug Dude`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    notFound();
  }

  const category = tool.category_id ? await getCategory(tool.category_id) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      {category && (
        <Link 
          href={`/categories/${category.slug}`}
          className="inline-block text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors px-3 py-2 mb-8"
        >
          ← {category.name}
        </Link>
      )}

      {/* Header */}
      <div className="mb-8 pb-8 border-b border-white/10">
        <div className="flex items-start gap-6 mb-6">
          {tool.logo_url && (
            <div className="w-20 h-20 relative flex-shrink-0">
              <Image 
                src={tool.logo_url} 
                alt={tool.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{tool.name}</h1>
            <p className="text-white/70 text-lg mb-4">{tool.description}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <VoteButtons 
                toolId={tool.id} 
                initialUpvotes={tool.upvotes} 
                initialDownvotes={tool.downvotes} 
              />
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block group px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition-colors"
              >
                Visit Website →
                <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-0 bottom-0 right-0 w-px bg-black/10 group-hover:bg-black/30 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms */}
      {tool.platform && tool.platform.length > 0 && (
        <div className="mb-8 pb-8 border-b border-white/10">
          <h2 className="text-2xl font-bold mb-4">Available On</h2>
          <div className="flex gap-3 flex-wrap">
            {tool.platform.map((platform, idx) => (
              <span key={idx} className="px-3 py-1.5 text-sm border border-white/10 text-white/70">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pros & Cons */}
      {((tool.pros && tool.pros.length > 0) || (tool.cons && tool.cons.length > 0)) && (
        <div className="mb-8 pb-8 border-b border-white/10">
          <div className="grid md:grid-cols-2 gap-12">
            {tool.pros && tool.pros.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Pros</h2>
                <ul className="space-y-3">
                  {tool.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-white mt-1">+</span>
                      <span className="text-white/70">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tool.cons && tool.cons.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cons</h2>
                <ul className="space-y-3">
                  {tool.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-white mt-1">−</span>
                      <span className="text-white/70">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Long Description */}
      {tool.long_description && (
        <div className="mb-8 pb-8 border-b border-white/10">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-white/70 text-lg leading-relaxed">{tool.long_description}</p>
        </div>
      )}

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div className="mb-8 pb-8 border-b border-white/10">
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex gap-3 flex-wrap">
            {tool.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1.5 text-sm bg-white/5 text-white/70">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Alternatives */}
      {tool.alternatives && tool.alternatives.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Alternatives</h2>
          <div className="flex gap-3 flex-wrap">
            {tool.alternatives.map((alt, idx) => (
              <span key={idx} className="px-3 py-1.5 text-sm border border-white/10 text-white/70">
                {alt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
