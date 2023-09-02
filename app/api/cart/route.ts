import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('unauthorized');
  let quantity = 0;
  let total = 0;
  const items = await prisma.cartItem.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: true,
    },
  });
  for (let i of items) {
    const sum = i.product.price * i.quantity;
    quantity += i.quantity;
    total += sum;
  }
  return NextResponse.json({ items, quantity, total });
}
