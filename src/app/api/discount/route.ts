import { DiscountDAO } from "@/daos/discount";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

type ResponseData = {
  message: string;
};
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("uid");
    const code = await new DiscountDAO().generateDiscountCode();
    await new DiscountDAO().addDiscount({
      code,
      usedById: Number(userId),
    });
    return Response.json({ code });
  } catch (e) {
    console.log(e);
    return Response.json({ message: e });
  }
}
