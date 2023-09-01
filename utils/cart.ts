import { Product } from './product';

export type Cart = {
  cartItems: [
    {
      product: Product;
    }
  ];
};
