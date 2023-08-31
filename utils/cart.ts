import { Product } from './product';

export type Cart = {
  cartItems: Product[];
  quantity: number;
  cartId: string;
};
