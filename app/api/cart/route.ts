import { getServerAuthSession, prisma } from '@/utils/auth';
import { NextResponse } from 'next/server';

export default async function Get() {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('unauthorized');

  const cart = await prisma.cart.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return NextResponse.json(cart);
}
