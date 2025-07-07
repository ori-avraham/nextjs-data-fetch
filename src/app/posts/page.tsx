// SSG Page
import type { Post } from "@/types";
import Link from "next/link";

async function getPosts() {
  const res = await fetch("http://localhost:5000/posts", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json() as Promise<Post[]>;
}

export default async function PostsPage() {
  const posts = await getPosts();
  const generatedAt = new Date().toLocaleString();

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="hover:underline">
          ← Back to Home
        </Link>
      </div>

      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Post Page</h1>
        <h2 className="text-xl font-medium mb-4">
          Static Site Generation (SSG)
        </h2>
        <div className="bg-black text-white p-6 rounded">
          <h2 className="text-lg font-bold mb-2">How it works:</h2>
          <p className="text-sm mb-4">
            Data is fetched at build time and the page is pre-rendered as static
            HTML. Perfect for content that doesn&apos;t change frequently.
          </p>
          <div className="text-xs font-mono bg-gray-800 p-2 rounded">
            {'fetch(url, { cache: "force-cache" })'}
          </div>
        </div>
      </header>

      <div className="mb-8 p-4 bg-gray-100 border-l-4 border-black">
        <p className="text-sm">
          <strong>Page generated at:</strong> {generatedAt}
        </p>
        <p className="text-xs text-gray-600 mt-1">Generated at build time.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Blog Posts</h2>
        <p className="text-gray-600 text-sm mb-6">
          These posts were fetched during the build process and are served as
          static HTML. This is ideal for blogs, documentation, and other content
          that doesn&apos;t change often.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.slice(0, 10).map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <article className="border-2 border-gray-200 p-6 hover:border-black transition-colors">
              <h3 className="text-lg font-bold mb-2 capitalize">
                {post.title}
              </h3>
              <p className="text-gray-700 text-sm mb-4 truncate">
                {post.body.split(" ").slice(0, 15).join(" ")}...
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Post ID: {post.id}</span>
                <span>User ID: {post.userId}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 border-l-4 border-black">
        <h3 className="font-bold mb-2">When to use SSG:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Blog posts and articles</li>
          <li>• Product pages that don&apos;t change frequently</li>
          <li>• Documentation sites</li>
          <li>• Marketing pages</li>
          <li>• Any content that can be pre-rendered</li>
        </ul>
      </div>
    </>
  );
}
