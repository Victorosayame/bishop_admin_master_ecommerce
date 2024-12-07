"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from './ui/separator'
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
import { Textarea } from "./ui/textarea"
import ImageUpload from "./image-upload"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { AlertModal } from "./modals/alert-modal"
import { Trash } from "lucide-react"

const CollectionFormSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string()
})

interface CollectionFormProps {
  initialData?: CollectionType | null //must have ? to make it optional
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {

  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const form = useForm<z.infer<typeof CollectionFormSchema>>({
    resolver: zodResolver(CollectionFormSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: "",
    },
  })

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof CollectionFormSchema>) => {
    try {
      setLoading(true)
      const url = initialData ? `/api/collections/${params.collectionId}` : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Collection ${initialData ? "updated." : "created."}`);
        window.location.href = "/collections";
        router.push("/collections");
      }
    } catch (error) {
      console.log("[collection_POST]", error)
      toast.error("Something went wrong! Please try again.")
    }
  }

  const onDelete = async () => {
    try {
        setLoading(true);
        const res = await fetch(`/api/collections/${params.collectionId}`, {
          method: "DELETE",
        })
  
        if (res.ok) {
          // router.refresh();
          window.location.href = ("/collections")
          toast.success("Collection deleted.");
        }
    } catch (error) {
        toast.error("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
        setOpen(false);
    }
  }
  return (
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
            Edit Collection
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
        Create a Collection
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
                <Input placeholder="Collection Title" {...field} className="rounded border-gray-300" onKeyDown={handleKeyPress}/>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} rows={5} className="rounded border-gray-300" onKeyDown={handleKeyPress}/>
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
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload 
                 value={field.value ? [field.value] : [] } 
                 onChange={(url) => field.onChange(url)}
                 onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-10">
         <Button type="submit" className="bg-blue-1 text-white rounded hover:text-white hover:bg-blue-1 hover:opacity-70">Submit</Button>
         <Button type="button" onClick={() => router.push("/collections")} className="bg-blue-1 text-white rounded hover:text-white hover:bg-blue-1 hover:opacity-70">Discard</Button>
        </div>
      </form>
    </Form>

    </div>
  )
}

export default CollectionForm