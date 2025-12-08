'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
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

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/padmin');
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
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/70">Manage your tools and categories</p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-white/30 px-6 py-2 text-sm font-semibold hover:bg-white hover:text-black transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="border border-white/10 p-6">
            <h3 className="text-white/70 text-sm mb-2">Total Tools</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="border border-white/10 p-6">
            <h3 className="text-white/70 text-sm mb-2">Categories</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="border border-white/10 p-6">
            <h3 className="text-white/70 text-sm mb-2">Pending</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="border border-white/10 p-6">
            <h3 className="text-white/70 text-sm mb-2">Published</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/padmin/tools"
            className="border-2 border-white/10 p-8 hover:border-white transition-colors group"
          >
            <div className="text-4xl mb-4">🔧</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-white/90">Manage Tools</h2>
            <p className="text-white/70">Add, edit, or remove tools from your directory</p>
          </Link>

          <Link
            href="/padmin/categories"
            className="border-2 border-white/10 p-8 hover:border-white transition-colors group"
          >
            <div className="text-4xl mb-4">📁</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-white/90">Categories</h2>
            <p className="text-white/70">Organize and manage tool categories</p>
          </Link>

          <Link
            href="/padmin/submissions"
            className="border-2 border-white/10 p-8 hover:border-white transition-colors group"
          >
            <div className="text-4xl mb-4">📥</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-white/90">Submissions</h2>
            <p className="text-white/70">Review user-submitted tools</p>
          </Link>

          <Link
            href="/padmin/tools/new"
            className="border-2 border-white/10 p-8 hover:border-white transition-colors group"
          >
            <div className="text-4xl mb-4">➕</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-white/90">Add New Tool</h2>
            <p className="text-white/70">Quickly add a new tool to the directory</p>
          </Link>

          <Link
            href="/padmin/analytics"
            className="border-2 border-white/10 p-8 hover:border-white transition-colors group"
          >
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-white/90">Analytics</h2>
            <p className="text-white/70">View site statistics and insights</p>
          </Link>

          <Link
            href="/"
            className="border-2 border-white/10 p-8 hover:border-white transition-colors group"
          >
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-white/90">View Site</h2>
            <p className="text-white/70">Go to the public website</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
