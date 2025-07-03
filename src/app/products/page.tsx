import Link from "next/link";

export interface Product {
  id: number;
  product: string;
  category: string;
  price: number;
  description: string;
  color: string;
  brand: string;
  stock: number;
  images: {
    src: string;
  }[];
}

// ISR - fetches products with revalidation
async function getProducts() {
  const res = await fetch("http://localhost:5000/products", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json() as Promise<Product[]>;
}

export default async function ISRPage() {
  const products = await getProducts();
  const generatedAt = new Date().toLocaleString();

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-black hover:underline">
          ← Back to Home
        </Link>
      </div>

      <header className="mb-12">
        <h1 className="text-3xl font-bold text-black mb-4">
          Incremental Static Regeneration (ISR)
        </h1>
        <div className="bg-black text-white p-6 rounded">
          <h2 className="text-lg font-bold mb-2">How it works:</h2>
          <p className="text-sm mb-4">
            Pages are statically generated at build time but can be regenerated
            in the background when new requests come in after the revalidation
            period.
          </p>
          <div className="text-xs font-mono bg-gray-800 p-2 rounded">
            {"fetch(url, { next: { revalidate: 60 } })"}
          </div>
        </div>
      </header>

      <div className="mb-8 p-4 bg-gray-100 border-l-4 border-black">
        <p className="text-sm">
          <strong>Page generated at:</strong> {generatedAt}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Refresh after a minute to see the timestamp update.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Product Catalog (ISR with 60s Revalidation)
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          This product list is statically generated for fast loading, and
          revalidates automatically in the background.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.slice(0, 12).map((product) => (
          <div
            key={product.id}
            className="border-2 border-gray-200 hover:border-black transition-colors"
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <img
                src={product.images?.[0]?.src || "/placeholder.svg"}
                alt={product.product}
                className="w-full h-full object-cover"
              />
              {/* <Image
                  src={product.images?.[0]?.src}
                  alt={product.product}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                /> */}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1 capitalize line-clamp-2">
                {product.product}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
              <p className="text-sm font-semibold text-black">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 border-l-4 border-black">
        <h3 className="font-bold mb-2">When to use ISR:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• E-commerce product catalogs</li>
          <li>• News websites and blogs</li>
          <li>• Content that updates periodically</li>
          <li>• Large sites where rebuilding everything is expensive</li>
          <li>• Content that needs to be fresh but not real-time</li>
        </ul>
      </div>
    </>
  );
}
