export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 animate-pulse rounded-lg bg-blue-600" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200 mx-auto" />
          <div className="h-3 w-24 animate-pulse rounded bg-gray-100 mx-auto" />
        </div>
      </div>
    </div>
  );
}
