import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subscriptionId = parseInt(params.id);
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: {
        service: true,
        payments: true
      }
    });
    
    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }
    
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subscriptionId = parseInt(params.id);
    const subscriptionData = await request.json();
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: subscriptionData
    });
    return NextResponse.json(updatedSubscription);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subscriptionId = parseInt(params.id);
    await prisma.subscription.delete({
      where: { id: subscriptionId }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}