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
  imageUrl: z
    .string()
    .min(3, { message: 'ImageUrl must be at least 3 characters' }),
  imageKey: z
    .string()
    .min(3, { message: 'ImageKey must be at least 3 characters' }),
  quantity: z
    .string()
    .min(1, { message: 'Quantity must be at least 1 characters' }),
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
        imageUrl: value.imageUrl,
        imageKey: value.imageKey,
        description: value.description,
        quantity: parseInt(value.quantity),
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
