"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Collection Name",
    cell: ({ row }) => <p>{row.original.title}</p>
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original._id} />
  }
]