import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, BadgeDollarSign } from "lucide-react";

function AdminProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <Link to={`/admin/products/${product._id}`} className="block h-full transition-transform hover:scale-[1.02]">
      <Card className="h-full border-2 hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="">{product.name}</CardTitle>
              <CardDescription className="flex items-center gap-x-1 mt-1">
                <Tag className="h-3 w-3" />
                <span className="text-sm">{product.brand}</span>
              </CardDescription>
            </div>
            <Badge>{"Laptop"}</Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-x-1">
            <BadgeDollarSign className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-green-600">{formatPrice(product.price)}</span>
          </div>
          
          <span className="text-xs text-muted-foreground">
            ID: {product._id.substring(product._id.length - 6)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default AdminProductCard;