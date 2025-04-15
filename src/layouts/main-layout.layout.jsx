import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <main>
            <Navigation/>
            <Outlet/>
            <Footer/>
        </main>
    )
}

export default MainLayout