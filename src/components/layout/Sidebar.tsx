import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav component already implements its own fixed positioning,
  // width (w-64), height (h-screen), and background color (bg-sidebar)
  // as per the project's layout requirements and the SidebarNav.tsx context code.
  // This Sidebar component acts as a clean organizational wrapper within the layout structure.
  return (
    <SidebarNav className={cn(className)} />
  );
};

export default Sidebar;
