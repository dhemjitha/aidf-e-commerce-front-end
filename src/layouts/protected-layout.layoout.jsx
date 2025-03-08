import { useUser } from "@clerk/clerk-react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

const ProtectedLayout = () => {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />
    }

    return (
        <Outlet />
    );
};

export default ProtectedLayout;