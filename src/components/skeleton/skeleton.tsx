export function Skeleton() {
  return (
    <div role="status" className="w-full h-full animate-pulse">
      <div className="w-full h-full bg-gray-200 mb-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
