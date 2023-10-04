import OrdersComponent from '@/components/OrderComponent';
import { getServerAuthSession } from '@/utils/auth';
import { getOrders } from '@/utils/helpers/order';
import { Orders } from '@/utils/order';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/');
  }
  const data = await getOrders(session.user.id);

  return <OrdersComponent data={data} />;
}
