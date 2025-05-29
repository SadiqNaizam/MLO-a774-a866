import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  representative: {
    name: string;
    avatarUrl?: string;
    fallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation' | 'New Lead';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    representative: { name: 'Donald Risher', avatarUrl: 'https://i.pravatar.cc/40?u=donald', fallback: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    representative: { name: 'Sofia Cunha', avatarUrl: 'https://i.pravatar.cc/40?u=sofia', fallback: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    representative: { name: 'Luis Rocha', avatarUrl: 'https://i.pravatar.cc/40?u=luis', fallback: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    representative: { name: 'Vitoria Rodrigues', avatarUrl: 'https://i.pravatar.cc/40?u=vitoria', fallback: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Tech Corp Inc.',
    lastContacted: 'Oct 02, 2021',
    representative: { name: 'Michael Brown', avatarUrl: 'https://i.pravatar.cc/40?u=michael', fallback: 'MB' },
    status: 'Negotiation' as const,
    dealValue: '$220K',
  },
  {
    id: '6',
    name: 'Innovate Solutions',
    lastContacted: 'Oct 05, 2021',
    representative: { name: 'Jessica Williams', avatarUrl: 'https://i.pravatar.cc/40?u=jessica', fallback: 'JW' },
    status: 'New Lead' as const,
    dealValue: '$95K',
  },
];

const getStatusBadgeClass = (status: Deal['status']): string => {
  switch (status) {
    case 'Deal Won':
      return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200';
    case 'Intro Call':
      return 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200';
    case 'Stuck':
      return 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200';
    case 'Negotiation':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200';
    case 'New Lead':
      return 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';
  }
};

interface DealsTableProps {
  className?: string;
}

const DealsTable: React.FC<DealsTableProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">Deals Status</CardTitle>
        <Select defaultValue="nov-dec-2021">
          <SelectTrigger className="w-auto h-8 text-xs">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-muted-foreground"/>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-dec-2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="oct-nov-2021">01 Oct 2021 to 30 Nov 2021</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="py-2.5 px-4">Name</TableHead>
              <TableHead className="py-2.5 px-4">Last Contacted</TableHead>
              <TableHead className="py-2.5 px-4">Sales Representative</TableHead>
              <TableHead className="py-2.5 px-4">Status</TableHead>
              <TableHead className="py-2.5 px-4 text-right">Deal Value</TableHead>
              <TableHead className="py-2.5 px-2 w-[50px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id} className="hover:bg-muted/30">
                <TableCell className="font-medium py-3 px-4">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground py-3 px-4">{deal.lastContacted}</TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center">
                    <Avatar className="h-7 w-7 mr-2">
                      <AvatarImage src={deal.representative.avatarUrl} alt={deal.representative.name} />
                      <AvatarFallback>{deal.representative.fallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.representative.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Badge variant="outline" className={cn('font-normal text-xs py-1 px-2', getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium py-3 px-4">{deal.dealValue}</TableCell>
                <TableCell className="text-center py-3 px-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Deal</DropdownMenuItem>
                      <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete Deal</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsTable;
