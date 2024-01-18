import { ClientDAO } from "@/daos/client";
import { OrderDAO } from "@/daos/order";
import { Cart } from "@/types/order";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

type ResponseData = {
  message: string;
};

const addClient = async (res: { name: string }) => {
  try {
    const resp = new ClientDAO().addClient(res.name);
    return resp;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export async function POST(req: Request, res: NextApiResponse<ResponseData>) {
  const rev = await req.json();
  console.log("rev", rev);
  const result = await addClient(rev);
  return Response.json({ message: "Review created successfully!", result });
}

export async function GET(req: NextRequest) {
  const cid = req.nextUrl.searchParams.get("cid");
  try {
    const resp = new ClientDAO().getClientDetails(Number(cid));
    return resp;
  } catch (e) {
    console.log(e);
  }
}
