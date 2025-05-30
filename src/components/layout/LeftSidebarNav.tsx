import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronDown,
  Newspaper,
  MessageSquareText,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users2,
  ListChecks,
  HeartHandshake,
  MoreHorizontal,
  Settings // Not used yet, but available for options
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Define a more specific type for Lucide icons if needed, or use React.ElementType
// For simplicity, using React.FC<LucideProps> for icon components

interface NavLinkItem {
  id: string;
  label: string;
  icon?: React.FC<LucideProps>; // Making icon optional for items like profile that use Avatar
  href: string;
  isActive?: boolean;
  isPrimary?: boolean;
  optionsIcon?: React.FC<LucideProps>;
  avatarUrl?: string;
  hidden?: boolean; // For 'See More' functionality
}

interface NavSection {
  id: string;
  title?: string;
  items: NavLinkItem[];
}

const NavItemComponent: React.FC<NavLinkItem> = ({ 
  label, 
  icon: Icon, 
  href, 
  isActive, 
  isPrimary, 
  optionsIcon: OptionsIcon, 
  avatarUrl 
}) => (
  <a
    href={href}
    className={cn(
      'flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-secondary transition-colors group',
      isActive ? 'bg-primary/10 text-primary' : 'text-foreground',
      isPrimary ? 'font-semibold' : ''
    )}
  >
    {avatarUrl ? (
      <Avatar className="h-7 w-7 flex-shrink-0">
        <AvatarImage src={avatarUrl} alt={label} />
        <AvatarFallback>{label.substring(0, 1)}</AvatarFallback>
      </Avatar>
    ) : Icon ? (
       <Icon size={20} className={cn('flex-shrink-0', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
    ) : (
      <div className="w-5 h-5 flex-shrink-0" /> // Placeholder for items without icon/avatar
    )}
    <span className="flex-grow truncate">{label}</span>
    {OptionsIcon && (
       <Button variant="ghost" size="icon" className="ml-auto h-7 w-7 flex-shrink-0 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10">
         <OptionsIcon size={16} className="text-muted-foreground" />
       </Button>
    )}
  </a>
);


const LeftSidebarNav: React.FC<{ className?: string }> = ({ className }) => {
  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
  };

  const [showMoreExplore, setShowMoreExplore] = React.useState(false);

  const navSectionsData: NavSection[] = [
    {
      id: 'user_primary',
      items: [
        { id: 'profile', label: user.name, href: '/profile', avatarUrl: user.avatarUrl, isPrimary: true },
        { id: 'newsfeed', label: 'News Feed', icon: Newspaper, href: '/', isActive: true, isPrimary: true, optionsIcon: MoreHorizontal },
        { id: 'messenger', label: 'Messenger', icon: MessageSquareText, href: '/messenger', isPrimary: true, optionsIcon: MoreHorizontal },
        { id: 'watch', label: 'Watch', icon: PlaySquare, href: '/watch', isPrimary: true, optionsIcon: MoreHorizontal },
        { id: 'marketplace', label: 'Marketplace', icon: Store, href: '/marketplace', isPrimary: true, optionsIcon: MoreHorizontal },
      ],
    },
    {
      id: 'shortcuts',
      title: 'Shortcuts',
      items: [
        { id: 'farmville', label: 'FarmVille 2', icon: Gamepad2, href: '/games/farmville2' },
        // Add more shortcuts with appropriate icons
      ],
    },
    {
      id: 'explore',
      title: 'Explore',
      items: [
        { id: 'events', label: 'Events', icon: CalendarDays, href: '/events' },
        { id: 'pages', label: 'Pages', icon: Flag, href: '/pages' },
        { id: 'groups', label: 'Groups', icon: Users2, href: '/groups' },
        { id: 'friendlists', label: 'Friend Lists', icon: ListChecks, href: '/friends/lists' },
        { id: 'fundraisers', label: 'Fundraisers', icon: HeartHandshake, href: '/fundraisers' },
        // Hidden items
        { id: 'adsmanager', label: 'Ads Manager', icon: MoreHorizontal, href: '/adsmanager', hidden: true },
        { id: 'crisisresponse', label: 'Crisis Response', icon: MoreHorizontal, href: '/crisisresponse', hidden: true },
      ],
    },
  ];
  
  // Process 'Explore' items for 'See More'
  const processedNavSections = navSectionsData.map(section => {
    if (section.id === 'explore') {
      return {
        ...section,
        items: section.items.filter(item => !item.hidden || (item.hidden && showMoreExplore))
      };
    }
    return section;
  });

  const createLinks = [
    {label: 'Ad', href: '/create/ad'},
    {label: 'Page', href: '/create/page'},
    {label: 'Group', href: '/create/group'},
    {label: 'Event', href: '/create/event'},
    {label: 'Fundraiser', href: '/create/fundraiser'},
  ];

  return (
    <nav
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-sidebar', // h-16 is 4rem
        className
      )}
    >
      <ScrollArea className="h-full">
        <div className="space-y-1 p-3">
          {processedNavSections.map((section) => (
            <div key={section.id} className={section.title ? 'pt-2' : ''}>
              {section.title && (
                <h2 className="mb-1 px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  {section.title}
                </h2>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItemComponent key={item.id} {...item} />
                ))}
              </div>
              {section.id === 'explore' && navSectionsData.find(s => s.id === 'explore')?.items.some(i => i.hidden) && (
                 <Button 
                    variant="ghost" 
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary justify-start"
                    onClick={() => setShowMoreExplore(!showMoreExplore)}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted group-hover:bg-muted-foreground/20">
                        <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", showMoreExplore && "rotate-180")} />
                    </div>
                    <span className="flex-grow text-left">{showMoreExplore ? 'See Less' : 'See More...'}</span>
                  </Button>
              )}
            </div>
          ))}
          <Separator className="my-3" />
           <div>
                <h2 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Create
                </h2>
                <div className="space-y-0.5 px-2">
                    {createLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block py-1 text-xs font-medium text-muted-foreground hover:text-primary hover:underline"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
           </div>
        </div>
        <div className="p-3 mt-4 text-xs text-muted-foreground space-x-1.5">
            <span>Privacy</span><span>·</span>
            <span>Terms</span><span>·</span>
            <span>Advertising</span><span>·</span>
            <span>Ad Choices</span><span>·</span>
            <span>Cookies</span><span>·</span>
            <span>More</span><span>·</span>
            <span>Meta © {new Date().getFullYear()}</span>
        </div>
      </ScrollArea>
    </nav>
  );
};

export default LeftSidebarNav;
