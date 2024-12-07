"use client"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./components/columns";

const ProductsPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      })

      const data = await res.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.log("[products_GET]", error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  return loading ? <Loader /> : (
    <div className="px-10 py-5">
    <div className="flex items-center justify-between">
      <p className="text-heading2-bold">Products</p>
      <Button 
       className="bg-blue-1 text-white hover:text-white hover:bg-blue-1" 
       onClick={() => router.push("/products/new")}
       disabled={loading}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create product
      </Button>
    </div>
    <Separator className="my-4 bg-grey-1" />
      <DataTable columns={columns} data={products} searchKey="title"/>
    </div>
  )
}

export default ProductsPage