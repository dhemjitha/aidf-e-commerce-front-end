import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductMutation } from "@/lib/api";
import { toast } from "sonner";
import { Camera, Package, Tag, Bookmark, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  brand: z.string().min(1, { message: "Brand name is required" }),
  image: z.string().url({ message: "Must be a valid image URL" }),
  price: z.number().min(0.01, { message: "Price must be at least 0.01" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
});

const CreateProductForm = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      image: "",
      price: "",
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      toast.loading("Creating your product...");
      await createProduct(values).unwrap();
      toast.dismiss();
      toast.success("Product created successfully!");
      form.reset();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to create product");
      console.error(error);
    }
  };

  // Preview image if URL is valid
  const imageUrl = form.watch("image");
  const isValidImageUrl = z.string().url().safeParse(imageUrl).success;

  return (
    <div>
      <Card className="border-0">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Create New Product</CardTitle>
          <CardDescription className="">
            Add a new product to your inventory with all details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-5 gap-6">
            {/* Preview column */}
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="sticky top-6">
                <div className="rounded-lg overflow-hidden bg-slate-50 border mb-4">
                  <div className="aspect-square w-full bg-slate-100 flex items-center justify-center overflow-hidden">
                    {isValidImageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/400/400";
                          e.target.alt = "Invalid image URL";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Camera size={48} />
                        <p className="mt-2 text-sm">Product image preview</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">
                      {form.watch("name") || "Product Name"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {form.watch("brand") || "Brand Name"}
                    </p>
                    <div className="mt-2 text-lg font-bold text-blue-600">
                      {form.watch("price") ? `$${parseFloat(form.watch("price")).toFixed(2)}` : "$0.00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form column */}
            <div className="md:col-span-3 order-1 md:order-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Package className="h-4 w-4" /> Product Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter product name" 
                            {...field} 
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Bookmark className="h-4 w-4" /> Brand Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter brand name" 
                            {...field} 
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Camera className="h-4 w-4" /> Product Image URL
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/product-image.jpg" 
                            {...field} 
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Tag className="h-4 w-4" /> Price
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-8 focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || "";
                                field.onChange(value);
                              }}
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> Product Description
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your product in detail..." 
                            className="min-h-32 focus:ring-2 focus:ring-blue-500"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-6 bg-slate-50">
          <Button variant="outline" disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateProductForm;