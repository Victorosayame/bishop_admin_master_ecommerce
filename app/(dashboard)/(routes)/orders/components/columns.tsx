"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => <p>{row.original._id}</p>
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount ($)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original._id} />
  }
]