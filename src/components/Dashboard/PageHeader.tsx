import React from 'react';
import { cn } from '@/lib/utils';
import { Home, ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      <div>
        <h2 className="text-xl font-semibold text-foreground">CRM</h2>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <a href="/dashboard" className="hover:text-primary">
            Dashboards
          </a>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">CRM</span>
        </div>
      </div>
      {/* Optional: Actions like buttons or date pickers can go here */}
      {/* Example: <Button>Add New</Button> */}
    </div>
  );
};

export default PageHeader;
