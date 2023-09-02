import { Cart } from '@/utils/cart';
import { useQuery } from '@tanstack/react-query';
import CartModal from './model';

export default function CartItem() {
  const { data, isLoading } = useQuery(['cartItem'], {
    queryFn: getCartItems,
  });

  return <CartModal cart={data} />;
}

async function getCartItems(): Promise<Cart> {
  const items = await fetch('/api/cart', {
    method: 'GET',
  });
  const res = await items.json();
  console.log(res);
  return res;
}
