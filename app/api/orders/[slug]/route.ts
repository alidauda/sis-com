import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json(
      {
        error: {
          message: 'Unauthorized',
        },
        order: null,
      },
      {
        status: 401,
      }
    );
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(params.slug),
      },
      include: {
        OrderItems: {
          include: {
            product: {
              include: {
                Images: true,
              },
            },
          },
        },
      },
    });
    if (!order) {
      return NextResponse.json(
        {
          error: {
            message: 'Order not found',
          },
          order: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: null, order: order });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: {
            message: 'Order not found',
          },
          order: null,
        },
        { status: 404 }
      );
    }
  }
  return NextResponse.json(
    {
      error: {
        message: 'Something went wrong',
      },
      order: null,
    },
    { status: 500 }
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json(
      {
        error: {
          message: 'Unauthorized',
        },
        order: null,
      },
      {
        status: 401,
      }
    );
  }

  const body = (await request.json()) as { state: string };
  if (!body) {
    return NextResponse.json(
      {
        error: {
          message: 'Invalid body',
        },
        order: null,
      },
      { status: 400 }
    );
  }

  try {
    if (body.state === 'COMPLETED') {
      const order = await prisma.order.update({
        where: {
          id: parseInt(params.slug),
        },
        data: {
          status: 'COMPLETED',
        },
      });
      return NextResponse.json({ error: null, order: order });
    }

    if (body.state === 'REJECTED') {
      const order = await prisma.order.update({
        where: {
          id: parseInt(params.slug),
        },
        data: {
          status: 'REJECTED',
        },
      });
      return NextResponse.json({ error: null, order: order });
    }
    if (body.state === 'CANCELLED') {
      const order = await prisma.order.update({
        where: {
          id: parseInt(params.slug),
        },
        data: {
          status: 'CANCELLED',
        },
      });
      return NextResponse.json({ error: null, order: order });
    }
    return NextResponse.json({ error: null, order: null });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: {
            message: 'Order not found',
          },
          order: null,
        },
        { status: 404 }
      );
    }
    return NextResponse.json({ error, order: null });
  }
}
