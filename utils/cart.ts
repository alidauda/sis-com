import { Product } from './product';

export type Cart = {
  items: CartItem[];
  total: number;
  quantity: number;
};

type CartItem = {
  product: {
    id: string;
    name: string;
    price: string;
    inStock: boolean;
    Images: {
      imageUrl: string;
    }[];
    description: string;
  };
  quantity: number;
};
