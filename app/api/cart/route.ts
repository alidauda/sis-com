import { getServerAuthSession, prisma } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('unauthorized');

  const cart = await prisma.cart.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      cartItems: {
        select: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(cart);
}
