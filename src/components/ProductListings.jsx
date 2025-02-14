import { useState } from 'react'
import BrandTab from './BrandTab'
import ProductCard from './ProductCard'
import { Button } from './ui/button';
import { getProducts } from '@/lib/api/products';

function ProductListings() {

    const [products, setProducts] = useState([]);

    const brands = [
        {
            "name": "ALL",
            "image": "/assets/logo/new/all.png"
        },
        {
            "name": "Asus",
            "image": "/assets/logo/new/asus.png"
        },
        {
            "name": "Apple",
            "image": "/assets/logo/new/apple.png"
        },
        {
            "name": "Dell",
            "image": "/assets/logo/new/dell.png"
        },
        {
            "name": "Msi",
            "image": "/assets/logo/new/msi blk.png"
        },
    ]

    const [selectedBrand, setSelectBrand] = useState("ALL");

    const handleSelectBrand = (brand) => {
        setSelectBrand(brand);
    }
    
    const filterProducts = selectedBrand === "ALL" ? products : products.filter((product) => {
        return product.brand.toLowerCase().includes(selectedBrand.toLowerCase());
    })

    return (
        <section className="px-8 py-8 lg:py-16">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    What are you looking for?
                </h2>

                <Button onClick={ async() => {
                    const data = await getProducts();
                    setProducts(data);
                }}>Fetch Data</Button>

                <p className="text-lg text-muted-foreground">
                    Shop by brand to find the latest trends and essentials.
                </p>
            </div>

            <div className="flex items-center gap-x-8 mb-6">
                {
                    brands.map((brand) => {
                        return <BrandTab selectedBrand={selectedBrand} key={brand.name} brand={brand} onClick={handleSelectBrand} />
                    })
                }
            </div>

            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Top trending Featured Products
                </h2>
                <p className="text-lg text-muted-foreground">
                    Explore the most trending products globally for an exceptional shopping experience with ShopZoneAI.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 cursor-pointer">

                {
                    filterProducts.map((product) => {
                        return <ProductCard product={product} key={product._id} />
                    })
                }

            </div>

        </section>
    )
}

export default ProductListings