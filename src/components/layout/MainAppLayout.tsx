import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  // Sidebar is fixed, w-64 (256px), full height.
  // Header is fixed, h-[70px], positioned left-64.
  // Main content area needs to be offset accordingly.

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar />
      <Header />
      
      {/* 
        Main content area.
        - ml-64: Accounts for the fixed sidebar's width.
        - mt-[70px]: Accounts for the fixed header's height.
        - p-6: Padding for the content inside the main area, as per mainContent.layout.
        - h-[calc(100vh_-_70px)]: Ensures the main area takes up the remaining viewport height below the header, enabling overflow-y-auto to work correctly on this element.
        - min-w-0: Prevents wide content from breaking the layout in flex/grid scenarios.
        - overflow-y-auto: Makes the main content area scrollable if content exceeds its height, as per mainContent.sizing.
      */}
      <main 
        className={cn(
          "ml-64",
          "mt-[70px]", 
          "p-6",
          "h-[calc(100vh_-_70px)]",
          "min-w-0",
          "overflow-y-auto"
        )}
      >
        {/* This inner div is the 'container' specified in mainContent.container requirements */}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
