"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "clerkId",
    header: "Clerk ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction id={row.original} />
  // }
]