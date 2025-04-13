import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CreditCard, Calendar } from "lucide-react";

const PurchaseSummary = ({ purchases }) => {
  const totalOrders = purchases.length;
  const totalSpent = purchases.reduce((total, purchase) => 
    total + (purchase.product?.price || 0) * (purchase.quantity || 1), 0
  );
  
  const lastPurchaseDate = purchases.length > 0 
    ? new Date(Math.max(...purchases.map(p => new Date(p.checkoutDate || 0)))) 
    : null;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) return "No purchases yet";
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden">
      <CardHeader className="bg-primary/5 pb-2 border-b border-primary/10">
        <CardTitle className="text-lg font-medium text-primary/90">Purchase Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <div className="flex items-start p-4 bg-white hover:bg-slate-50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 font-medium">Total Orders</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold text-slate-800">{totalOrders}</span>
                <span className="text-xs text-slate-500 ml-2">items purchased</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-white hover:bg-slate-50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 font-medium">Total Spent</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold text-slate-800">{formatCurrency(totalSpent)}</span>
                <span className="text-xs text-slate-500 ml-2">lifetime value</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-white hover:bg-slate-50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 font-medium">Last Purchase</span>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold text-slate-800">
                  {lastPurchaseDate ? formatDate(lastPurchaseDate) : "Never"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseSummary;