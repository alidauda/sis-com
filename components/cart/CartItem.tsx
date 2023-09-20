import { getServerAuthSession } from '@/utils/auth';
import CartModal from './model';
import useCartItem from '@/utils/checkOutHelper';
import { getCarItems } from '@/utils/getCarttems';

export default async function CartItem() {
  const data = await getItems();
  if (!data) return;
  return (
    <CartModal items={data.items} quantity={data.quantity} total={data.total} />
  );
}

async function getItems() {
  const session = await getServerAuthSession();
  if (!session?.user) return;
  const data = await getCarItems(session.user.id);

  return data;
}
