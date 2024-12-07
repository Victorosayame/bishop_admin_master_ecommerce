"use client"

import CollectionForm from "@/components/collection-form";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react"
import ProductForm from "../components/product-form";


const ProductDetails = ({ params }: {
  params: { productId: string }
}) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(null)

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET"
      });
      const data = await res.json()
      setProductDetails(data)
      setLoading(false)
    } catch (error) {
      console.log("[productId_GET]", error)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  return loading ? <Loader /> : (
    <ProductForm initialData={productDetails} />
  )
}

export default ProductDetails