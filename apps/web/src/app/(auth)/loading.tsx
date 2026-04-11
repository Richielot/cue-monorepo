export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-6 rounded-lg bg-white p-6">
          <div className="space-y-2">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="space-y-4">
            <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
            <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
            <div className="h-10 animate-pulse rounded-lg bg-blue-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
