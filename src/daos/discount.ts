import { Discount } from "@/types/order";
import { PrismaClient } from "@prisma/client";

export class DiscountDAO {
  crypto: Crypto;
  db: PrismaClient;
  getDB() {
    return this.db;
  }
  constructor(db?: PrismaClient) {
    this.db = db || new PrismaClient();
    this.crypto = require("crypto");
  }
  dec2hex(dec: number) {
    return dec.toString(16).padStart(2, "0");
  }
  async generateDiscountCode(len?: number) {
    var arr = new Uint8Array((len || 24) / 2);
    this.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
  }
  async addDiscount(data: Discount) {
    const discount = await this.db.discount.create({
      data,
    });
    return discount;
  }
  async getDiscountByCode(code: string) {
    const discount = await this.db.discount.findUnique({
      where: {
        code,
      },
    });
    return discount;
  }
}
