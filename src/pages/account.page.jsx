import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { useGetAllBuyingProductsForUserQuery } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import AccountPageSkeleton from "@/components/account/AccountPageSkeleton";
import PersonalInfoTab from "@/components/account/PersonalInfoTab";
import PurchasesTab from "@/components/account/PurchasesTab";

const AccountPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { 
        data: purchases, 
        isLoading: isPurchasesLoading, 
        isError: isPurchasesError 
    } = useGetAllBuyingProductsForUserQuery();

    useEffect(() => {
        if (purchases) {
            console.log("Purchases data structure:", purchases);
        }
    }, [purchases]);

    const normalizedPurchases = purchases?.map(purchase => {
        if (purchase.productId && typeof purchase.productId === 'object') {
            return {
                ...purchase,
                product: purchase.productId
            };
        }
        return purchase;
    });

    if (!isLoaded) {
        return <AccountPageSkeleton />;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />
    }

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
            
            <Tabs defaultValue="info" className="mt-8">
                <TabsList className="mb-6">
                    <TabsTrigger value="info">Personal Info</TabsTrigger>
                    <TabsTrigger value="purchases">My Purchases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                    <PersonalInfoTab user={user} />
                </TabsContent>
                
                <TabsContent value="purchases">
                    <PurchasesTab 
                        purchases={normalizedPurchases} 
                        isLoading={isPurchasesLoading} 
                        isError={isPurchasesError} 
                    />
                </TabsContent>
            </Tabs>
        </main>
    );
}

export default AccountPage;