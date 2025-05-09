import { Skeleton } from "@/components/ui/skeleton";

const AccountPageSkeleton = () => {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Personal Information
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48 rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
            <Skeleton className="h-6 w-64 rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPageSkeleton; 