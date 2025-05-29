import React from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, Users, ShoppingBag, Bitcoin, Briefcase, ImageIcon, 
  ClipboardList, Rss, AppWindow, LayoutPanelLeft, ShieldCheck, FileText, 
  Rocket, Shapes, Database, GalleryVerticalEnd, Settings2, ClipboardEdit, ChevronRight
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isSubItem?: boolean;
  badge?: 'New' | 'Hot' | null;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive, isSubItem, badge }) => {
  return (
    <a href={href} className={cn(
      'flex items-center py-2.5 px-4 text-sm rounded-md hover:bg-sidebar-accent transition-colors',
      isActive ? 'text-sidebar-primary font-medium bg-sidebar-accent' : 'text-sidebar-foreground hover:text-sidebar-primary-foreground',
      isSubItem ? 'pl-10 pr-2 py-2' : 'mx-2.5'
    )}>
      <Icon className={cn('h-4 w-4 mr-3', isActive ? 'text-sidebar-primary' : '')} />
      {label}
      {badge && (
        <span className={cn(
          'ml-auto px-2 py-0.5 text-xs font-semibold rounded-full',
          badge === 'New' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        )}>
          {badge}
        </span>
      )}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  // In a real app, currentPath would come from routing library
  const currentPath = '/crm'; 

  const navItems = [
    {
      category: 'MENU',
      items: [
        {
          id: 'dashboards',
          label: 'Dashboards',
          icon: LayoutDashboard,
          subItems: [
            { href: '/analytics', label: 'Analytics', icon: Users },
            { href: '/crm', label: 'CRM', icon: Users },
            { href: '/ecommerce', label: 'Ecommerce', icon: ShoppingBag },
            { href: '/crypto', label: 'Crypto', icon: Bitcoin },
            { href: '/projects', label: 'Projects', icon: Briefcase },
            { href: '/nft', label: 'NFT', icon: ImageIcon },
            { href: '/job', label: 'Job', icon: ClipboardList },
          ]
        },
        { href: '/blog', label: 'Blog', icon: Rss, badge: 'New' as const },
        { href: '/apps', label: 'Apps', icon: AppWindow, badge: null }, 
        { href: '/layouts', label: 'Layouts', icon: LayoutPanelLeft, badge: 'Hot' as const },
      ]
    },
    {
      category: 'PAGES',
      items: [
        { href: '/auth', label: 'Authentication', icon: ShieldCheck },
        { href: '/pages', label: 'Pages', icon: FileText },
        { href: '/landing', label: 'Landing', icon: Rocket },
      ]
    },
    {
      category: 'COMPONENTS',
      items: [
        { href: '/base-ui', label: 'Base UI', icon: Shapes },
        { href: '/advance-ui', label: 'Advance UI', icon: GalleryVerticalEnd },
        { href: '/widgets', label: 'Widgets', icon: Settings2 },
        { href: '/forms', label: 'Forms', icon: ClipboardEdit },
      ]
    }
  ];

  return (
    <div className={cn('h-full w-64 bg-sidebar text-sidebar-foreground flex flex-col fixed top-0 left-0', className)}>
      <div className="h-[70px] flex items-center justify-center px-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-semibold text-white">VELZON</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="py-4">
          {navItems.map((section) => (
            <div key={section.category} className="mb-4">
              <h2 className="px-5 py-2 text-xs font-medium uppercase text-sidebar-foreground/70 tracking-wider">
                {section.category}
              </h2>
              <ul>
                {section.items.map((item) => 
                  'subItems' in item ? (
                    <Accordion type="single" collapsible key={item.id} defaultValue={item.subItems.some(sub => sub.href === currentPath) ? item.id : undefined}>
                      <AccordionItem value={item.id} className="border-none">
                        <AccordionTrigger 
                          className={cn(
                            'flex items-center py-2.5 px-4 text-sm rounded-md hover:bg-sidebar-accent transition-colors w-full',
                            item.subItems.some(sub => sub.href === currentPath) ? 'text-sidebar-primary font-medium bg-sidebar-accent' : 'text-sidebar-foreground hover:text-sidebar-primary-foreground',
                            'mx-2.5'
                          )}
                        >
                           <div className="flex items-center">
                            <item.icon className={cn('h-4 w-4 mr-3', item.subItems.some(sub => sub.href === currentPath) ? 'text-sidebar-primary' : '')} />
                            {item.label}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <ul className="pt-1">
                            {item.subItems.map(subItem => (
                              <li key={subItem.href}>
                                <NavItem 
                                  href={subItem.href} 
                                  icon={ChevronRight} // Sub-items usually don't have main icons or use a generic one
                                  label={subItem.label} 
                                  isActive={currentPath === subItem.href}
                                  isSubItem={true}
                                />
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <li key={item.href}>
                      <NavItem 
                        href={item.href!}
                        icon={item.icon}
                        label={item.label}
                        isActive={currentPath === item.href}
                        badge={item.badge}
                      />
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;
