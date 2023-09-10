import { useQuery } from '@tanstack/react-query';
import { Cart } from './cart';

export default function useCartItem() {
  const { data, isLoading } = useQuery(['cartItem'], {
    queryFn: getCartItems,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading };
}
async function getCartItems(): Promise<Cart> {
  const items = await fetch('/api/cart', {
    method: 'GET',
  });
  const res = await items.json();

  return res;
}
