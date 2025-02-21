import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowUpIcon, AlertCircle, ArrowDownIcon, Calendar, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SpendingChart } from './spending-chart';

const DashboardPage = () => {
  // Sample data
  const chartData = [
    { month: 'Jan', amount: 320 },
    { month: 'Feb', amount: 350 },
    { month: 'Mar', amount: 400 },
    { month: 'Apr', amount: 450 },
    { month: 'May', amount: 470 },
    { month: 'Jun', amount: 500 },
  ];

  const upcomingPayments = [
    { 
      name: 'Netflix', 
      date: 'Mar 25', 
      amount: 15.99, 
      logo: 'N',
      description: 'Entertainment' 
    },
    { 
      name: 'Spotify', 
      date: 'Mar 27', 
      amount: 9.99, 
      logo: 'S',
      description: 'Music' 
    },
    { 
      name: 'AWS', 
      date: 'Mar 30', 
      amount: 150.00, 
      logo: 'A',
      description: 'Cloud Services' 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your subscription expenses.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Subscription
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,850.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-red-500">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                2 cancelled this month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart data={chartData} />

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Subscriptions due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div
                    key={payment.name}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{payment.logo}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{payment.name}</p>
                        <p className="text-sm text-muted-foreground">{payment.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {payment.date}
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">
                      ${payment.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;