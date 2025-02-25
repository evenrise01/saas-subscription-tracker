"use client";

import { useState, useEffect } from "react";

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

const chartConfig = {
  amount: {
    label: "Amount spent",
    color: "hsl(173 58% 39%)",
  },
} satisfies ChartConfig;

export default function Component() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for API data
  const [chartData, setChartData] = useState<Array<{month: string, amount: number}>>([]);
  const [metrics, setMetrics] = useState({
    monthlySpending: 0,
    previousMonth: 0,
    savingsRate: 0,
    activeSubscriptions: 0,
  });
  const [subscriptions, setSubscriptions] = useState<Array<{name: string, amount: number, nextBilling: string}>>([]);
  const [nextRenewal, setNextRenewal] = useState({ name: "", daysLeft: 0 });

  // Fetch all necessary data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch spending chart data
        const chartResponse = await fetch('/api/spending/chart');
        if (!chartResponse.ok) throw new Error('Failed to fetch chart data');
        const chartData = await chartResponse.json();
        
        // Fetch metrics
        const metricsResponse = await fetch('/api/metrics');
        if (!metricsResponse.ok) throw new Error('Failed to fetch metrics');
        const metricsData = await metricsResponse.json();
        
        // Fetch subscriptions
        const subscriptionsResponse = await fetch('/api/subscriptions');
        if (!subscriptionsResponse.ok) throw new Error('Failed to fetch subscriptions');
        const subscriptionsData = await subscriptionsResponse.json();
        
        // Process data
        setChartData(chartData);
        setMetrics(metricsData);
        setSubscriptions(subscriptionsData);
        
        // Find next upcoming renewal
        if (subscriptionsData.length > 0) {
          const sortedSubs = [...subscriptionsData].sort((a, b) => 
            new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime()
          );
          
          const nextSub = sortedSubs[0];
          const daysLeft = Math.ceil(
            (new Date(nextSub.nextBilling).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          
          setNextRenewal({
            name: nextSub.name,
            daysLeft: daysLeft
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    if (mounted) {
      fetchData();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true); // Ensures this runs only on the client
  }, []);

  if (!mounted) return null; // Prevents rendering on the server
  
  if (loading) return <div className="p-6">Loading dashboard data...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading data: {error}</div>;

  // Calculate pending alerts
  const pendingBills = subscriptions.filter(sub => {
    const dueDate = new Date(sub.nextBilling);
    const today = new Date();
    const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7 && daysDiff >= 0;
  }).length;

  // Calculate percentage change
  const calculatePercentChange = (current: number, previous: number): string => {
    if (previous === 0) return "0.0";
    return ((Math.abs(current - previous) / previous) * 100).toFixed(1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700">
          <a href="/subscriptions/new/">Add Subscription</a>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              {calculatePercentChange(metrics.monthlySpending, metrics.previousMonth)}
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
              {nextRenewal.daysLeft > 0 
                ? `Next renewal: ${nextRenewal.name} in ${nextRenewal.daysLeft} days`
                : nextRenewal.daysLeft === 0
                  ? `Next renewal: ${nextRenewal.name} today`
                  : 'No upcoming renewals'}
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
              <AlertCircle className={pendingBills > 0 ? "text-yellow-500" : "text-green-500"} />
              <span className="text-sm">
                {pendingBills > 0 
                  ? `${pendingBills} bill${pendingBills === 1 ? '' : 's'} due this week`
                  : 'No bills due this week'}
              </span>
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
              {chartData.length >= 2 && (
                <div className="flex items-center gap-1 font-medium leading-none">
                  {chartData[chartData.length - 1].amount > chartData[chartData.length - 2].amount ? (
                    <>
                      Spending up by {calculatePercentChange(
                        chartData[chartData.length - 1].amount,
                        chartData[chartData.length - 2].amount
                      )}% this month{" "}
                      <TrendingUp className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Spending down by {calculatePercentChange(
                        chartData[chartData.length - 2].amount,
                        chartData[chartData.length - 1].amount
                      )}% this month{" "}
                      <ArrowDownIcon className="h-3 w-3" />
                    </>
                  )}
                </div>
              )}
              <div className="text-muted-foreground leading-none">
                {chartData.length > 0 ? 
                  `${chartData[0].month} - ${chartData[chartData.length - 1].month} ${new Date().getFullYear()}` : 
                  'No data available'}
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
          {subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div key={sub.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-gray-500">
                      Due {new Date(sub.nextBilling).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-bold">${sub.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No active subscriptions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}