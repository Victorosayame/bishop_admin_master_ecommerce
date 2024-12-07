"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Trash } from "lucide-react"
import { AlertModal } from "@/components/modals/alert-modal"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/image-upload"
import MultiText from "@/components/ui/multitext"
import MultiSelect from "@/components/ui/multiselect"
import Loader from "@/components/ui/loader"


const ProductFormSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0),
  expense: z.coerce.number().min(0),
})

interface ProductFormProps {
  initialData?: ProductType | null //must have ? to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {

  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState<CollectionType[]>([])

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[collections_GET]", error);
      toast.error("Something went wrong! Please try again.")
    }
  }

  useEffect(() => {
    getCollections();
  }, []);


  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData ? {...initialData, collections: initialData.collections.map((collection) => collection._id)} 
    : {
      title: "",
      description: "",
      media: [],
      category: "",
      collections: [],
      tags: [],
      sizes: [],
      colors: [],
      price: 0,
      expense: 0,
    },
  })

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof ProductFormSchema>) => {
    try {
      setLoading(true)
      const url = initialData ? `/api/products/${params.productId}` : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated." : "created."}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (error) {
      console.log("[products_POST]", error)
      toast.error("Something went wrong! Please try again.")
    }
  }

  const onDelete = async () => {
    try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.collectionId}`, {
          method: "DELETE",
        })
  
        if (res.ok) {
          // router.refresh();
          window.location.href = ("/products")
          toast.success("Product deleted.");
        }
    } catch (error) {
        toast.error("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
        setOpen(false);
    }
  }
  return loading ? <Loader /> : (
    <div className='p-10'>

       <AlertModal 
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className='text-heading2-bold'>
            Edit Product
          </p>
        <Button
            type="button"
            variant="destructive"
            disabled={loading}
            size="sm"
            onClick={() => setOpen(true)}
            className="bg-red-1 text-white rounded hover:bg-red-1 hover:text-white"
            >
                <Trash className="h-4 w-4" />
            </Button>
       </div>
    ) : (
      <p className='text-heading2-bold'>
        Create a Product
      </p>
      )}
      <Separator className='my-4 bg-grey-1 mt-4 mb-7' />

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}     className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" {...field} className="rounded border-gray-300" onKeyDown={handleKeyPress}/>
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} rows={5} className="rounded border-gray-300" onKeyDown={handleKeyPress}/>
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload 
                 value={field.value} 
                 onChange={(url) => field.onChange([...field.value, url])}
                 onRemove={(url) => field.onChange([...field.value.filter((image) => image !== url)])}
                />
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />
      <div className="md:grid md:grid-cols-3 gap-8">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} className="rounded border-gray-300" onKeyDown={handleKeyPress}/>
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expenditure ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Expenditure" {...field} className="rounded border-gray-300" onKeyDown={handleKeyPress}/>
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} className="rounded border-gray-300" onKeyDown={handleKeyPress}/>
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <MultiText 
                  placeholder="Tags" 
                  value={field.value} 
                  onChange={(tag) => field.onChange([...field.value, tag])}
                  onRemove={(tagToRemove) => field.onChange([...field.value.filter((tag) => tag !== tagToRemove)])}  
                  />
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />
        
        { collections.length > 0 && (
        <FormField
          control={form.control}
          name="collections"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collections</FormLabel>
              <FormControl>
                <MultiSelect 
                  placeholder="Collections" 
                  collections={collections}
                  value={field.value} 
                  onChange={(_id) => field.onChange([...field.value, _id])}
                  onRemove={(idToRemove) => field.onChange([...field.value.filter((collectionId) => collectionId !== idToRemove)])}  
                 />
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />
        )}

       

        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sizes</FormLabel>
              <FormControl>
                <MultiText 
                  placeholder="Select sizes" 
                  value={field.value} 
                  onChange={(size) => field.onChange([...field.value, size])}
                  onRemove={(sizeToRemove) => field.onChange([...field.value.filter((size) => size !== sizeToRemove)])}  
                  />
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <MultiText 
                  placeholder="Select colors" 
                  value={field.value} 
                  onChange={(color) => field.onChange([...field.value, color])}
                  onRemove={(colorToRemove) => field.onChange([...field.value.filter((color) => color !== colorToRemove)])}  
                  />
              </FormControl>
              <FormMessage className="text-red-1"/>
            </FormItem>
          )}
        />

     </div>

        <div className="flex gap-10">
         <Button type="submit" className="bg-blue-1 text-white rounded hover:text-white hover:bg-blue-1 hover:opacity-70" disabled={loading}>Submit</Button>
         <Button type="button" onClick={() => router.push("/products")} className="bg-blue-1 text-white rounded hover:text-white hover:bg-blue-1 hover:opacity-70" disabled={loading}>Discard</Button>
        </div>
      </form>
    </Form>

    </div>
  )
}

export default ProductForm