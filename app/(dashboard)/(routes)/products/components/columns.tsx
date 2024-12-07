"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
    cell: ({ row }) => <p>{row.original.title}</p>
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expenditure ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction id={row.original._id} />
  }
]