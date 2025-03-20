import { useState } from 'react';
import AdminProductCard from "@/components/AdminProductCard";
import { useGetProductsQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function ProductSection() {
    const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredProducts = products?.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} className="w-full h-[180px] rounded-lg" />
                    ))}
                </div>
            );
        }

        if (isError) {
            return (
                <Alert variant="destructive" className="mt-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription className="flex flex-col gap-y-2">
                        <span>Failed to load products. Please try again later.</span>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => refetch()}
                            className="w-fit"
                        >
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            );
        }

        if (!filteredProducts || filteredProducts.length === 0) {
            return (
                <div className="mt-6 flex flex-col items-center justify-center bg-muted p-8 rounded-lg">
                    <p className="text-muted-foreground text-center">
                        {searchTerm ? "No products match your search criteria." : "No products available."}
                    </p>
                    {searchTerm && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSearchTerm('')}
                            className="mt-4"
                        >
                            Clear search
                        </Button>
                    )}
                </div>
            );
        }

        return (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                    <AdminProductCard key={product._id} product={product} />
                ))}
            </div>
        );
    };

    return (
        <section className="container px-4 py-8 lg:py-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Current Active Products</h2>
                
                <div className="relative w-full md:w-64 lg:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="pl-10 w-full"
                    />
                </div>
            </div>
            
            {renderContent()}
        </section>
    );
}

export default ProductSection;