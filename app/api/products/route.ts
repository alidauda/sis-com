import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';

import { NextResponse, NextRequest } from 'next/server';
export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('Unauthorized');

  const body = (await req.json()) as {
    name: string;
    price: string;
    description: string;
    imageUrl: string;
    imageKey: string;
    quantity: string;
  };

  const product = await prisma.product.create({
    data: {
      userId: session.user.id,
      name: body.name,
      price: body.price,
      imageUrl: body.imageUrl,
      imageKey: body.imageKey,
      description: body.description,
      quantity: parseInt(body.quantity),
    },
  });

  try {
    return NextResponse.json({ product });
  } catch (e) {
    console.error(e);
    return NextResponse.json('something went wrong');
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
