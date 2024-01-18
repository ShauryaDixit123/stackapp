import { Cart, Item } from "@/types/order";
import { PrismaClient } from "@prisma/client";
import { ClientDAO } from "./client";

export class OrderDAO {
  db: PrismaClient;
  getDB() {
    return this.db;
  }
  constructor(db?: PrismaClient) {
    this.db = db || new PrismaClient();
  }
  async addCart(data: Cart) {
    const item = {
      quantity: data.quantity,
      item: data.itemId,
      clientId: data.clientId,
    };
    const cart = await this.db.cart.create({
      data: {
        ...item,
      },
    });
    return cart;
  }
  async getCart(clientId: number) {
    const cart = await this.db.cart.findMany({
      where: {
        clientId,
      },
    });
    return cart;
  }
  async getCartById(id: number) {
    const cart = await this.db.cart.findUnique({
      where: {
        id,
      },
    });
    return cart;
  }
  async updateCart(data: Cart) {
    const prevDetails = await this.getCartById(data.clientId);
    if (data.quantity && prevDetails !== null) {
      prevDetails.quantity = data.quantity;
    }
    if (data.item && prevDetails !== null) {
      prevDetails.item = data.item;
    }
    const cart = await this.db.cart.update({
      where: {
        id: data.id,
      },
      data: {
        ...prevDetails,
      },
    });
    return cart;
  }
  async deletFromCartById(id: number) {
    const cart = await this.db.cart.delete({
      where: {
        id,
      },
    });
    return cart;
  }
  async emptyCart(clientId: number) {
    const cart = await this.db.cart.deleteMany({
      where: {
        clientId,
      },
    });
    return cart;
  }

  async getItemDetails(id: number) {
    return await this.db.item.findUnique({
      where: {
        id,
      },
    });
  }
  async addItem(data: Item) {
    const item = await this.db.item.create({
      data,
    });
    return item;
  }
  async getAllItems(s?: string) {
    if (s) {
      return await this.db.item.findMany({
        where: {
          name: {
            contains: s,
          },
        },
      });
    }
    return await this.db.item.findMany();
  }
}
