import { OrderDAO } from "@/daos/order";
import { Cart } from "@/types/order";
import { PrismaClient } from "@prisma/client";
import exp from "constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

type ResponseData = {
  message: string;
};

const addCart = async (res: Cart) => {
  const resp = new OrderDAO().addCart(res);
  return resp;
};

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const rev: Cart = await req.json();
    console.log("rev", rev);
    const uid = req.nextUrl.searchParams.get("uid");
    const cart = await new OrderDAO().getCart(Number(uid));
    if (cart.length > 0) {
      const item = cart.find((item) => item.id === rev.id);
      if (item) {
        item.quantity = item.quantity + rev.quantity;
        await new OrderDAO().updateCart({ ...item, itemId: item.id });
        return Response.json({
          message: "Updated cart successfully!",
        });
      }
    }
    const result = await addCart(rev);
    const cartList = await new OrderDAO().getCart(Number(uid));
    return Response.json({
      message: "Added to cart successfully!",
      list: cartList,
    });
  } catch (e) {
    console.log(e);
    return Response.json({ message: e });
  }
}

export async function PUT(req: Request, res: NextApiResponse<ResponseData>) {
  try {
    const rev: Cart = await req.json();
    console.log("rev", rev);
    const result = new OrderDAO().updateCart(rev);
    return Response.json({ message: "Updated cart successfully!", result });
  } catch (e) {
    console.log(e);
    return Response.json({ message: e });
  }
}

export async function GET(req: NextRequest) {
  try {
    const mid = req.nextUrl.searchParams.get("mid");
    return Response.json({
      result: await new OrderDAO().getCart(Number(mid)),
    });
  } catch (e) {
    console.log(e);
    return Response.json({ message: e });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const itemId = req.nextUrl.searchParams.get("id");
    const result = await new OrderDAO().deletFromCartById(Number(itemId));
    return Response.json({ message: "Deleted cart successfully!", result });
  } catch (e) {
    console.log(e);
    return Response.json({ message: e });
  }
}
