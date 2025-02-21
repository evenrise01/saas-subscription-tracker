"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, Search, Filter, Download, ChevronDown } from 'lucide-react';

const SpendingsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const [mounted, setMounted] = useState(false); // Ensures rendering only on the client

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample data - replace with real data
  const transactions = [
    { id: 1, date: '2024-02-20', merchant: 'Amazon', category: 'Shopping', amount: 99.99, type: 'debit' },
    { id: 2, date: '2024-02-19', merchant: 'Starbucks', category: 'Food & Dining', amount: 5.75, type: 'debit' },
    { id: 3, date: '2024-02-18', merchant: 'Netflix', category: 'Entertainment', amount: 15.99, type: 'debit' },
    { id: 4, date: '2024-02-17', merchant: 'Shell', category: 'Transportation', amount: 45.00, type: 'debit' },
    { id: 5, date: '2024-02-16', merchant: 'Walmart', category: 'Groceries', amount: 156.32, type: 'debit' },
  ];

  const categoryData = [
    { name: 'Shopping', value: 450, color: '#FF6B6B' },
    { name: 'Food & Dining', value: 300, color: '#4ECDC4' },
    { name: 'Entertainment', value: 200, color: '#45B7D1' },
    { name: 'Transportation', value: 250, color: '#96CEB4' },
    { name: 'Groceries', value: 400, color: '#FFEEAD' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Spending Overview</h1>
          <p className="text-gray-500">Track and analyze your spending habits</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl hover:bg-gray-500">
            <Calendar size={16} />
            {selectedPeriod}
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl hover:bg-gray-500">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,600.32</div>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$52.34</div>
            <p className="text-sm text-gray-500">21 transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Largest Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156.32</div>
            <p className="text-sm text-gray-500">Walmart - Groceries</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className='py-4'>Recent Transactions</CardTitle>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border rounded-3xl"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl hover:bg-gray-500">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{transaction.merchant}</p>
                      <p className="text-sm text-gray-500">{transaction.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-500">-${transaction.amount}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Categories */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium">${category.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpendingsPage;