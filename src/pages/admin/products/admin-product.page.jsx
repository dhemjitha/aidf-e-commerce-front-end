import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Cpu,
  Layers,
  Battery,
  Monitor,
  Star,
  Laptop,
  ArrowLeft,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useGetProductsByIdQuery, 
  useDeleteProductMutation,
  useGetProductsQuery 
} from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

export default function AdminProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { 
    data: product, 
    isLoading, 
    isError,
    error,
    refetch
  } = useGetProductsByIdQuery(id);

  const [deleteProduct] = useDeleteProductMutation();
  const { refetch: refetchProductsList } = useGetProductsQuery();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
      await refetchProductsList();
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || "Error deleting product");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-x-2 mb-8">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-8 w-48" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Skeleton className="w-full h-[400px] rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-24 w-full rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-8 flex items-center gap-x-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Button>
        
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.data?.message || "Failed to load product details"}
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-2 py-8">
      <Button 
        variant="ghost" 
        onClick={handleBack} 
        className="mb-8 flex items-center gap-x-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image and Actions */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="relative aspect-square w-full bg-gray-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x600/e2e8f0/64748b?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  No Image Available
                </div>
              )}
            </div>
          </Card>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-x-2" 
            >
              <Pencil className="h-4 w-4" /> Edit Product
            </Button>
            <Button 
              variant="destructive" 
              className="flex items-center gap-x-2" 
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" /> Delete Product
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Header */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    Brand: <span className="font-medium ml-1">{product.brand}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                  ${parseFloat(product.price).toFixed(2)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-x-4 mt-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">
                    {product?.rating ? parseFloat(product.rating).toFixed(1) : "N/A"}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews ? `${product.reviews} reviews` : "No reviews yet"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Product Categories */}
          <div className="flex flex-wrap gap-2">
            {product.category && (
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                {product.category}
              </Badge>
            )}
            {/* You can add more dynamic badges based on product attributes */}
            <Badge variant="outline" className="border-blue-500/30 text-blue-600 bg-blue-50">
              {product.inStock !== false ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          {/* Product Description */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              {product.description ? (
                <p className="text-muted-foreground">{product.description}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No description available</p>
              )}
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Cpu className="h-5 w-5 mr-3 text-blue-500" />
                  <span className="text-sm">Processor</span>
                </div>
                <div className="flex items-center">
                  <Layers className="h-5 w-5 mr-3 text-green-500" />
                  <span className="text-sm">RAM</span>
                </div>
                <div className="flex items-center">
                  <Monitor className="h-5 w-5 mr-3 text-purple-500" />
                  <span className="text-sm">Display</span>
                </div>
                <div className="flex items-center">
                  <Battery className="h-5 w-5 mr-3 text-red-500" />
                  <span className="text-sm">Battery</span>
                </div>
                <div className="flex items-center">
                  <Laptop className="h-5 w-5 mr-3 text-indigo-500" />
                  <span className="text-sm">Storage</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 pt-3">
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Product ID</span>
                  <span className="font-medium">{id}</span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Created At</span>
                  <span className="font-medium">
                    {product.createdAt 
                      ? new Date(product.createdAt).toLocaleDateString() 
                      : "N/A"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">
                    {product.updatedAt
                      ? new Date(product.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{product?.name}" and remove it from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}