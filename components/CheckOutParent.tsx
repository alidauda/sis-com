'use client';

import CardWithForm from '@/components/Checkout';
import { Cart } from '@/utils/cart';
import ReactQueryHelper from '@/utils/react-query';
export default function CheckOutParent({ cart }: { cart: Cart | undefined }) {
  return (
    <ReactQueryHelper>
      <CardWithForm amount={amount} />
    </ReactQueryHelper>
  );
}
