import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';
import { TrendingUp } from 'lucide-react'; // Generic icon for chart card

const balanceData = [
  { month: 'Jan', revenue: 22000, expenses: 15000 },
  { month: 'Feb', revenue: 25000, expenses: 18000 },
  { month: 'Mar', revenue: 35000, expenses: 20000 },
  { month: 'Apr', revenue: 30000, expenses: 22000 },
  { month: 'May', revenue: 42000, expenses: 28000 },
  { month: 'Jun', revenue: 38000, expenses: 30000 },
  { month: 'Jul', revenue: 48000, expenses: 32000 },
  { month: 'Aug', revenue: 55000, expenses: 35000 },
  { month: 'Sep', revenue: 60000, expenses: 38000 },
  { month: 'Oct', revenue: 52000, expenses: 40000 },
  { month: 'Nov', revenue: 65000, expenses: 45000 },
  { month: 'Dec', revenue: 70000, expenses: 48000 },
];

const totalRevenue = balanceData.reduce((acc, item) => acc + item.revenue, 0);
const totalExpenses = balanceData.reduce((acc, item) => acc + item.expenses, 0);
const profitRatio = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalRevenue * 100) : 100;

interface BalanceChartProps {
  className?: string;
}

const BalanceChart: React.FC<BalanceChartProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">Balance Overview</CardTitle>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-sm">
              <span className="font-semibold text-primary">${(totalRevenue / 1000).toFixed(0)}k</span> Revenue
            </p>
            <p className="text-sm">
              <span className="font-semibold text-destructive">${(totalExpenses / 1000).toFixed(0)}k</span> Expenses
            </p>
            <p className="text-sm">
              <span className="font-semibold text-foreground">{profitRatio.toFixed(1)}%</span> Profit Ratio
            </p>
          </div>
        </div>
        <Select defaultValue="current-year">
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-year">Current Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{fontSize: 12}}/>
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} tick={{fontSize: 12}} />
              <Tooltip formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name.charAt(0).toUpperCase() + name.slice(1)]} />
              <Legend iconType="circle" iconSize={8} verticalAlign="top" wrapperStyle={{paddingBottom: '20px'}} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }}/>
              <Area type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.1} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceChart;
