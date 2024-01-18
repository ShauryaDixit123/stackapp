import { ClientDAO } from "@/daos/client";
import { DiscountDAO } from "@/daos/discount";
import { OrderDAO } from "@/daos/order";
import { Cart, Item } from "@/types/order";
import { Discount } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const nth = 1;

  const rev: {
    code?: string;
    clientId: number;
  } = await req.json();

  try {
    let discount: Discount | null = null;
    const db = new ClientDAO().getDB();
    const client = await new ClientDAO(db).getClientDetails(
      Number(rev.clientId)
    );
    if (rev.code) {
      discount = await new DiscountDAO(db).getDiscountByCode(rev.code);
      if (discount == null) {
        return Response.json({ message: "Invalid coupon" });
      }
    }
    const temp = async (
      cart: {
        id: number;
        clientId: number;
        item: number;
        quantity: number;
      }[]
    ) => {
      let totalAmount = 0;
      let totalQuan = 0;
      cart.forEach(async (item, i) => {
        if (client !== null) {
          const itemDetails = await new OrderDAO(db).getItemDetails(item.id);
          itemDetails
            ? (totalAmount = totalAmount + itemDetails?.price * item.quantity)
            : null;
          totalQuan = totalQuan + item.quantity;
          if (i == cart.length - 1) {
            if (client.totalOrders / nth === 0 && discount) {
              totalAmount =
                totalAmount - (totalAmount * discount.percent) / 100;
              client.totalDiscountAmount =
                client.totalDiscountAmount +
                (totalAmount * discount.percent) / 100;
            }
            client.totalPurchaseAmount =
              client.totalPurchaseAmount + totalAmount;
            client.totalOrders = client.totalOrders + 1;
            client.itemPurchasedCount = client.itemPurchasedCount + totalQuan;
            await new ClientDAO(db).updateClient(client);
            await new OrderDAO(db).emptyCart(Number(rev.clientId));
          }
        }
      });
    };
    if (client) {
      const cart = await new OrderDAO(db).getCart(Number(rev.clientId));
      await temp(cart);
      return Response.json({ message: "Order placed successfully!" });
    }
  } catch (e) {
    return Response.json({ message: e });
  }
}
export async function GET(req: NextRequest) {
  try {
    const coupon = req.nextUrl.searchParams.get("c");
    const details = await new DiscountDAO().getDiscountByCode(coupon || "");
    return Response.json({ ...details });
  } catch (e) {
    console.log(e);
    return Response.json({ message: e });
  }
}
