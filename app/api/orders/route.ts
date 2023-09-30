import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { CartItem, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const orderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      product: z.object({
        id: z.string(),
      }),
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
  try {
    const { id } = session.user;
    const data = await req.json();
    const order = orderSchema.parse(data);

    const [orders, deleteMany] = await prisma.$transaction([
      prisma.order.create({
        data: {
          name: order.full_name,
          email: order.email,
          phoneNumber: order.phoneNumber,
          address: order.address,
          city: order.city,
          country: order.country,
          state: order.state,
          reference: order.reference,
          totalAmount: order.totalAmount,
          totalQuantity: order.totalQuantity,

          user: {
            connect: {
              id: id,
            },
          },
          OrderItems: {
            create: order.items.map((item) => {
              return {
                quantity: item.quantity,
                product: {
                  connect: {
                    id: item.product.id,
                  },
                },
              };
            }),
          },
        },
      }),
      prisma.cartItem.deleteMany({
        where: {
          userId: id,
        },
      }),
    ]);
    return NextResponse.json({ orders }, { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const error = e.format();
      return NextResponse.json(
        { error, errorType: 'zod Error' },
        { status: 400 }
      );
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json({ error: 'Duplicate order' }, { status: 400 });
      }
      return NextResponse.json({ error: e }, { status: 404 });
    }
  }
}

export async function GET() {
  const session = await getServerAuthSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = session.user;
  const orders = await prisma.order.findMany({
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
