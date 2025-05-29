import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // TopHeader component already implements its own fixed positioning 
  // (top-0, left-64, right-0, z-index), height (h-[70px]), and background color (bg-card)
  // as per the project's layout requirements and the TopHeader.tsx context code.
  // The layout requirements specify 'bg-surface' for the header, but TopHeader.tsx uses 'bg-card'.
  // We will adhere to TopHeader.tsx's implementation for consistency.
  // This Header component acts as a clean organizational wrapper.
  return (
    <TopHeader className={cn(className)} />
  );
};

export default Header;
