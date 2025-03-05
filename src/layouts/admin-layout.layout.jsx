import Navigation from "@/components/Navigation"
import { Outlet } from "react-router"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

const AdminLayout = () => {
    return (
        <main>
            <Navigation />
            <div className="flex justify-end gap-x-4 items-center py-4 px-6 bg-white shadow-sm">
                <Link
                    to="/admin/products"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                    Active Products
                </Link>
                <Button asChild>
                    <Link
                        to="/admin/products/create"
                        className="text-sm font-medium"
                    >
                        Create A Product
                    </Link>
                </Button>
            </div>
            <Outlet />
        </main>
    )
}

export default AdminLayout