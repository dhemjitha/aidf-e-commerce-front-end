import { differenceInDays } from "date-fns";

export const useOrderStatus = () => {
  const getOrderStatus = (checkoutDate) => {
    const daysSincePurchase = differenceInDays(new Date(), new Date(checkoutDate));
    
    if (daysSincePurchase < 1) {
      return { label: "Processing", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
    } else if (daysSincePurchase < 3) {
      return { label: "Shipped", color: "bg-blue-100 text-blue-800 border-blue-200" };
    } else if (daysSincePurchase < 7) {
      return { label: "Out for Delivery", color: "bg-purple-100 text-purple-800 border-purple-200" };
    } else {
      return { label: "Delivered", color: "bg-green-100 text-green-800 border-green-200" };
    }
  };

  return { getOrderStatus };
};

export default useOrderStatus; 