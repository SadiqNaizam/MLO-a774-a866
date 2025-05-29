import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import SalesCharts from '../components/Dashboard/SalesCharts';
import BalanceChart from '../components/Dashboard/BalanceChart';
import DealsTable from '../components/Dashboard/DealsTable';
import TasksList from '../components/Dashboard/TasksList';

/**
 * IndexPage serves as the main CRM Dashboard Overview.
 * It uses MainAppLayout to provide the overall structure (sidebar, header)
 * and then arranges various dashboard widgets like stats, charts, tables, and task lists
 * in the main content area.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* PageHeader displays the title 'CRM' and breadcrumbs 'Dashboard > CRM' */}
      <PageHeader />

      {/* StatsCardGrid displays key performance indicators in a 4-column grid */}
      <StatsCardGrid />

      {/* SalesCharts displays sales forecast and deal type charts */}
      <SalesCharts />

      {/* BalanceChart displays an overview of revenue and expenses */}
      <BalanceChart />

      {/* 
        This section lays out the DealsTable and TasksList side-by-side on larger screens.
        On smaller screens, they will stack vertically.
        - DealsTable takes up 2/3 of the width on large screens (lg:col-span-2).
        - TasksList takes up 1/3 of the width on large screens (lg:col-span-1).
        - `gap-6` provides spacing between these components.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DealsTable />
        </div>
        <div className="lg:col-span-1">
          {/* 
            TasksList is set to h-full to attempt to match the height of DealsTable 
            when they are side-by-side. The TasksList component itself is designed 
            to be flexible in height due to its internal ScrollArea.
          */}
          <TasksList className="h-full" />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
