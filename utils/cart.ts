import { Product } from './product';

export type Cart = {
  items: [
    {
      product: Product;
      quantity: number;
    }
  ];
  quantity: number;
  total: number;
};
