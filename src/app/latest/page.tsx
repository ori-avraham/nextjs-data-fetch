import { Post, Task } from "@/types";
import Link from "next/link";
import { Suspense } from "react";

export const experimental_ppr = true;

// Static data - fetched at build time
async function getStaticPosts() {
  const res = await fetch("http://localhost:5000/posts?_limit=5", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json() as Promise<Post[]>;
}

// Dynamic data - fetched at request time
async function getRecentTasks() {
  // Simulate dynamic data that changes per request
  const res = await fetch(
    "http://localhost:5000/tasks?_sort=id&_order=desc&_limit=5",
    {
      cache: "no-store",
      headers: { "X-Delay": "4000" },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json() as Promise<Task[]>;
}

async function RecentTasks() {
  const tasks = await getRecentTasks();
  const currentTime = new Date().toLocaleString();

  return (
    <div className="border-2 border-black p-6">
      <h3 className="text-lg font-bold mb-4 text-blue-700">
        Recent User Activity (Dynamic)
      </h3>
      <div className="mb-4 p-3 bg-blue-50 text-xs">
        <strong>Fetched at:</strong> {currentTime} (This updates on each
        request)
      </div>
      <div className="space-y-4">
        <h4 className="font-bold">Recent Tasks</h4>
        {tasks.map((task) => (
          <div key={task.id} className="border border-gray-200 p-4">
            <h5 className="font-bold text-sm mb-2 capitalize">{task.title}</h5>
            <p className="text-xs text-gray-600 mb-1">
              <strong>Status:</strong>{" "}
              <span
                className={`inline-block px-2 py-1 rounded text-white text-xs ${
                  task.completed ? "bg-gray-500" : "bg-black"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </p>
            <p className="text-xs text-gray-600">
              <strong>User ID:</strong> {task.userId} &nbsp;|&nbsp;
              <strong>Task ID:</strong> {task.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading component for the dynamic section
function ActivitySkeleton() {
  return (
    <div className="border-2 border-gray-200 p-6 animate-pulse">
      <h3 className="text-lg font-bold mb-4 text-gray-400">
        Recent User Activity (Loading...)
      </h3>
      <div className="mb-4 p-3 bg-gray-100 text-xs text-gray-400">
        Loading dynamic content...
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border border-gray-200 p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
            <div className="h-3 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const buildTime = new Date().toLocaleString();

export default async function LatestPage() {
  // Static content - pre-rendered at build time
  const posts = await getStaticPosts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="text-black hover:underline">
            ← Back to Home
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="text-3xl font-bold text-black mb-4">
            Partial Prerendering (PPR)
          </h1>
          <div className="bg-black text-white p-6 rounded">
            <h2 className="text-lg font-bold mb-2">How it works:</h2>
            <p className="text-sm mb-4">
              PPR combines static and dynamic rendering in a single page. The
              static shell is pre-rendered at build time, while dynamic content
              is streamed in at request time using Suspense boundaries.
            </p>
            <div className="text-xs font-mono bg-gray-800 p-2 rounded">
              {"<Suspense fallback={<Loading />}><DynamicContent /></Suspense>"}
            </div>
          </div>
        </header>

        <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-sm font-bold text-yellow-800 mb-2">
            ⚠️ Experimental Feature
          </p>
          <p className="text-xs text-yellow-700">
            PPR is currently an experimental feature in Next.js. Enable it in
            next.config.js with experimental.ppr = true
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Static Content - Pre-rendered */}
          <div className="border-2 border-green-500 p-6">
            <h3 className="text-lg font-bold mb-4 text-green-700">
              Static Content (Pre-rendered)
            </h3>
            <div className="mb-4 p-3 bg-green-50 text-xs">
              <strong>Built at:</strong> {buildTime} (This is static and
              doesn`&apos;t change)
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Popular Blog Posts</h4>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border space-y-2 border-gray-200 p-4"
                >
                  <h5 className="font-bold text-sm capitalize">{post.title}</h5>
                  <p className="text-xs text-gray-600">
                    {post.body.split(" ").slice(0, 15).join(" ")}...
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>User ID:</strong> {post.userId} &nbsp;|&nbsp;
                    <strong>Post ID:</strong> {post.id}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Content - Streamed */}
          <Suspense fallback={<ActivitySkeleton />}>
            <RecentTasks />
          </Suspense>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-50 border-l-4 border-black">
            <h3 className="font-bold mb-2">Benefits of PPR:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Fast initial page load (static shell)</li>
              <li>• SEO-friendly pre-rendered content</li>
              <li>• Dynamic personalization without full SSR cost</li>
              <li>• Improved Core Web Vitals</li>
              <li>• Best of both static and dynamic worlds</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 border-l-4 border-black">
            <h3 className="font-bold mb-2">When to use PPR:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• E-commerce product pages</li>
              <li>• Social media feeds</li>
              <li>• News sites with personalized sections</li>
              <li>• Dashboards with mixed static/dynamic content</li>
              <li>• Any page with both cacheable and personal data</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500">
          <h3 className="font-bold mb-2 text-blue-800">How to Enable PPR:</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>1. Add to your next.config.js:</p>
            <div className="bg-blue-100 p-3 rounded font-mono text-xs">
              {"module.exports = { experimental: { ppr: true } }"}
            </div>
            <p>2. Use Suspense boundaries around dynamic content</p>
            <p>3. Mix static (cached) and dynamic (no-store) data fetching</p>
          </div>
        </div>
      </div>
    </div>
  );
}
