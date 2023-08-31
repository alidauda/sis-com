'use client';
import ReactQueryHelper from '@/utils/react-query';
import CartItem from './CartItem';

export default function CartWrapper() {
  return (
    <ReactQueryHelper>
      <CartItem />
    </ReactQueryHelper>
  );
}
