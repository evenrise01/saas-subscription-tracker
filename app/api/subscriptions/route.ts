import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const where = userId ? { userId: parseInt(userId) } : {};
    
    const subscriptions = await prisma.subscription.findMany({
      where,
      include: {
        service: true
      }
    });
    
    return NextResponse.json(subscriptions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const subscriptionData = await request.json();
    const newSubscription = await prisma.subscription.create({
      data: subscriptionData
    });
    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}