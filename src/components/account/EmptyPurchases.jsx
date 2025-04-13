import { ShoppingBag } from "lucide-react";

const EmptyPurchases = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No purchases yet</h3>
      <p className="text-muted-foreground mt-2">
        Browse our products and make your first purchase!
      </p>
    </div>
  );
};

export default EmptyPurchases; 