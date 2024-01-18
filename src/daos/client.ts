import { Client } from "@/types/client";
import { Cart } from "@/types/order";
import { PrismaClient } from "@prisma/client";

export class ClientDAO {
  db: PrismaClient;
  constructor(db?: PrismaClient) {
    this.db = db || new PrismaClient();
  }
  getDB() {
    return this.db;
  }
  async addClient(name: string) {
    return await this.db.client.create({
      data: {
        name,
      },
    });
  }
  async getClientDetails(clientId: number) {
    return await this.db.client.findFirst({
      where: {
        id: clientId,
      },
    });
  }
  async updateClient(data: Client) {
    const prevDetails = await this.getClientDetails(data.id);
    if (data.totalDiscountAmount && prevDetails !== null) {
      prevDetails.totalDiscountAmount = data.totalDiscountAmount;
    }
    if (data.totalPurchaseAmount && prevDetails !== null) {
      prevDetails.totalPurchaseAmount = data.totalPurchaseAmount;
    }
    if (data.itemPurchasedCount && prevDetails !== null) {
      prevDetails.itemPurchasedCount = data.itemPurchasedCount;
    }
    const cart = await this.db.client.update({
      where: {
        id: data.id,
      },
      data: {
        ...prevDetails,
      },
    });
    return cart;
  }
}
