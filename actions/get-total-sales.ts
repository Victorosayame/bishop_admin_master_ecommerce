import { connectToDB } from "@/lib/mongoDB"
import Order from "@/models/order";

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find()
  const totalOders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  return { totalOders, totalRevenue }
}