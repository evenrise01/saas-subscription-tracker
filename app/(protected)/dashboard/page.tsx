import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, ArrowUpIcon, AlertCircle, ArrowDownIcon, BarChart, Calendar } from 'lucide-react';
import React from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

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
    { name: 'Netflix', date: 'Mar 25', amount: 15.99, icon: '/api/placeholder/32/32' },
    { name: 'Spotify', date: 'Mar 27', amount: 9.99, icon: '/api/placeholder/32/32' },
    { name: 'AWS', date: 'Mar 30', amount: 150.00, icon: '/api/placeholder/32/32' },
  ];
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Subscription
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,850.00</div>
            <div className="flex items-center pt-1 text-green-600">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1 text-red-600">
              <ArrowDownIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">2 cancelled this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {/* <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src={payment.icon} alt={payment.name} className="w-8 h-8 rounded" />
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {payment.date}
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold">${payment.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
