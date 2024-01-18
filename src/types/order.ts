export type Discount = {
  id?: number;
  code: string;
  percent?: number;
  usedById: number;
};

export type Cart = {
  id: number;
  clientId: number;
  item: number;
  quantity: number;
  itemId: number;
};

export type Item = {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  imageSrc: string;
  imageAlt: string;
};
