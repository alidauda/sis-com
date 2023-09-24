import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { CartItem } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as z from 'zod';
const orderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      productId: z.string(),
      userId: z.string(),
    })
  ),
  totalAmount: z.number(),
  totalQuantity: z.number(),
  full_name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  reference: z.string(),
  payemnt_status: z.string(),
});
export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = session.user;
  const data = await req.json();
  const order = orderSchema.parse(data);

  const [] = await prisma.$transaction([await prisma.order.create({})]);
  return NextResponse.json({ orders }, { status: 200 });
}

export async function GET() {
  const session = await getServerAuthSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = session.user;
  const orders = await prisma.order.findUnique({
    where: {
      userId: id,
    },
    include: {
      OrderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return NextResponse.json({ orders }, { status: 200 });
}
