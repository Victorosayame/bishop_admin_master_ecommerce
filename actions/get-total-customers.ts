import { connectToDB } from "@/lib/mongoDB"
import Customer from "@/models/customer"

export const getTotalCustomers = async () => {
  await connectToDB()

  const customers = await Customer.find()
  const totalCustomers = customers.length;
  return totalCustomers
}