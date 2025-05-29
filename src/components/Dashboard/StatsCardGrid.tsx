import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Coins, TrendingUp, Wallet, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react'; // Using Wallet for Daily Average Income

interface StatCardData {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor: string;
  trend?: 'up' | 'down' | null;
  trendText?: string;
}

const statCardData: StatCardData[] = [
  {
    id: 'campaignSent',
    title: 'CAMPAIGN SENT',
    value: '197',
    icon: Megaphone,
    iconBgColor: 'bg-sky-100 text-sky-600',
    trend: null,
  },
  {
    id: 'annualProfit',
    title: 'ANNUAL PROFIT',
    value: '$489.4k',
    icon: Coins,
    iconBgColor: 'bg-green-100 text-green-600',
    trend: 'up',
    trendText: '+22.3%'
  },
  {
    id: 'leadConversation',
    title: 'LEAD CONVERSATION',
    value: '32.89%',
    icon: TrendingUp,
    iconBgColor: 'bg-red-100 text-red-600', // Icon itself suggests up, but color can be different as per image
    trend: 'down',
    trendText: '-2.8%'
  },
  {
    id: 'dailyAvgIncome',
    title: 'DAILY AVERAGE INCOME',
    value: '$1,596.5',
    icon: Wallet,
    iconBgColor: 'bg-yellow-100 text-yellow-600',
    trend: 'up',
    trendText: '+5.2%'
  },
];

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {statCardData.map((stat) => (
        <Card key={stat.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                {stat.trendText && (
                  <div className={cn(
                    'text-xs mt-2 flex items-center',
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {stat.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {stat.trendText}
                    <span className="text-muted-foreground ml-1">vs. previous month</span>
                  </div>
                )}
              </div>
              <div className={cn('p-3 rounded-md flex items-center justify-center', stat.iconBgColor)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCardGrid;
