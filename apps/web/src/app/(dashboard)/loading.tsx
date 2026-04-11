export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar skeleton */}
      <aside className="hidden w-64 border-r border-gray-200/80 bg-white lg:block">
        <div className="flex h-16 items-center gap-2.5 px-6">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="space-y-4 px-3 pt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </aside>

      {/* Main content skeleton */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 h-16 border-b border-gray-200/80 bg-white/80" />
        <main className="flex-1 space-y-6 px-4 py-6 lg:px-8 lg:py-8">
          <div className="h-12 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
