"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ArrowUp, ArrowDown, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const TrendsPage = () => {
  const [mounted, setMounted] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState('Last 12 Months');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Sample trend data
  const monthlyTrends = [
    { month: 'Mar', expenses: 4200, average: 4000 },
    { month: 'Apr', expenses: 4100, average: 4000 },
    { month: 'May', expenses: 4300, average: 4000 },
    { month: 'Jun', expenses: 4500, average: 4000 },
    { month: 'Jul', expenses: 4400, average: 4000 },
    { month: 'Aug', expenses: 4600, average: 4000 },
    { month: 'Sep', expenses: 4800, average: 4000 },
    { month: 'Oct', expenses: 4700, average: 4000 },
    { month: 'Nov', expenses: 4900, average: 4000 },
    { month: 'Dec', expenses: 5100, average: 4000 },
    { month: 'Jan', expenses: 4800, average: 4000 },
    { month: 'Feb', expenses: 5000, average: 4000 }
  ];

  const categoryTrends = [
    { category: 'Housing', current: 1500, previous: 1400 },
    { category: 'Food', current: 600, previous: 550 },
    { category: 'Transport', current: 400, previous: 450 },
    { category: 'Utilities', current: 300, previous: 280 },
    { category: 'Entertainment', current: 200, previous: 250 },
    { category: 'Shopping', current: 400, previous: 350 }
  ];

  const renderExpenseTrend = () => {
    if (!mounted) return null;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="expenses" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="average" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderCategoryComparison = () => {
    if (!mounted) return null;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="current" fill="#8884d8" name="Current Period" />
          <Bar dataKey="previous" fill="#82ca9d" name="Previous Period" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const trendingCategories = [
    { name: 'Housing', change: 7.1, increase: true },
    { name: 'Food', change: 9.1, increase: true },
    { name: 'Transport', change: -11.1, increase: false },
    { name: 'Entertainment', change: -20.0, increase: false }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Spending Trends</h1>
          <p className="text-gray-500">Analyze your spending patterns and identify trends</p>
        </div>
        
        {mounted && (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Calendar size={16} />
              {selectedPeriod}
            </button>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,650</div>
            <p className="text-sm text-green-500 flex items-center gap-1">
              <ArrowUp size={16} />
              5.2% vs last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Highest Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,100</div>
            <p className="text-sm text-gray-500">December 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lowest Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,100</div>
            <p className="text-sm text-gray-500">April 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trend Direction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="text-red-500" />
              Upward
            </div>
            <p className="text-sm text-gray-500">Over last 6 months</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {renderExpenseTrend()}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8884d8] rounded-full" />
                <span className="text-sm">Monthly Expenses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#82ca9d] rounded-full" />
                <span className="text-sm">Average</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Category Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {renderCategoryComparison()}
          </CardContent>
        </Card>

        {/* Trending Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Trending Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${category.increase ? 'bg-red-100' : 'bg-green-100'}`}>
                      {category.increase ? (
                        <TrendingUp className={`${category.increase ? 'text-red-500' : 'text-green-500'}`} size={20} />
                      ) : (
                        <TrendingDown className={`${category.increase ? 'text-red-500' : 'text-green-500'}`} size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className={`text-sm ${category.increase ? 'text-red-500' : 'text-green-500'}`}>
                        {category.increase ? '+' : ''}{category.change}% change
                      </p>
                    </div>
                  </div>
                  <DollarSign className="text-gray-400" size={20} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrendsPage;