import { useState, useEffect } from 'react'
import BrandTab from './BrandTab'
import ProductCard from './ProductCard'
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useGetProductsQuery } from '@/lib/api';
import { Skeleton } from './ui/skeleton';
import { useGetProductsForSearchQueryQuery } from "@/lib/api";

import { useSelector } from "react-redux";


function ProductListings() {

    const searchValue = useSelector((state) => state.search.value);

    const { data: products, isLoading, isError, isFetching } =
        useGetProductsForSearchQueryQuery({
            query: searchValue,
        });

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

    
    if (isLoading || isFetching) {
        return (

            <section className="px-8 py-8 lg:py-16">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What are you looking for?
                    </h2>
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

                <div id="product-listings" className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Top trending Featured Products
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Explore the most trending products globally for an exceptional shopping experience with ShopZoneAI.
                    </p>
                </div>

                <div className="space-y-8">
                    <div>
                        <Skeleton className="h-8 w-full max-w-[700px] bg-gray-300/70" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                                <Skeleton className="aspect-[4/3] rounded-t-xl bg-gray-300/70" />
                                <div className="p-6 pt-0 mt-3 space-y-2">
                                    <Skeleton className="h-6 w-3/4 bg-gray-300/70" />
                                    <Skeleton className="h-4 w-1/2 bg-gray-300/70" />
                                    <Skeleton className="h-4 w-1/3 bg-gray-300/70" />
                                </div>
                                <div className="flex items-center p-6 pt-0">
                                    <Skeleton className="h-6 w-1/4 bg-gray-300/70" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

        );
    }

    if (isError) {
        return (
            <section className="px-8 py-8 lg:py-16">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What are you looking for?
                    </h2>
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

                <div id="product-listings" className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Top trending Featured Products
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Explore the most trending products globally for an exceptional shopping experience with ShopZoneAI.
                    </p>
                </div>

                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Error while fetching data...
                    </AlertDescription>
                </Alert>


            </section>
        );
    }

    const filterProducts = selectedBrand === "ALL"
    ? products
    : products.filter(({ product }) => {
        return product.brand.toLowerCase().includes(selectedBrand.toLowerCase());
    });

    return (
        <section className="px-8 py-8 lg:py-16">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    What are you looking for?
                </h2>
                <p className="text-lg text-muted-foreground">
                    Shop by brand to find the latest trends and essentials.
                </p>
            </div>

            <div className="flex items-center gap-x-8 mb-6">
                {
                    brands.map((brand, i) => {
                        return <BrandTab selectedBrand={selectedBrand} key={i} brand={brand} onClick={handleSelectBrand} />
                    })
                }
            </div>

            <div id="product-listings" className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Top trending Featured Products
                </h2>
                <p className="text-lg text-muted-foreground">
                    Explore the most trending products globally for an exceptional shopping experience with ShopZoneAI.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 cursor-pointer">
                {
                    filterProducts.map(({ product, confidence }) => {
                        return (<ProductCard 
                            key={product._id} 
                            product={product} 
                            confidence={confidence} 
                            isFromSearch={searchValue.trim() !== ""}
                        />)
                    })
                }
            </div>

        </section>
    )
}

export default ProductListings