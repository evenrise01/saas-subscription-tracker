// types/subscription.ts
export type BillingPeriod = 'monthly' | 'yearly' | 'quarterly' | 'weekly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'paused' | 'trial';
export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  description?: string;
  amount: number;
  currency: Currency;
  billingPeriod: BillingPeriod;
  status: SubscriptionStatus;
  startDate: Date;
  nextBillingDate: Date;
  categoryId: string;
  provider: string;
  website?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  userId: string;
  type: 'spending' | 'trends' | 'category';
  startDate: Date;
  endDate: Date;
  data: Record<string, any>;
  createdAt: Date;
}

export interface UserPreferences {
  id: string;
  userId: string;
  currency: Currency;
  emailNotifications: {
    renewalReminders: boolean;
    priceChanges: boolean;
    weeklyReports: boolean;
  };
  reminderDays: number[];
  theme: 'light' | 'dark' | 'system';
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}