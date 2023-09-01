import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('unauthorized');

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (!cart) return NextResponse.json('no item found');
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  });

  return NextResponse.json({ cartItems });
}
