"use client"

import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import { columns } from './components/columns'
import Loader from '@/components/ui/loader'

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`)
      const data = await res.json()
      setOrders(data)
      setLoading(false)
      
    } catch (error) {
      console.log("[orders_GET]", error)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])
  
  return loading ? <Loader /> : (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Orders</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={orders} searchKey='_id' />
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Orders