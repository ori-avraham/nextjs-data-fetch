export default function ProductsLoading() {
  return (
    <div className="text-center py-12">
      <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading products...</p>
    </div>
  );
}
