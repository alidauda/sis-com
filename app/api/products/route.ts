import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import * as z from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';

const bodySchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  price: z.string().min(1, { message: 'Price must be at least 1 characters' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters' }),

  quantity: z
    .string()
    .min(1, { message: 'Quantity must be at least 1 characters' }),
  imageInfo: z.array(
    z.object({
      imageUrl: z.string(),
      imageKey: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('Unauthorized');
  const body = await req.json();
  try {
    const value = bodySchema.parse(body);

    const product = await prisma.product.create({
      data: {
        userId: session.user.id,
        name: value.name,
        price: value.price,

        description: value.description,
        quantity: parseInt(value.quantity),
        Images: {
          create: value.imageInfo.map((image) => ({
            imageUrl: image.imageUrl,
            imageKey: image.imageKey,
          })),
        },
      },
    });

    return NextResponse.json({ error: null, product });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const error = e.format();
      return NextResponse.json({ error });
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json({ error: 'Product already exists' });
      }
      if (e.code === 'p1001') {
        return NextResponse.json({ error: 'Something went wrong' });
      }
    }
    return NextResponse.json({ error: 'something went wrong' });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('Unauthorized');
  const products = await prisma.product.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      Images: true,
    },
  });

  try {
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json('something went wrong');
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) throw new Error('Unauthorized');

  const body = (await req.json()) as {
    action: string;
    id: string;
  };
  if (!body) {
    return NextResponse.json({ message: 'No body', data: [] });
  }
  const product = await prisma.product.findUnique({
    where: {
      id: body.id,
    },
  });
  if (!product) {
    return NextResponse.json({ message: 'No product', data: [] });
  }
  if (body.action === 'increment') {
    const data = await prisma.product.update({
      where: {
        id: body.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
    return NextResponse.json({ message: 'Incremented', data });
  }
  if (body.action === 'decrement') {
    const data = await prisma.product.update({
      where: {
        id: body.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    return NextResponse.json({ message: 'Decremented', data });
  }
}
