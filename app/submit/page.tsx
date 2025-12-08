'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitToolPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      website_url: formData.get('website_url'),
      description: formData.get('description'),
      category_suggested: formData.get('category'),
      submitter_name: formData.get('submitter_name'),
      submitter_email: formData.get('submitter_email'),
      platform: formData.getAll('platform'),
      pricing_type: formData.get('pricing_type'),
      tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      const response = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/'), 3000);
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to submit tool');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background text-text-primary flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
          <p className="text-text-secondary mb-2">Your tool has been submitted for review.</p>
          <p className="text-sm text-text-secondary">We'll review it and add it to the directory soon.</p>
          <p className="text-xs text-text-secondary mt-4">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Submit a Tool</h1>
          <p className="text-text-secondary">
            Know a great free tool? Share it with the community! We'll review and add it to the directory.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tool Information */}
          <div className="bg-background-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Tool Information</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Tool Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
                placeholder="e.g., Notion"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="website_url"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
                placeholder="Brief description of what the tool does..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                name="category"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
                placeholder="e.g., Productivity, Design, Development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pricing Type</label>
              <select
                name="pricing_type"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
              >
                <option value="">Select pricing</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="open-source">Open Source</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Platforms (select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['web', 'mac', 'windows', 'linux', 'ios', 'android'].map(platform => (
                  <label key={platform} className="flex items-center gap-2 p-2 bg-background rounded cursor-pointer hover:bg-background-secondary">
                    <input type="checkbox" name="platform" value={platform} className="rounded" />
                    <span className="text-sm capitalize">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
                placeholder="productivity, collaboration, free"
              />
            </div>
          </div>

          {/* Submitter Information */}
          <div className="bg-background-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Information (Optional)</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                name="submitter_name"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Email</label>
              <input
                type="email"
                name="submitter_email"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-text-secondary"
                placeholder="john@example.com"
              />
              <p className="text-xs text-text-secondary mt-1">
                We'll only use this to notify you when your submission is reviewed
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-text-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Tool'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-border rounded-lg hover:bg-background-card transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
