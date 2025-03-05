import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/lib/api";
import { toast } from "sonner";

function CreateProductPage() {

    const [createProuct, isLoading] = useCreateProductMutation();

    const handleClick = async () => {
        try {
            toast.loading("Creating product...");
            await createProuct({
                name: "MacBook Pro M2",
                brand: "Laptop, Apple",
                rating: 4.9,
                reviews: 3110,
                image: "/assets/products/macbooks-pro-m2.webp",
                price: 2199,
                description: "Experience unparalleled performance with the MacBook Pro M2. Powered by Apple's advanced M2 chip, it delivers incredible speed, efficiency, and power for demanding tasks. Choose from 13-inch or 14-inch Retina displays with True Tone for stunning visuals and vibrant colors. Equipped with up to 24GB unified memory and up to 2TB SSD, it ensures seamless multitasking and ample storage. Enjoy a quieter, more efficient design with an all-day battery life to keep you productive on the go. With macOS and a sleek, lightweight build, the MacBook Pro M2 redefines what a laptop can do.",
            }).unwrap();
            toast.success("Product created successfully");
        } catch (error) {
            toast.error("Product creation failed");
        }
    }

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-2xl font-bold">Create Product</h1>

            <div className="mt-4">
                <Button onClick={handleClick}>Create Product</Button>
            </div>
        </main>
    )
}

export default CreateProductPage;