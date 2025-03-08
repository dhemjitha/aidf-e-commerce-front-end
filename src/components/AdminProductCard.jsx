import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CircleAlert, BadgeDollarSignIcon } from "lucide-react";


function AdminProductCard(props) {
  return (
    <Link to={`/admin/products/${props.product._id}`}
      key={props.product._id} className="block">
      <Card className="bg-sky-500">
        <CardHeader>
          <CardTitle>{props.product.name}</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="gap-x-4">
          <div className="flex items-center gap-x-2">
            <CircleAlert className="h-4 w-4 text-primary" />
            <span>{props.product.brand}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <BadgeDollarSignIcon className="h-4 w-4 text-primary" />
            <span>$ {props.product.price}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default AdminProductCard;