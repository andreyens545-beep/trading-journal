import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }

    const pairs = await prisma.currencyPair.findMany({
      where: { userId: user.id },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(pairs);
  } catch (error) {
    console.error('Error fetching pairs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }

    const pair = await prisma.currencyPair.create({
      data: {
        name: body.name.toUpperCase(),
        userId: user.id,
      },
    });

    return NextResponse.json(pair);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Pair already exists' }, { status: 409 });
    }
    console.error('Error creating pair:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
