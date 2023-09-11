import CheckOutParent from '@/components/CheckOutParent';
import { getServerAuthSession } from '@/utils/auth';
import { Cart } from '@/utils/cart';
import prisma from '@/utils/db';
import { getCarItems } from '@/utils/getCarttems';
import { redirect } from 'next/navigation';

export default async function CheckOut() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/');
  }
  const cartItems = await getCarItems(session.user.id);
  console.log(cartItems);

  return <CheckOutParent cartItems={cartItems} />;
}
