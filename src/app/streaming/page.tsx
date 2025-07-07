import { Post } from "@/types";
import Link from "next/link";
import { Suspense } from "react";

// Simulate slow API calls with different delays
async function getDataWithDelay(delay: number): Promise<Post[]> {
  const res = await fetch(`http://localhost:5000/posts?_limit=3`, {
    headers: { "X-Delay": String(delay) },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${name}`);

  return res.json();
}

async function SlowComponent({
  delay,
  name,
  color,
}: {
  delay: number;
  name: string;
  color: string;
}) {
  const posts = await getDataWithDelay(delay);

  return (
    <div className="p-6 rounded border-2" style={{ borderColor: color }}>
      <h3 className="text-lg font-bold mb-4" style={{ color }}>
        {name}
      </h3>
      <div
        className="mb-4 p-3 text-xs rounded"
        style={{ backgroundColor: `${color}20`, color }}
      >
        <strong>Loaded after:</strong> {delay}ms delay
      </div>
      <div className="space-y-3">
        {posts.map((item) => (
          <div key={item.id} className="border border-gray-200 p-3 rounded">
            <h4 className="font-bold text-sm mb-1 capitalize">{item.title}</h4>
            <p className="text-xs text-gray-600">{item.body.slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="p-6 rounded border-2 animate-pulse"
      style={{ borderColor: `${color}55` }}
    >
      <h3 className="text-lg font-bold mb-4" style={{ color }}>
        {name} (Loading...)
      </h3>
      <div
        className="mb-4 p-3 text-xs rounded"
        style={{ backgroundColor: `${color}20`, color }}
      >
        Fetching data...
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 p-3 rounded">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StreamingPage() {
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
            Streaming & Suspense
          </h1>
          <div className="bg-black text-white p-6 rounded">
            <h2 className="text-lg font-bold mb-2">How it works:</h2>
            <p className="text-sm mb-4">
              React 18&apos;s Suspense enables streaming server-side rendering.
              Components can load progressively, showing content as soon as it&apos;s
              ready instead of waiting for everything to finish.
            </p>
            <div className="text-xs font-mono bg-gray-800 p-2 rounded">
              {"<Suspense fallback={<Loading />}><AsyncComponent /></Suspense>"}
            </div>
          </div>
        </header>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Progressive Loading Demo</h2>
          <p className="text-gray-600 text-sm mb-6">
            Watch as different sections load at different speeds. Fast content
            appears immediately while slower content streams in progressively.
            This prevents blocking the entire page.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Suspense
            fallback={<LoadingSkeleton name="Fast Content" color="#16a34a" />}
          >
            <SlowComponent delay={500} name="Fast Content" color="#16a34a" />
          </Suspense>

          <Suspense
            fallback={<LoadingSkeleton name="Medium Content" color="#ca8a04" />}
          >
            <SlowComponent delay={2000} name="Medium Content" color="#ca8a04" />
          </Suspense>

          <Suspense
            fallback={<LoadingSkeleton name="Slow Content" color="#dc2626" />}
          >
            <SlowComponent delay={10000} name="Slow Content" color="#dc2626" />
          </Suspense>
        </div>

        <div className="mt-12 p-6 bg-gray-50 border-l-4 border-black">
          <h3 className="font-bold mb-2">Benefits of Streaming:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Faster perceived performance</li>
            <li>• Better user experience with progressive loading</li>
            <li>• Prevents slow components from blocking fast ones</li>
            <li>• Improved Core Web Vitals (LCP, FID)</li>
            <li>• Better SEO with faster initial content</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
