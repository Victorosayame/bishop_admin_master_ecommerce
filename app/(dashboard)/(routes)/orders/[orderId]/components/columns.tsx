"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <p>{row.original.product.title}</p>
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original.product._id} />
  }
]