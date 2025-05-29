import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Search, Globe, LayoutGrid, Bell, Expand, Moon, Sun, Settings, UserCircle, LogOut, User, CreditCard, HelpCircle
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <header className={cn('h-[70px] bg-card text-card-foreground flex items-center justify-between px-6 border-b fixed top-0 left-64 right-0 z-50', className)}>
      <div className="flex items-center">
        {/* Hamburger menu for mobile - assuming this is handled by layout, or add here if needed */}
        <div className="relative mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 w-64 bg-secondary border-none focus-visible:ring-primary" />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Globe className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <LayoutGrid className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">New order received</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start space-x-2">
              <Bell className="h-8 w-8 text-yellow-500 mt-1" />
              <div>
                <p className="text-sm font-medium">System Alert</p>
                <p className="text-xs text-muted-foreground">Low disk space. Please check.</p>
              </div>
            </DropdownMenuItem>
             <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Button variant="link" size="sm">View all notifications</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hidden md:inline-flex">
          {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://via.placeholder.com/40" alt="Anna Adame" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Anna Adame</p>
                <p className="text-xs text-muted-foreground">Founder</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" /> Billing</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="mr-2 h-4 w-4" /> Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
