'use client';

import CardWithForm from '@/components/Checkout';
import { Cart } from '@/utils/cart';
import ReactQueryHelper from '@/utils/react-query';
export default function CheckOutParent({
  cartItems,
}: {
  cartItems:
    | {
        items: {
          quantity: number;
          product: {
            id: string;
            quantity: number;
            name: string;
            price: number;
            description: string;
            image: string;
          };
        }[];
        total: number;
        quantity: number;
      }
    | undefined;
}) {
  return (
    <ReactQueryHelper>
      <CardWithForm cartItems={cartItems} />
    </ReactQueryHelper>
  );
}
