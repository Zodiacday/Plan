'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  toolCount: number;
}

export default function CategoriesManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        if (!response.ok) {
          router.push('/padmin');
        } else {
          setLoading(false);
          loadCategories();
        }
      } catch (error) {
        router.push('/padmin');
      }
    };

    checkAuth();
  }, [router]);

  const loadCategories = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setCategories([]);
      return;
    }
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
      return;
    }
    setCategories(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // API call to save category (placeholder)
    console.log('Save category:', formData);
    
    // Reset form
    setFormData({ name: '', slug: '', description: '', icon: '' });
    setShowAddForm(false);
    
    alert('Category added successfully!');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      console.log('Delete category:', id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name
      ...(name === 'name' && { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
    }));
  };

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
            <h1 className="text-4xl font-bold">Manage Categories</h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white text-black px-6 py-3 font-bold hover:bg-white/90 transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add Category'}
          </button>
        </div>

        {/* Add Category Form */}
        {showAddForm && (
          <div className="border border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
                    placeholder="e.g., Design Tools"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
                    placeholder="design-tools"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
                  placeholder="Brief description of this category..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Icon (emoji or text)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
                  placeholder="🎨"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 font-bold hover:bg-white/90 transition-colors"
              >
                Add Category
              </button>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="border border-white/10">
          <div className="bg-white/5 px-6 py-4 font-semibold grid grid-cols-12 gap-4">
            <div className="col-span-1">Icon</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Slug</div>
            <div className="col-span-2">Tools</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {categories.length === 0 ? (
            <div className="px-6 py-12 text-center text-white/70">
              <p className="text-lg mb-2">No categories yet</p>
              <p className="text-sm">Start by adding your first category</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-block mt-4 border-2 border-white px-6 py-2 font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Add Your First Category
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {categories.map((category) => (
                <div key={category.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors">
                  <div className="col-span-1 text-2xl">{category.icon}</div>
                  <div className="col-span-3">
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-white/60">{category.description}</p>
                  </div>
                  <div className="col-span-3 text-white/70 font-mono text-sm">{category.slug}</div>
                  <div className="col-span-2 text-white/70">{category.toolCount} tools</div>
                  <div className="col-span-3 flex gap-2 justify-end">
                    <button className="border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
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
