import AdminProductCard from "@/components/AdminProductCard";
import { useGetProductsQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
    

function ProductSection() {
    const { data: products, isLoading, isError } = useGetProductsQuery();


    if (isLoading) {
        return (
            <section className="px-8 py-8 lg:py-16 min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Current Active Products</h2>
                <div className="mt-4 flex flex-col gap-y-4">
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className="w-full h-[150px] rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }


    if (isError) {
        return (
            <section className="px-8 py-8 lg:py-16 min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Current Active Products</h2>
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Failed to load products. Please try again later.
                    </AlertDescription>
                </Alert>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return (
            <section className="px-8 py-8 lg:py-16 min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Current Active Products</h2>
                <p className="text-muted-foreground">No products available.</p>
            </section>
        );
    }

    return (
        <section className="px-8 py-8 lg:py-16 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Current Active Products</h2>
            <div className="mt-4 flex flex-col gap-y-4">
                {products.map((product) => (
                    <AdminProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default ProductSection;