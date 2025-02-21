"use client";

import {
  AlertCircle,
  ArrowDownIcon,
  ArrowDownRight,
  ArrowUpIcon,
  ArrowUpRight,
  Bell,
  Calendar,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", amount: 186 },
  { month: "February", amount: 305 },
  { month: "March", amount: 237 },
  { month: "April", amount: 73 },
  { month: "May", amount: 209 },
  { month: "June", amount: 214 },
];

const chartConfig = {
  amount: {
    label: "Amount spent",
    color: "hsl(173 58% 39%)",
  },
} satisfies ChartConfig;

const metrics = {
  monthlySpending: 2200,
  previousMonth: 2500,
  savingsRate: 25,
  activeSubscriptions: 3,
};

const subscriptions = [
    { name: 'Netflix', amount: 15.99, nextBilling: '2024-03-15' },
    { name: 'Spotify', amount: 9.99, nextBilling: '2024-03-20' },
    { name: 'AWS', amount: 150.00, nextBilling: '2024-03-01' }
  ];

export default function Component() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700">
          <a href="/subscriptions/new/">Add Subscription</a>
        </button>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Spending Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Spending
            </CardTitle>
            {metrics.monthlySpending < metrics.previousMonth ? (
              <ArrowDownRight className="text-green-500" />
            ) : (
              <ArrowUpRight className="text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.monthlySpending}</div>
            <p className="text-xs text-gray-500">
              {Math.abs(
                ((metrics.monthlySpending - metrics.previousMonth) /
                  metrics.previousMonth) *
                  100
              ).toFixed(1)}
              % from last month
            </p>
          </CardContent>
        </Card>

        {/* Savings Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <CreditCard className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.savingsRate}%</div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${metrics.savingsRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <Calendar className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.activeSubscriptions}
            </div>
            <p className="text-xs text-gray-500">
              Next renewal: Netflix in 5 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Bell className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-yellow-500" />
              <span className="text-sm">2 bills due this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
  <CardHeader>
    <CardTitle className="text-base">Spending Trend</CardTitle>
    <CardDescription>
      Showing subscription spendings for the last 6 months
    </CardDescription>
  </CardHeader>
  <CardContent className="p-2">
    <ChartContainer config={chartConfig} className="h-[500px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 10, right: 10, top: 5, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={true}
          axisLine={true}
          tickMargin={4}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="amount"
          type="natural"
          fill="var(--color-amount)"
          fillOpacity={0.4}
          stroke="var(--color-amount)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  </CardContent>
  <CardFooter className="pt-2">
    <div className="flex w-full items-start gap-1 text-xs">
      <div className="grid gap-1">
        <div className="flex items-center gap-1 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground leading-none">
          Jan - June 2024
        </div>
      </div>
    </div>
  </CardFooter>
</Card>


      <Card>
          <CardHeader>
            <CardTitle>Upcoming Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptions.map(sub => (
                <div key={sub.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-gray-500">Due {new Date(sub.nextBilling).toLocaleDateString()}</p>
                  </div>
                  <span className="font-bold">${sub.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
