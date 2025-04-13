import { formatDistanceToNow } from "date-fns"
import { 
  Package, 
  MapPin, 
  Calendar, 
  ShoppingCart, 
  Truck, 
  Clock, 
  Trash2
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

  return (
    <TooltipProvider>
      <Card className="overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-slate-50 border-b">
          <CardTitle className="text-base font-medium text-slate-700 flex items-center gap-2">
            Order #{purchase._id.toString().slice(5, 12) || "Unknown"}
            <StatusIndicator status={status} />
          </CardTitle>
          <div className="text-sm text-slate-500">
            {purchase.checkoutDate ? formatDistanceToNow(new Date(purchase.checkoutDate), { addSuffix: true }) : "N/A"}
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm">
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

            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <h3 className="font-medium text-lg text-slate-800 mb-1 line-clamp-1">
                  {productName}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="font-semibold text-primary">
                    {formatPrice(productPrice)}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>Qty: {purchase.quantity || 1}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="h-3.5 w-3.5 text-primary/70" />
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
                      <Calendar className="h-3.5 w-3.5 text-primary/70" />
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
                        <Truck className="h-3.5 w-3.5 text-primary/70" />
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
          <div className="px-4 py-2.5 bg-slate-50 border-t flex items-start gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="leading-tight">{purchase.shippingAddress}</p>
          </div>
        )}
        
        <CardFooter className="px-4 py-3 flex justify-end border-t bg-white">
          <Button 
            variant="destructive" 
            size="sm"
            className="flex items-center gap-1.5 text-sm font-medium"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete Order
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}

export default PurchaseCard