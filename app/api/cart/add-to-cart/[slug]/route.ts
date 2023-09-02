import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { NextResponse } from 'next/server';
export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const productId = params.slug;
  const session = await getServerAuthSession();

  if (!session) return NextResponse.json('unauthorized');
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product)
      return NextResponse.json('product not found', {
        status: 404,
      });
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        productId: productId,
      },
    });
    if (cartItem) {
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
    const newCartItem = await prisma.cartItem.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        quantity: 1,
        product: {
          connect: {
            id: productId,
          },
        },
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(newCartItem);
  } catch (e) {
    return NextResponse.json(e, {
      status: 500,
    });
  }
}
