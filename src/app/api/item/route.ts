import { OrderDAO } from "@/daos/order";
import { NextRequest } from "next/server";
import { DiscountDAO } from "@/daos/discount";
import { NextApiResponse } from "next";
import { Cart, Item } from "@/types/order";

type ResponseData = {
  message: string;
};

const addItem = async (res: Item) => {
  const resp = new OrderDAO().addItem(res);
  return resp;
};

export async function POST(req: Request, res: NextApiResponse<ResponseData>) {
  try {
    const rev: Item = await req.json();
    console.log("rev", rev);
    const result = await addItem(rev);
    return Response.json({ message: "Added to db successfully!", result });
  } catch (e) {
    console.log(e);
  }
}

export async function PUT(req: Request, res: NextApiResponse<ResponseData>) {
  try {
    const rev: Cart = await req.json();
    console.log("rev", rev);
    const result = new OrderDAO().updateCart(rev);
    return Response.json({ message: "Updated to db successfully!", result });
  } catch (e) {
    console.log(e);
  }
}

export async function GET(req: NextRequest) {
  try {
    const s = req.nextUrl.searchParams.get("s");
    return Response.json({
      data: await new OrderDAO().getAllItems(
        s && s?.length > 0 ? s : undefined
      ),
    });
  } catch (e) {
    console.log(e);
  }
}
