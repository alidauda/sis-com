import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { CartItem } from '@prisma/client';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = session.user;
  const data = (await req.json()) as {
    items: CartItem[];
    totalAmount: number;
    totalQuantity: number;
  };

  const orders = await prisma.order.create({
    data: {
      user: {
        connect: {
          id,
        },
      },
      totalQuantity: data.totalQuantity,
      totalAmount: data.totalAmount,
      OrderItems: {
        create: data.items.map((item) => ({
          product: {
            connect: {
              id: item.productId,
            },
          },
          quantity: item.quantity,
        })),
      },
    },
  });
  return NextResponse.json({ orders }, { status: 200 });
}
