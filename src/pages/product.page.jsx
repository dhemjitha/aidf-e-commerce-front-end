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
import { useGetProductsByIdQuery } from "@/lib/api"
import { cn } from "@/lib/utils"

export default function LaptopProductPage() {
    const { id } = useParams()
    const { data: product, isLoading, isError } = useGetProductsByIdQuery(id)
    const [activeImage, setActiveImage] = useState(0)
    const dispatch = useDispatch()
    const wishlistItems = useSelector((state) => state.wishlist.items)
    const isInWishlist = wishlistItems.some(item => item._id === id)

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
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <Skeleton className="w-full aspect-square rounded-2xl bg-gray-200" />
                        <div className="flex space-x-4 justify-center">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-20 w-20 rounded-lg bg-gray-200" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <Skeleton className="h-10 w-full bg-gray-200" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-32 bg-gray-200" />
                            <Skeleton className="h-6 w-32 bg-gray-200" />
                        </div>
                        <Skeleton className="h-6 w-3/4 bg-gray-200" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full bg-gray-200" />
                            <Skeleton className="h-4 w-full bg-gray-200" />
                            <Skeleton className="h-4 w-3/4 bg-gray-200" />
                        </div>
                        <Skeleton className="h-40 w-full rounded-xl bg-gray-200" />
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-40 rounded-lg bg-gray-200" />
                            <Skeleton className="h-12 w-40 rounded-lg bg-gray-200" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError)
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Product</h2>
                    <p className="text-gray-600 mb-6">We couldn't load the product details. Please try again later.</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50">
            <div className="grid lg:grid-cols-2 gap-10">
                {/* Product Images */}
                <div className="space-y-6">
                    <div className="relative w-full bg-white rounded-2xl shadow-md overflow-hidden">
                        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px]">
                            <img
                                src={galleryImages[activeImage] || "/placeholder.svg"}
                                alt={product.name}
                                className="absolute w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {galleryImages.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    <span className="sr-only">Previous image</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                    <span className="sr-only">Next image</span>
                                </Button>
                            </>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-3 top-3 bg-white/80 hover:bg-white rounded-full"
                            onClick={handleWishlist}
                        >
                            <Heart 
                                className={cn(
                                    "h-5 w-5 transition-colors",
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

                    <div className="flex space-x-4 justify-center">
                        {galleryImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={cn(
                                    "w-20 h-20 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all",
                                    activeImage === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70",
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
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                                <div className="flex items-center mt-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "h-5 w-5",
                                                    i < Math.floor(product?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold ml-2">{product?.rating || "No Ratings"}</span>
                                    <span className="text-gray-500 ml-2">({product.reviews?.toLocaleString() || "No"} Reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                            High Performance
                        </Badge>
                        <Badge variant="secondary" className="bg-green-50 text-green-600">
                            Latest Model
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-50 text-purple-600">
                            Premium Build
                        </Badge>
                    </div>

                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <Tabs defaultValue="specs" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="specs">Specifications</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="warranty">Warranty</TabsTrigger>
                        </TabsList>
                        <TabsContent value="specs" className="mt-4">
                            <Card className="border-0 shadow-md">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <Cpu className="h-6 w-6 mr-3 text-blue-500" />
                                                <div>
                                                    <p className="font-medium">Processor</p>
                                                    <p className="text-sm text-gray-500">Intel Core i7-12700H</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Layers className="h-6 w-6 mr-3 text-green-500" />
                                                <div>
                                                    <p className="font-medium">RAM</p>
                                                    <p className="text-sm text-gray-500">16GB DDR5</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Laptop className="h-6 w-6 mr-3 text-indigo-500" />
                                                <div>
                                                    <p className="font-medium">Storage</p>
                                                    <p className="text-sm text-gray-500">1TB NVMe SSD</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <Monitor className="h-6 w-6 mr-3 text-purple-500" />
                                                <div>
                                                    <p className="font-medium">Display</p>
                                                    <p className="text-sm text-gray-500">15.6" 2K (2560x1440) 165Hz</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Battery className="h-6 w-6 mr-3 text-red-500" />
                                                <div>
                                                    <p className="font-medium">Battery</p>
                                                    <p className="text-sm text-gray-500">80Wh, Up to 10 hours</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Laptop className="h-6 w-6 mr-3 text-gray-500" />
                                                <div>
                                                    <p className="font-medium">Weight</p>
                                                    <p className="text-sm text-gray-500">1.9 kg (4.2 lbs)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="features" className="mt-4">
                            <Card className="border-0 shadow-md">
                                <CardContent className="p-6">
                                    <ul className="space-y-3">
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
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <ShieldCheck className="h-6 w-6 text-green-500 mr-2" />
                                        <h3 className="font-semibold">2-Year Limited Warranty</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        This product comes with a 2-year limited warranty that covers manufacturing defects and hardware
                                        failures under normal use.
                                    </p>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">What's covered:</h4>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            <li>• Manufacturing defects</li>
                                            <li>• Hardware failures during normal use</li>
                                            <li>• Battery (1 year)</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-gray-800">${product.price}</p>
                                    <p className="text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center mt-1">
                                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                        20% OFF
                                    </Badge>
                                    <p className="text-sm text-gray-500 ml-2">
                                        <Truck className="h-4 w-4 inline mr-1" />
                                        Free shipping
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" size="lg" className="flex-1 md:flex-none">
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Add to Cart
                                </Button>
                                <Button size="lg" className="flex-1 md:flex-none">
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 px-2">
                        <div className="flex items-center">
                            <ShieldCheck className="h-4 w-4 mr-1" />
                            <span>Secure checkout</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center">
                            <Truck className="h-4 w-4 mr-1" />
                            <span>Free returns</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            <span>Top rated product</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
