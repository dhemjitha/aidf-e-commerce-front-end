import Navigation from "@/components/Navigation"
import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <main>
            <Navigation/>
            <Outlet/>
        </main>
    )
}

export default MainLayout