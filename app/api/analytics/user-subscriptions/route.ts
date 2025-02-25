import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get all active subscriptions for the user
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: parseInt(userId),
        active: true
      },
      include: {
        service: {
          include: {
            category: true
          }
        }
      }
    });

    // Calculate monthly cost by normalizing all billing cycles
    const totalMonthlyCost = subscriptions.reduce((sum, sub) => {
      let monthlyCost = 0;
      
      switch (sub.billingCycle.toLowerCase()) {
        case 'monthly':
          monthlyCost = Number(sub.billingAmount);
          break;
        case 'yearly':
        case 'annual':
          monthlyCost = Number(sub.billingAmount) / 12;
          break;
        case 'quarterly':
          monthlyCost = Number(sub.billingAmount) / 3;
          break;
        case 'weekly':
          monthlyCost = Number(sub.billingAmount) * 4.33; // Average weeks in a month
          break;
        case 'daily':
          monthlyCost = Number(sub.billingAmount) * 30.44; // Average days in a month
          break;
        default:
          monthlyCost = Number(sub.billingAmount);
      }
      
      return sum + monthlyCost;
    }, 0);

    // Group by category
    const categoryBreakdown: Record<string, { count: number, cost: number }> = {};
    
    subscriptions.forEach(sub => {
      const categoryName = sub.service?.category?.name || 'Uncategorized';
      
      if (!categoryBreakdown[categoryName]) {
        categoryBreakdown[categoryName] = {
          count: 0,
          cost: 0
        };
      }
      
      let monthlyCost = 0;
      switch (sub.billingCycle.toLowerCase()) {
        case 'monthly':
          monthlyCost = Number(sub.billingAmount);
          break;
        case 'yearly':
        case 'annual':
          monthlyCost = Number(sub.billingAmount) / 12;
          break;
        case 'quarterly':
          monthlyCost = Number(sub.billingAmount) / 3;
          break;
        case 'weekly':
          monthlyCost = Number(sub.billingAmount) * 4.33;
          break;
        case 'daily':
          monthlyCost = Number(sub.billingAmount) * 30.44;
          break;
        default:
          monthlyCost = Number(sub.billingAmount);
      }
      
      categoryBreakdown[categoryName].count += 1;
      categoryBreakdown[categoryName].cost += monthlyCost;
    });

    // Generate upcoming renewals
    const now = new Date();
    const nextThirtyDays = new Date();
    nextThirtyDays.setDate(now.getDate() + 30);
    
    const upcomingRenewals = subscriptions
      .filter(sub => {
        const nextBilling = new Date(sub.nextBillingDate);
        return nextBilling >= now && nextBilling <= nextThirtyDays;
      })
      .map(sub => ({
        id: sub.id,
        name: sub.subscriptionName,
        amount: sub.billingAmount,
        date: sub.nextBillingDate,
        service: sub.service?.name || 'Unknown Service'
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({
      totalSubscriptions: subscriptions.length,
      totalMonthlyCost,
      categoryBreakdown,
      upcomingRenewals
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}