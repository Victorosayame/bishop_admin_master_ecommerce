import { connectToDB } from "@/lib/mongoDB";
import Customer from "@/models/customer";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const orders = await Order.find().sort({ createdAt: "desc" })

    const orderDetails = await Promise.all(orders.map(async (order) => {
      const customer = await Customer.findOne({ clerkId: order.customerClerkId })
      return {
        _id: order._id,
        customer: customer.name,
        products: order.products.length,
        totalAmount: order.totalAmount,
        createdAt: format(order.createdAt, "MM do, yyyy"),
      }
    }))

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    console.log("[orders_GET]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";