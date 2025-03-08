import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useCreateProductMutation } from "@/lib/api"

const formSchema = z.object({
    name: z.string().min(1, { message: "Product Name is required" }),
    brand: z.string().min(1, { message: "Product Brand is required" }),
    image: z.string().url({ message: "Product Image must be a valid URL" }),
    price: z.number().min(1, { message: "Product Price is required" }),
    description: z.string().min(1, { message: "Product Description is required" }),
})

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
    })

    const handleSubmit = async (values) => {
        const { name, brand, image, price, description } = values;
        try {
            toast.loading("Creating Product...");
            await createProduct({
                name,
                brand,
                image,
                price,
                description,
            }).unwrap();
            toast.dismiss();
            toast.success("Product Created Successfully");
        } catch (error) {
            toast.dismiss();
            toast.error("Product Creation Failed");
        }
    }

    return (
        <Form {...form}>
            <form className="lg:w-1/2" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the Product Name" {...field} />
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
                            <FormLabel>Product Brand Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the Product Brand Name" {...field} />
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
                            <FormLabel>Product Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the Product Image URL" {...field} />
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
                            <FormLabel>Product Retail Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter the Product Retail Price"
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value) || 0;
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                />
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
                            <FormLabel>Product Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter the Product Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Product"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateProductForm;