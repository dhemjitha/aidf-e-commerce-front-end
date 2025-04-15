import HeroGrid from "@/components/HeroGrid"
import Hero from "../components/Hero"
import Navigation from "../components/Navigation"
import ProductListings from "../components/ProductListings"

const HomePage = () => {
    return (
        <>
          <div className="relative min-h-screen">
            <Hero />
            <img
              src="/assets/hero/hero.png"
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            />
          </div>
          <ProductListings/>
          <HeroGrid/>
        </>
      )
}

export default HomePage