import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import PurchaseCard from "./PurchaseCard";
import PurchaseSummary from "./PurchaseSummary";
import EmptyPurchases from "./EmptyPurchases";

const PurchasesTab = ({ purchases, isLoading, isError }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold">
        My Purchases
      </h2>
      
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      )}
      
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not load your purchase history. Please try again later.
          </AlertDescription>
        </Alert>
      )}
      
      {!isLoading && !isError && (!purchases || purchases.length === 0) && (
        <EmptyPurchases />
      )}
      
      {!isLoading && !isError && purchases?.length > 0 && (
        <>
          <PurchaseSummary purchases={purchases} />
          
          <div className="grid gap-6">
            {purchases.map((purchase) => (
              <PurchaseCard key={purchase._id} purchase={purchase} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PurchasesTab; 