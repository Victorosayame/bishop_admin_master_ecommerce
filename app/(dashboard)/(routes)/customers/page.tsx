import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import { connectToDB } from "@/lib/mongoDB"
import Customer from "@/models/customer"
import { columns } from "./components/columns"


const CustomerPage = async () => {
  await connectToDB()

  const customers = await Customer.find().sort({ createdAt: "desc" })
  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="my-5 bg-grey-1" />
      <DataTable data={customers} columns={columns} searchKey="name" />
    </div>
  )
}

export const dynamic = "force-dynamic";

export default CustomerPage