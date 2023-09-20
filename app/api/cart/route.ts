import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { getCarItems } from '@/utils/getCarttems';
import { NextResponse } from 'next/server';
import * as z from 'zod';
const incDcschema = z.object({
  type: z.enum(['minus', 'plus']),
  id: z.string(),
  del: z.boolean(),
});
export async function GET() {
  const session = await getServerAuthSession();
  if (!session?.user) return NextResponse.json('unauthorized');
  const { items, quantity, total } = await getCarItems(session.user.id);

  return NextResponse.json({ items, quantity, total });
}

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session?.user) return NextResponse.json('unauthorized');
  const body = await req.json();
  try {
    const data = incDcschema.parse(body);
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!cartItem)
      return NextResponse.json('cart item not found', { status: 404 });
    if (data.type === 'plus') {
      const updateCartItem = await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      return NextResponse.json(updateCartItem);
    }
    if (data.type === 'minus') {
      const updateCartItem = await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
      return NextResponse.json(updateCartItem);
    }
    if (data.del) {
      const deleteCartItem = await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });
      return NextResponse.json(deleteCartItem);
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      const error = e.format();
      return NextResponse.json(error, { status: 400 });
    }
  }
}
