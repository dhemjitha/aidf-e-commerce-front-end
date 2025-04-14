import React from "react"
import { formatDistanceToNow } from "date-fns"
import { 
  Package, 
  MapPin, 
  Calendar, 
  ShoppingCart, 
  Truck, 
  Clock, 
  Trash2,
  Loader2
} from "lucide-react"
import { useOrderStatus } from "@/hooks/useOrderStatus"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteBuyingMutation, useGetAllBuyingProductsForUserQuery } from "@/lib/api"
import { toast } from "sonner"

const StatusIndicator = ({ status }) => {
  const colors = {
    green: { bg: "bg-emerald-500", text: "text-emerald-50" },
    yellow: { bg: "bg-amber-500", text: "text-amber-50" },
    blue: { bg: "bg-blue-500", text: "text-blue-50" },
    purple: { bg: "bg-violet-500", text: "text-violet-50" },
    default: { bg: "bg-gray-500", text: "text-gray-50" }
  }
  
  const getColor = () => {
    if (status.color.includes("green")) return colors.green;
    if (status.color.includes("yellow")) return colors.yellow;
    if (status.color.includes("blue")) return colors.blue;
    if (status.color.includes("purple")) return colors.purple;
    return colors.default;
  }
  
  const { bg, text } = getColor();
  
  return (
    <Badge className={`${bg} ${text} text-xs font-medium px-2.5 py-1 rounded-full`}>
      {status.label}
    </Badge>
  )
}

const PurchaseCard = ({ purchase, onViewDetails }) => {
  const { getOrderStatus } = useOrderStatus()
  const status = getOrderStatus(purchase.checkoutDate || new Date())
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const productName = purchase.product?.name || purchase.productId?.name || "Product";
  const productImage = purchase.product?.image || purchase.productId?.image;
  const productPrice = purchase.product?.price || 0;
  const orderDate = purchase.createdAt 
    ? formatDistanceToNow(new Date(purchase.createdAt), { addSuffix: true })
    : "N/A";
  const deliveryDate = purchase.checkoutDate 
    ? new Date(purchase.checkoutDate).toLocaleDateString()
    : "N/A";

  const [deleteBuying, { isLoading: isDeleting }] = useDeleteBuyingMutation();
  const { refetch } = useGetAllBuyingProductsForUserQuery();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      toast.loading("Deleting order...");
      await deleteBuying(purchase._id);
      toast.dismiss();
      toast.success("Order deleted successfully");
      refetch();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to delete order");
    }
  };

  return (
    <TooltipProvider>
      <Card className="overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="py-2 px-3 md:py-3 md:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 border-b gap-1">
          <CardTitle className="text-sm md:text-base font-medium text-slate-700 flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">Order #{purchase._id.toString().slice(5, 12) || "Unknown"}</span>
            <StatusIndicator status={status} />
          </CardTitle>
          <div className="text-xs md:text-sm text-slate-500">
            {purchase.checkoutDate ? formatDistanceToNow(new Date(purchase.checkoutDate), { addSuffix: true }) : "N/A"}
          </div>
        </CardHeader>
        
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="h-20 w-20 sm:h-24 sm:w-24 mx-auto sm:mx-0 rounded-md overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm">
              {productImage ? (
                <img
                  src={productImage}
                  alt={productName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Package className="h-8 w-8 text-slate-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <div>
                <h3 className="font-medium text-base md:text-lg text-slate-800 mb-1 line-clamp-1 text-center sm:text-left">
                  {productName}
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  <div className="font-semibold text-primary">
                    {formatPrice(productPrice)}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs sm:text-sm">
                    <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Qty: {purchase.quantity || 1}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 text-xs sm:text-sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/70" />
                      <span className="truncate">Ordered {orderDate}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Order placed {orderDate}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/70" />
                      <span className="truncate">Delivery {deliveryDate}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expected delivery date: {deliveryDate}</p>
                  </TooltipContent>
                </Tooltip>

                {purchase.mobileNumber && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/70" />
                        <span className="truncate">{purchase.mobileNumber}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tracking number: {purchase.mobileNumber}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        {purchase.shippingAddress && (
          <div className="px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 border-t flex items-start gap-2 text-xs sm:text-sm text-slate-600">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="leading-tight">{purchase.shippingAddress}</p>
          </div>
        )}
        
        <CardFooter className="px-3 py-2 md:px-4 md:py-3 flex justify-center sm:justify-end border-t bg-white">
          <Button 
            variant="destructive" 
            size="sm"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Delete Order
          </Button>
          
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="max-w-[95%] sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg">Are you sure you want to delete this order?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm">
                  This action cannot be undone. This will permanently delete the order
                  for "{productName}" from your purchase history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}

export default PurchaseCard