import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin, Calendar, ShoppingCart, Truck, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useOrderStatus } from "@/hooks/useOrderStatus"

const PurchaseCard = ({ purchase }) => {
  const { getOrderStatus } = useOrderStatus()
  const status = getOrderStatus(purchase.checkoutDate || new Date())

  return (
    <Card
      className="overflow-hidden border-l-4 hover:shadow-md transition-all duration-200"
      style={{
        borderLeftColor: status.color === "bg-green-100" ? "#10b981" :
                         status.color === "bg-yellow-100" ? "#f59e0b" :
                         status.color === "bg-blue-100" ? "#3b82f6" : "#6b7280",
      }}
    >
      <CardContent className="p-5">
        <div className="flex gap-6">

          <div className="h-32 w-32 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
            {purchase.product?.image || purchase.productId?.image ? (
              <img
                src={purchase.product?.image || purchase.productId?.image}
                alt={purchase.product?.name || purchase.productId?.name || "Product"}
                className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Package className="h-12 w-12 text-slate-400" />
              </div>
            )}
          </div>


          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-2.5">
              <h3 className="font-semibold text-lg text-slate-800 truncate">
                {purchase.product?.name || purchase.productId?.name || "Product"}
              </h3>
              <Badge className={`${status.color} text-xs px-2.5 py-1 ml-1 border border-slate-200 hover:${status.color}`}>
                {status.label}
              </Badge>
            </div>
            
            <div className="flex items-center gap-6 text-sm mb-4">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                ${purchase.product?.price || 0}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Qty: {purchase.quantity || 1}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-3.5 w-3.5" />
                <span>{purchase.checkoutDate ? new Date(purchase.checkoutDate).toLocaleDateString() : "N/A"}</span>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>
                    {purchase.createdAt
                      ? formatDistanceToNow(new Date(purchase.createdAt), { addSuffix: true })
                      : "N/A"}
                  </span>
                </div>
                
                {purchase.shippingAddress && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="truncate max-w-[250px]">{purchase.shippingAddress}</span>
                  </div>
                )}
                
                {purchase.mobileNumber && (
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-slate-500" />
                    <span>{purchase.mobileNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PurchaseCard