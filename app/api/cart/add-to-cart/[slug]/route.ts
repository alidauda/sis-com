import { getServerAuthSession, prisma } from '@/utils/auth';
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
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
        cartItems: {
          some: {
            productId: product.id,
          },
        },
      },
      include: {
        cartItems: true,
      },
    });
    if (cart) {
      const updateCart = await prisma.cartItem.update({
        where: {
          id: cart.cartItems[0].id,
          productId: product.id,
          cart: {
            userId: session.user.id,
          },
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      return NextResponse.json(updateCart);
    }
    const newCartItem = await prisma.cart.create({
      data: {
        userId: session.user.id,
        cartItems: {
          create: {
            productId: productId,
            quantity: 1,
          },
        },
      },
    });
    return NextResponse.json(newCartItem);
  } catch {
    return NextResponse.json('error', {
      status: 500,
    });
  }
}
