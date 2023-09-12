import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';

import { NextResponse, NextRequest } from 'next/server';
export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session) return NextResponse.json('Unauthorized');

  const body = (await req.json()) as {
    name: 'string';
    price: number;
    description: 'string';
    image: 'string';
    quantity: number;
  };

  const product = await prisma.product.create({
    data: {
      userId: session.user.id,
      name: body.name,
      price: body.price,
      image: body.image,
      description: body.description,
      quantity: body.quantity,
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
  if (!session) throw new Error('Unauthorized');

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
