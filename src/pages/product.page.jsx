import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
    Cpu,
    Layers,
    Battery,
    Monitor,
    Star,
    Laptop,
} from "lucide-react";

import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateBuyingMutation, useGetProductsByIdQuery } from "@/lib/api";

export default function LaptopProductPage() {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductsByIdQuery(id);

    const [createBuying, { isLoading: isCreateBuyingLoading}] = useCreateBuyingMutation();

    const handleClick = async () => {

        const userId = window?.Clerk?.user?.id;

        if (!userId) {
            console.error("No user ID found. Please log in.");
            return;
        }

        
        try {
            await createBuying({
                productId: id,
                userId: userId,
                quantity: 1,
                shippingAddress: "123 New York, America",
                mobileNumber: 786295820,
                checkoutDate: new Date().toISOString(),
            })
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading)
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <Skeleton className="w-full h-[400px] rounded-2xl bg-gray-200" />
                        <div className="flex space-x-4 justify-center">
                            {[...Array(3)].map((_, index) => (
                                <Skeleton key={index} className="h-20 w-20 rounded-lg bg-gray-200" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <Skeleton className="h-10 w-full bg-gray-200" />
                        <Skeleton className="h-6 w-3/4 bg-gray-200" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full bg-gray-200" />
                            <Skeleton className="h-4 w-full bg-gray-200" />
                            <Skeleton className="h-4 w-3/4 bg-gray-200" />
                        </div>
                    </div>
                </div>
            </div>
        );

    if (isError) return <p className="text-red-500 text-center">Error loading product details</p>;

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50">
            <div className="grid lg:grid-cols-2 gap-10">

                <div className="space-y-6">
                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px]">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex space-x-4 justify-center">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="w-20 h-20 bg-white rounded-lg overflow-hidden shadow-md hover:border-2 hover:border-blue-500 transition-all"
                            >
                                <img
                                    src={product.image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="space-y-6">

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                                <div className="flex items-center mt-2">
                                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                                    <span className="font-semibold">{product?.rating ?? "No Ratings"}</span>
                                    <span className="text-gray-500 ml-2">
                                        ({product.reviews?.toLocaleString() ?? "No"} Reviews)
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Star className="h-5 w-5" />
                                <span className="sr-only">Add to favorites</span>
                            </Button>
                        </div>
                    </div>


                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600">High Performance</Badge>
                        <Badge variant="secondary" className="bg-green-50 text-green-600">Latest Model</Badge>
                    </div>


                    <p className="text-gray-600 leading-relaxed">{product.description}</p>


                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Technical Specifications</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <Cpu className="h-6 w-6 mr-3 text-blue-500" />
                                    <span>Processor</span>
                                </div>
                                <div className="flex items-center">
                                    <Layers className="h-6 w-6 mr-3 text-green-500" />
                                    <span>RAM</span>
                                </div>
                                <div className="flex items-center">
                                    <Monitor className="h-6 w-6 mr-3 text-purple-500" />
                                    <span>Display</span>
                                </div>
                                <div className="flex items-center">
                                    <Battery className="h-6 w-6 mr-3 text-red-500" />
                                    <span>Battery</span>
                                </div>
                                <div className="flex items-center">
                                    <Laptop className="h-6 w-6 mr-3 text-indigo-500" />
                                    <span>Storage</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-3xl font-bold">${product.price}</p>
                            <p className="text-sm text-gray-500">Retail Price</p>
                        </div>
                        <Button size="lg" onClick={handleClick}>
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}