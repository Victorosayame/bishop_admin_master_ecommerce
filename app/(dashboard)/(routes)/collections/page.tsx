"use client"

import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react"
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

const CollectionsPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      })

      const data = await res.json()
      setCollections(data)
      setLoading(false)
    } catch (error) {
      console.log("[collections_GET]", error)
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
    <div className="flex items-center justify-between">
      <p className="text-heading2-bold">Collections</p>
      <Button 
        className="bg-blue-1 text-white hover:text-white hover:bg-blue-1" 
        onClick={() => router.push("/collections/new")}
        disabled={loading}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create collection
      </Button>
    </div>
    <Separator className="my-4 bg-grey-1" />
      <DataTable columns={columns} data={collections} searchKey="title"/>
    </div>
  )
}

export default CollectionsPage