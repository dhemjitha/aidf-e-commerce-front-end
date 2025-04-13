import { Card, CardContent } from "@/components/ui/card";

const PurchaseSummary = ({ purchases }) => {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total Orders</span>
            <span className="text-2xl font-bold">{purchases.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total Spent</span>
            <span className="text-2xl font-bold">
              ${purchases.reduce((total, purchase) => total + (purchase.product?.price || 0), 0).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseSummary; 