"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Share2, ChevronDown, Printer } from 'lucide-react';

const ReportsPage = () => {
  const [mounted, setMounted] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState('Last 6 Months');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Sample data
  const monthlyData = [
    { month: 'Sep', income: 5200, expenses: 4100, savings: 1100 },
    { month: 'Oct', income: 5400, expenses: 4300, savings: 1100 },
    { month: 'Nov', income: 5100, expenses: 4000, savings: 1100 },
    { month: 'Dec', income: 5600, expenses: 4800, savings: 800 },
    { month: 'Jan', income: 5300, expenses: 4200, savings: 1100 },
    { month: 'Feb', income: 5500, expenses: 4400, savings: 1100 },
  ];

  const categoryExpenses = [
    { category: 'Housing', amount: 1500 },
    { category: 'Transportation', amount: 400 },
    { category: 'Food', amount: 600 },
    { category: 'Utilities', amount: 300 },
    { category: 'Entertainment', amount: 200 },
    { category: 'Healthcare', amount: 150 },
  ];

  const renderOverviewChart = () => {
    if (!mounted) return null;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} />
          <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} />
          <Line type="monotone" dataKey="savings" stroke="#60a5fa" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderCategoryChart = () => {
    if (!mounted) return null;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryExpenses} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Financial Reports</h1>
          <p className="text-gray-500">Analyze your financial performance and trends</p>
        </div>
        
        {mounted && (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Calendar size={16} />
              {selectedPeriod}
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Share2 size={16} />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Download size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Printer size={16} />
              Print
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$32,100</div>
            <p className="text-sm text-gray-500">+5.2% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">$25,800</div>
            <p className="text-sm text-gray-500">+3.8% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">$6,300</div>
            <p className="text-sm text-gray-500">+8.5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19.6%</div>
            <p className="text-sm text-gray-500">Target: 20%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Reports */}
      <div className="space-y-6">
        {/* Income vs Expenses Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {renderOverviewChart()}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-sm">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <span className="text-sm">Expenses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-sm">Savings</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {renderCategoryChart()}
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-700">Positive Trends</h3>
                <ul className="mt-2 space-y-1 text-sm text-green-600">
                  <li>• Savings rate increased by 8.5% compared to last period</li>
                  <li>• Consistent income growth over the last 3 months</li>
                  <li>• Successfully reduced entertainment expenses by 15%</li>
                </ul>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-medium text-red-700">Areas for Improvement</h3>
                <ul className="mt-2 space-y-1 text-sm text-red-600">
                  <li>• Housing expenses increased by 3% above budget</li>
                  <li>• Transportation costs showing upward trend</li>
                  <li>• Utility bills higher than seasonal average</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-700">Recommendations</h3>
                <ul className="mt-2 space-y-1 text-sm text-blue-600">
                  <li>• Review housing expenses for potential savings</li>
                  <li>• Consider energy-efficient alternatives for utilities</li>
                  <li>• Explore transportation alternatives or carpooling</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;