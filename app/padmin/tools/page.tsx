'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  isPaid: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function ToolsManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        if (!response.ok) {
          router.push('/padmin');
        } else {
          setLoading(false);
          // Load tools (placeholder for now)
          loadTools();
        }
      } catch (error) {
        router.push('/padmin');
      }
    };

    checkAuth();
  }, [router]);

  const loadTools = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setTools([]);
      return;
    }
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading tools:', error);
      setTools([]);
      return;
    }
    setTools(data || []);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      // API call to delete tool
      console.log('Delete tool:', id);
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/70">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/padmin/dashboard" className="text-white/70 hover:text-white mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold">Manage Tools</h1>
          </div>
          <Link
            href="/padmin/tools/new"
            className="bg-white text-black px-6 py-3 font-bold hover:bg-white/90 transition-colors"
          >
            + Add New Tool
          </Link>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Search Tools</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="productivity">Productivity</option>
              <option value="ai">AI & ML</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Tools List */}
        <div className="border border-white/10">
          <div className="bg-white/5 px-6 py-4 font-semibold grid grid-cols-12 gap-4">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {filteredTools.length === 0 ? (
            <div className="px-6 py-12 text-center text-white/70">
              <p className="text-lg mb-2">No tools yet</p>
              <p className="text-sm">Start by adding your first tool to the directory</p>
              <Link
                href="/padmin/tools/new"
                className="inline-block mt-4 border-2 border-white px-6 py-2 font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Add Your First Tool
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors">
                  <div className="col-span-4">
                    <p className="font-semibold">{tool.name}</p>
                    <p className="text-sm text-white/60 truncate">{tool.description}</p>
                  </div>
                  <div className="col-span-3 text-white/70">{tool.category}</div>
                  <div className="col-span-2">
                    <span className={`text-xs px-2 py-1 border ${tool.isFeatured ? 'border-green-500 text-green-500' : 'border-white/30 text-white/70'}`}>
                      {tool.isFeatured ? 'Featured' : 'Published'}
                    </span>
                  </div>
                  <div className="col-span-3 flex gap-2 justify-end">
                    <Link
                      href={`/padmin/tools/${tool.id}/edit`}
                      className="border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(tool.id)}
                      className="border border-red-500/50 text-red-500 px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
