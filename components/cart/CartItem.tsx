import { use } from 'react';
import CartModal from './model';
import useCartItem from '@/utils/checkOutHelper';

export default function CartItem() {
  const { data } = useCartItem();
  return <CartModal cart={data} />;
}
