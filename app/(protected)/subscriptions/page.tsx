import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Plus, MoreVertical } from 'lucide-react';

export default function SubscriptionsPage() {
  const subscriptions = [
    {
      name: 'Netflix',
      category: 'Entertainment',
      amount: 15.99,
      billingCycle: 'Monthly',
      nextPayment: '2024-03-25',
      status: 'active'
    },
    {
      name: 'Spotify',
      category: 'Music',
      amount: 9.99,
      billingCycle: 'Monthly',
      nextPayment: '2024-03-27',
      status: 'active'
    },
    {
      name: 'AWS',
      category: 'Cloud Services',
      amount: 150.00,
      billingCycle: 'Monthly',
      nextPayment: '2024-03-30',
      status: 'active'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Subscriptions List */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {subscriptions.map((sub) => (
              <div key={sub.name} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src="/api/placeholder/40/40" alt={sub.name} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-medium">{sub.name}</h3>
                    <p className="text-sm text-gray-500">{sub.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-medium">${sub.amount}</p>
                    <p className="text-sm text-gray-500">{sub.billingCycle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Next Payment</p>
                    <p className="text-sm text-gray-500">{sub.nextPayment}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {sub.status}
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}