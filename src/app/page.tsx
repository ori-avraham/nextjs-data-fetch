import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-black mb-4">
          Next.js Data Fetching Demo
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A comprehensive demonstration of various data fetching strategies in
          Next.js, showcasing SSG, SSR, Client-side fetching, and ISR with
          practical examples.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Link href="/posts" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">Posts Page</h2>
            <h3 className="text-xl font-medium mb-4">
              Static Site Generation (SSG)
            </h3>
            <p className="text-sm mb-4 opacity-75">
              Data fetched at build time using getStaticProps
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: Blog posts, documentation
            </div>
          </div>
        </Link>

        <Link href="/tasks" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">Tasks Page</h2>
            <h3 className="text-xl font-medium mb-4">
              Server-Side Rendering (SSR)
            </h3>
            <p className="text-sm mb-4 opacity-75">
              Data fetched on each request on the server
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: User dashboards, real-time data
            </div>
          </div>
        </Link>

        <Link href="/tasks-pagination" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">
              Tasks Page With Pagination
            </h2>
            <h3 className="text-xl font-medium mb-4">
              Server-Side Rendering (SSR)
            </h3>
            <p className="text-sm mb-4 opacity-75">
              Data fetched on each request on the server
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: User dashboards, real-time data
            </div>
          </div>
        </Link>

        <Link href="/search" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">Search Page</h2>
            <h3 className="text-xl font-medium mb-4">Client-Side Fetching</h3>
            <p className="text-sm mb-4 opacity-75">
              Data fetched in the browser using useEffect
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: Search, user interactions
            </div>
          </div>
        </Link>

        <Link href="/products" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">Products Page</h2>
            <h3 className="text-xl font-medium mb-4">
              Incremental Static Regeneration
            </h3>
            <p className="text-sm mb-4 opacity-75">
              Static pages that update at runtime
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: Product catalogs, news feeds
            </div>
          </div>
        </Link>

        <Link href="/latest" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">
              Latest Tasks & Popular Posts
            </h2>
            <h3 className="text-xl font-medium mb-4">
              Partial Prerendering (PPR)
            </h3>
            <p className="text-sm mb-4 opacity-75">
              Static shell with dynamic content holes
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: E-commerce, personalized content
            </div>
          </div>
        </Link>

        <Link href="/streaming" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">Streaming</h2>
            <h3 className="text-xl font-medium mb-4">Using Suspense</h3>
            <p className="text-sm mb-4 opacity-75">
              Progressive page rendering
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: Large datasets, slow APIs
            </div>
          </div>
        </Link>

        <Link href="/messages" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">
              Message Dashboard (Live)
            </h2>
            <h3 className="text-xl font-medium mb-4">
              Realtime with WebSockets
            </h3>
            <p className="text-sm mb-4 opacity-75">
              Live updates pushed from the server
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: Dashboards, notifications
            </div>
          </div>
        </Link>

        <Link href="/messages" className="group">
          <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">Tasks Management</h2>
            <h3 className="text-xl font-medium mb-4">Server Actions</h3>
            <p className="text-sm mb-4 opacity-75">
              Server-side mutations without API routes
            </p>
            <div className="text-xs font-mono bg-gray-100 group-hover:bg-gray-800 p-2 rounded">
              Use case: Dashboards, Content Management Systems.
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-16 p-8 bg-gray-50 border-l-4 border-black">
        <h3 className="text-xl font-bold mb-4">About This Demo</h3>
        <p className="text-gray-700 mb-4">
          This application demonstrates different data fetching strategies in
          Next.js using the JSONPlaceholder API. Each section shows when and how
          to use specific data fetching methods with practical examples.
        </p>
        <div className="text-sm text-gray-600">
          <strong>API Used:</strong> JSONPlaceholder (https://localhost:5000/)
        </div>
      </div>
    </>
  );
}
