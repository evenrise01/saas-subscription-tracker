'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, Clock, Plus, Filter, Check, AlertCircle, DollarSign, CreditCard, ArrowRight } from 'lucide-react';

const RemindersPage = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Sample reminder data
  const upcomingBills = [
    { id: 1, title: 'Netflix Subscription', amount: 15.99, dueDate: '2024-02-25', type: 'subscription', status: 'upcoming' },
    { id: 2, title: 'Electricity Bill', amount: 145.00, dueDate: '2024-02-28', type: 'utility', status: 'upcoming' },
    { id: 3, title: 'Rent Payment', amount: 1200.00, dueDate: '2024-03-01', type: 'housing', status: 'upcoming' },
    { id: 4, title: 'Internet Bill', amount: 79.99, dueDate: '2024-03-05', type: 'utility', status: 'upcoming' }
  ];

  const recentReminders = [
    { id: 5, title: 'Water Bill', amount: 45.00, dueDate: '2024-02-15', type: 'utility', status: 'completed' },
    { id: 6, title: 'Phone Bill', amount: 89.99, dueDate: '2024-02-10', type: 'utility', status: 'completed' },
    { id: 7, title: 'Spotify Premium', amount: 9.99, dueDate: '2024-02-08', type: 'subscription', status: 'completed' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysUntil = (dateString: string): number => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Rest of the component remains the same...
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reminders</h1>
          <p className="text-gray-500">Keep track of your upcoming bills and payments</p>
        </div>
        
        {mounted && (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus size={16} />
              Add Reminder
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$160.99</div>
            <p className="text-sm text-gray-500">2 bills upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,440.98</div>
            <p className="text-sm text-gray-500">4 bills upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recently Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$144.98</div>
            <p className="text-sm text-gray-500">3 bills paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Upcoming Bills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Bills</CardTitle>
            {mounted && (
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1 border rounded-lg hover:bg-gray-50">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {bill.type === 'subscription' ? (
                        <CreditCard className="text-blue-500" size={20} />
                      ) : bill.type === 'utility' ? (
                        <AlertCircle className="text-blue-500" size={20} />
                      ) : (
                        <DollarSign className="text-blue-500" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{bill.title}</p>
                      <p className="text-sm text-gray-500">Due {formatDate(bill.dueDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium">${bill.amount}</p>
                      <p className="text-sm text-orange-500">
                        {getDaysUntil(bill.dueDate)} days left
                      </p>
                    </div>
                    <ArrowRight className="text-gray-400" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReminders.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Check className="text-green-500" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{bill.title}</p>
                      <p className="text-sm text-gray-500">Paid on {formatDate(bill.dueDate)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${bill.amount}</p>
                    <p className="text-sm text-green-500">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RemindersPage;