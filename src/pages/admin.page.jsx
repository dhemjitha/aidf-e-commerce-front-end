import { useUser } from "@clerk/clerk-react";

const AdminPage = () => {

  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="relative min-h-screen">
      <div className="p-6">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        <h2 className="text-xl md:text-2xl font-semibold mt-2">
          Hi, {user?.fullName ?? "there"} 👋
        </h2>
        <p className="text-gray-600 mt-2">
          Welcome to the admin dashboard. Manage your products and settings here.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;