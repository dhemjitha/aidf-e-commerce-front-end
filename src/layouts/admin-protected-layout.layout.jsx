import { useUser } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";

const AdminProtectedLayout = () => {
    const { user, isLoaded } = useUser();

    // If the user data is still loading, show a loading state
    if (!isLoaded) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    // Check if user exists and has an admin role
    if (!user || user.publicMetadata?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminProtectedLayout;
