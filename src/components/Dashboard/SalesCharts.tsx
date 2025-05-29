import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { BarChart3, Info } from 'lucide-react'; // BarChart3 for vertical bar chart icon, Radar for radar icon

const salesForecastData = [
  { name: 'Goal', value: 37000, fill: 'hsl(var(--accent))' }, // Blue
  { name: 'Pending', value: 12000, fill: 'hsl(var(--primary))' }, // Green
  { name: 'Revenue', value: 18000, fill: '#F7B84B' }, // Orange/Yellow
];

const dealTypeData = [
  { subject: '2018', Pending: 70, Loss: 30, Won: 90, fullMark: 100 },
  { subject: '2019', Pending: 85, Loss: 20, Won: 75, fullMark: 100 },
  { subject: '2020', Pending: 60, Loss: 45, Won: 80, fullMark: 100 },
  { subject: '2021', Pending: 90, Loss: 15, Won: 95, fullMark: 100 },
  { subject: '2022', Pending: 55, Loss: 50, Won: 60, fullMark: 100 },
  { subject: '2023', Pending: 75, Loss: 25, Won: 88, fullMark: 100 },
];

interface SalesChartsProps {
  className?: string;
}

const SalesCharts: React.FC<SalesChartsProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Sales Forecast</CardTitle>
          <Select defaultValue="nov-2021">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nov-2021">Nov 2021</SelectItem>
              <SelectItem value="oct-2021">Oct 2021</SelectItem>
              <SelectItem value="sep-2021">Sep 2021</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesForecastData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(value) => `$${value / 1000}k`} />
                <YAxis type="category" dataKey="name" width={60} tick={{fontSize: 12}}/>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{paddingTop: '10px'}}/>
                <Bar dataKey="value" nameKey="name" barSize={20} radius={[0, 5, 5, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">Total Forecasted Value</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Deal Type</CardTitle>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize: 10}} />
                <Tooltip />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{paddingTop: '10px'}} />
                <Radar name="Pending" dataKey="Pending" stroke="#F7B84B" fill="#F7B84B" fillOpacity={0.5} />
                <Radar name="Loss" dataKey="Loss" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.5} />
                <Radar name="Won" dataKey="Won" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesCharts;
