import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { CartItem } from '@prisma/client';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = session.user;

  const orders = await prisma.order.create({
    data: {
      user: {
        connect: {
          id: id,
        },
      },
      totalAmount: 4000,
      totalQuantity: 7,
    },
  });
  return NextResponse.json({ orders }, { status: 200 });
}
