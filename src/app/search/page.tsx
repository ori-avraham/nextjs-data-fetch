"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const url = "http://localhost:5000/posts";

export default function ClientSidePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-black hover:underline">
          ← Back to Home
        </Link>
      </div>

      <header className="mb-12">
        <h1 className="text-3xl font-bold text-black mb-4">
          Client-Side Fetching
        </h1>
        <div className="bg-black text-white p-6 rounded">
          <h2 className="text-lg font-bold mb-2">How it works:</h2>
          <p className="text-sm mb-4">
            Data is fetched in the browser after the initial page load using
            useEffect. Perfect for interactive features like search, filtering,
            and user-triggered actions.
          </p>
          <div className="text-xs font-mono bg-gray-800 p-2 rounded">
            {"useEffect(() => { fetch(url) }, [])"}
          </div>
        </div>
      </header>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Interactive Post Search</h2>
        <p className="text-gray-600 text-sm mb-6">
          This search functionality fetches data client-side and filters results
          in real-time. The initial page loads quickly, then JavaScript fetches
          and displays the content.
        </p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 focus:border-black outline-none text-black"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">
          <p className="font-semibold text-lg">{error}</p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-gray-600">
            Showing {filteredPosts.length} of {posts.length} posts
            {searchTerm && ` for "${searchTerm}"`}
          </div>

          <div className="grid gap-6">
            {filteredPosts.slice(0, 10).map((post) => (
              <article
                key={post.id}
                className="border-2 border-gray-200 p-6 hover:border-black transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 capitalize">
                  {post.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{post.body}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Post ID: {post.id}</span>
                  <span>User ID: {post.userId}</span>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No posts found matching &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </>
      )}

      <div className="mt-12 p-6 bg-gray-50 border-l-4 border-black">
        <h3 className="font-bold mb-2">When to use Client-Side Fetching:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Search and filtering functionality</li>
          <li>• User interactions and dynamic content</li>
          <li>• Data that doesn&apos;t affect SEO</li>
          <li>• Progressive enhancement features</li>
          <li>• Real-time updates and live data</li>
        </ul>
      </div>
    </>
  );
}
