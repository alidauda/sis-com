'use client';

import CardWithForm from '@/components/Checkout';
import { Cart } from '@/utils/cart';
import ReactQueryHelper from '@/utils/react-query';
import NextAuthProvider from './session/session';
export default function CheckOutParent({
  cartItems,
}: {
  cartItems: {
    items: {
      quantity: number;
      id: string;
      product: {
        id: string;
        name: string;
        price: string;
        description: string;
        Images: {
          imageUrl: string;
        }[];
      };
    }[];
    total: number;
    quantity: number;
  };
}) {
  return (
    <NextAuthProvider>
      <ReactQueryHelper>
        <CardWithForm cartItems={cartItems} />
      </ReactQueryHelper>
    </NextAuthProvider>
  );
}
