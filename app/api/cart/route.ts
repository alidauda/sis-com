import { getServerAuthSession } from '@/utils/auth';
import prisma from '@/utils/db';
import { getCarItems } from '@/utils/getCarttems';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerAuthSession();
  if (!session?.user) return NextResponse.json('unauthorized');
  const { items, quantity, total } = await getCarItems(session.user.id);

  return NextResponse.json({ items, quantity, total });
}
