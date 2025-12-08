'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTool() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    isPaid: false,
    isFeatured: false,
    tags: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        if (!response.ok) {
          router.push('/padmin');
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push('/padmin');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // API call to save tool (placeholder)
      console.log('Save tool:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Tool added successfully!');
      router.push('/padmin/tools');
    } catch (error) {
      alert('Error adding tool. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/padmin/tools" className="text-white/70 hover:text-white mb-2 inline-block">
            ← Back to Tools
          </Link>
          <h1 className="text-4xl font-bold">Add New Tool</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Tool Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
              placeholder="e.g., Figma"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
              placeholder="Describe what this tool does and why it's useful..."
              required
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-semibold mb-2">
              Website URL *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
              placeholder="https://example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
              required
            >
              <option value="">Select a category</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="productivity">Productivity</option>
              <option value="ai">AI & ML</option>
              <option value="marketing">Marketing</option>
              <option value="writing">Writing</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-semibold mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white focus:outline-none transition-colors"
              placeholder="e.g., design, prototyping, collaboration"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPaid"
                checked={formData.isPaid}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-sm">Has paid tier</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-sm">Mark as featured</span>
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="bg-white text-black px-8 py-3 font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Adding Tool...' : 'Add Tool'}
            </button>
            <Link
              href="/padmin/tools"
              className="border border-white/30 px-8 py-3 font-bold hover:bg-white hover:text-black transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
