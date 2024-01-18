export interface Client {
  id: number;
  name?: string;
  totalOrders?: number;
  itemPurchasedCount?: number;
  totalPurchaseAmount?: number;
  totalDiscountAmount?: number;
}
