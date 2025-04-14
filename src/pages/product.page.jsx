"use client"

import { useState } from "react"
import { useParams } from "react-router"
import {
    Battery,
    ChevronLeft,
    ChevronRight,
    Cpu,
    Heart,
    Laptop,
    Layers,
    Monitor,
    ShieldCheck,
    ShoppingCart,
    Star,
    Truck,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist, removeFromWishlist } from "@/lib/feature/wishlistSlice"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useCreateBuyingMutation, useGetAllBuyingProductsForUserQuery, useGetProductsByIdQuery } from "@/lib/api"
import { cn } from "@/lib/utils"

export default function LaptopProductPage() {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductsByIdQuery(id);
    const [createBuying, { isLoading: isCreateBuyingLoading}] = useCreateBuyingMutation();
    const [activeImage, setActiveImage] = useState(0);
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isInWishlist = wishlistItems.some(item => item._id === id);

    const { refetch } = useGetAllBuyingProductsForUserQuery();

    const handleClick = async () => {

        const userId = window?.Clerk?.user?.id;

        if (!userId) {
            console.error("No user ID found. Please log in.");
            return;
        }

        
        try {
            toast.loading("Creating order...");
            await createBuying({
                productId: id,
                userId: userId,
                quantity: 1,
                shippingAddress: "123 New York, America",
                mobileNumber: 786295820,
                checkoutDate: new Date().toISOString(),
            })
            toast.dismiss();
            toast.success("Order created successfully");
            refetch();
        } catch (error) {
            toast.dismiss();
            toast.error("Error creating order");
            console.log(error);
        }
    }
    

    // Generate placeholder images for the gallery
    const galleryImages = product ? [product.image, product.image, product.image, product.image] : []

    const nextImage = () => {
        setActiveImage((prev) => (prev + 1) % galleryImages.length)
    }

    const prevImage = () => {
        setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }

    const handleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(id))
            toast.success("Removed from wishlist")
        } else {
            dispatch(addToWishlist(product))
            toast.success("Added to wishlist")
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-6 min-h-screen">
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Skeleton className="w-full aspect-square rounded-2xl bg-gray-200" />
                        <div className="flex space-x-2 overflow-x-auto pb-2 justify-start sm:justify-center">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-lg bg-gray-200" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-full bg-gray-200" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-24 bg-gray-200" />
                            <Skeleton className="h-5 w-24 bg-gray-200" />
                        </div>
                        <Skeleton className="h-5 w-3/4 bg-gray-200" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full bg-gray-200" />
                            <Skeleton className="h-4 w-full bg-gray-200" />
                            <Skeleton className="h-4 w-3/4 bg-gray-200" />
                        </div>
                        <Skeleton className="h-32 w-full rounded-xl bg-gray-200" />
                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-full rounded-lg bg-gray-200" />
                            <Skeleton className="h-10 w-full rounded-lg bg-gray-200" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError)
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-3">Error Loading Product</h2>
                    <p className="text-gray-600 mb-4">We couldn't load the product details. Please try again later.</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )

    return (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 bg-gray-50">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
                {/* Product Images */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="relative w-full bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
                        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {galleryImages.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="sr-only">Previous image</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="sr-only">Next image</span>
                                </Button>
                            </>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10"
                            onClick={handleWishlist}
                        >
                            <Heart 
                                className={cn(
                                    "h-4 w-4 sm:h-5 sm:w-5 transition-colors",
                                    isInWishlist 
                                    ? "text-red-500 fill-red-500" 
                                    : "text-gray-700 hover:text-red-500"
                                )} 
                            />
                            <span className="sr-only">
                                {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                            </span>
                        </Button>
                    </div>

                    <div className="flex space-x-4 sm:space-x-4 overflow-x-auto pb-2 justify-center sm:justify-center">
                        {galleryImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={cn(
                                    "w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all",
                                    activeImage === index 
                                      ? "border-2 border-black opacity-100" 
                                      : "border border-gray-200 opacity-70"
                                  )}
                            >
                                <img
                                    src={img || "/placeholder.svg"}
                                    alt={`${product.name} - View ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
                                <div className="flex items-center flex-wrap mt-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "h-4 w-4 sm:h-5 sm:w-5",
                                                    i < Math.floor(product?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold ml-2 text-sm sm:text-base">{product?.rating || "No Ratings"}</span>
                                    <span className="text-gray-500 ml-2 text-sm sm:text-base">({product.reviews?.toLocaleString() || "No"} Reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-xs sm:text-sm">
                            High Performance
                        </Badge>
                        <Badge variant="secondary" className="bg-green-50 text-green-600 text-xs sm:text-sm">
                            Latest Model
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-50 text-purple-600 text-xs sm:text-sm">
                            Premium Build
                        </Badge>
                    </div>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>

                    <Tabs defaultValue="specs" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 h-auto">
                            <TabsTrigger value="specs" className="text-xs sm:text-sm py-2">Specifications</TabsTrigger>
                            <TabsTrigger value="features" className="text-xs sm:text-sm py-2">Features</TabsTrigger>
                            <TabsTrigger value="warranty" className="text-xs sm:text-sm py-2">Warranty</TabsTrigger>
                        </TabsList>
                        <TabsContent value="specs" className="mt-4">
                            <Card className="border-0 shadow-md">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-3 sm:space-y-4">
                                            <div className="flex items-center">
                                                <Cpu className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-500" />
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">Processor</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">Intel Core i7-12700H</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Layers className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-green-500" />
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">RAM</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">16GB DDR5</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Laptop className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-indigo-500" />
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">Storage</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">1TB NVMe SSD</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div className="flex items-center">
                                                <Monitor className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-purple-500" />
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">Display</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">15.6" 2K (2560x1440) 165Hz</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Battery className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-red-500" />
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">Battery</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">80Wh, Up to 10 hours</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Laptop className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-gray-500" />
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">Weight</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">1.9 kg (4.2 lbs)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="features" className="mt-4">
                            <Card className="border-0 shadow-md">
                                <CardContent className="p-4 sm:p-6">
                                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Backlit keyboard with customizable RGB lighting</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Thunderbolt 4 support for high-speed data transfer</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Advanced cooling system with dual fans</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Wi-Fi 6E and Bluetooth 5.2 connectivity</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Precision glass touchpad with multi-gesture support</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="warranty" className="mt-4">
                            <Card className="border-0 shadow-md">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-center mb-3 sm:mb-4">
                                        <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2" />
                                        <h3 className="font-semibold text-sm sm:text-base">2-Year Limited Warranty</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                                        This product comes with a 2-year limited warranty that covers manufacturing defects and hardware
                                        failures under normal use.
                                    </p>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                        <h4 className="font-medium mb-2 text-sm sm:text-base">What's covered:</h4>
                                        <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                                            <li>• Manufacturing defects</li>
                                            <li>• Hardware failures during normal use</li>
                                            <li>• Battery (1 year)</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">${product.price}</p>
                                    <p className="text-base sm:text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center flex-wrap gap-2 mt-1">
                                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs sm:text-sm">
                                        20% OFF
                                    </Badge>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        <Truck className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                                        Free shipping
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" className="flex-1 h-9 sm:h-10 text-xs sm:text-sm">
                                    <ShoppingCart className="h-4 w-4 mr-1 sm:mr-2" />
                                    Add to Cart
                                </Button>
                                <Button size="sm" className="flex-1 h-9 sm:h-10 text-xs sm:text-sm" onClick={handleClick}>
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 px-1">
                        <div className="flex items-center justify-center sm:justify-start">
                            <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span>Secure checkout</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <Truck className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span>Free returns</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-end">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span>Top rated</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}