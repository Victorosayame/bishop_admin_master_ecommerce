import { connectToDB } from "@/lib/mongoDB"
import Order from "@/models/order"

export const getSalesPerMonth = async () => {
  await connectToDB()

  const orders = await Order.find()

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth()
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    return acc
  }, {})

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(0, i))
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}