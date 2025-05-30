import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Facebook,
  Search,
  Home,
  Users, // For "Find Friends" type links or Watch/Marketplace/Groups if they were here
  LayoutGrid, // For general Menu / All Apps
  MessageCircle, // Messenger icon
  Bell, // Notifications icon
  ChevronDown, // Account dropdown icon
  HelpCircle // Help icon
} from 'lucide-react';

interface NavTabProps {
  href: string;
  label: string;
  icon: React.ElementType; // LucideIcon type
  isActive?: boolean;
  className?: string;
}

const NavTab: React.FC<NavTabProps> = ({ href, label, icon: Icon, isActive, className }) => {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        'flex h-full items-center justify-center border-b-[3px] px-6 sm:px-8 md:px-10 xl:px-12 focus:outline-none focus-visible:bg-secondary/80',
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-muted-foreground hover:bg-secondary/80',
        className
      )}
    >
      <Icon size={28} className={cn(isActive ? 'text-primary' : 'text-muted-foreground')} />
    </a>
  );
};

interface HeaderNavProps {
  className?: string;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ className }) => {
  const userName = 'Olenna Mason';
  const userAvatarUrl = 'https://i.pravatar.cc/150?u=olenna';

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 flex h-16 items-center justify-between border-b bg-card px-2 sm:px-4 shadow-sm',
        className
      )}
    >
      {/* Left Section: Logo and Search */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <a href="/" aria-label="Homepage">
          <Facebook size={40} className="text-primary" />
        </a>
        <div className="relative hidden sm:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Facebook"
            className="h-10 w-60 rounded-full bg-secondary pl-10 pr-4 text-sm focus:bg-card focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Middle Section: Navigation Links */}
      <nav className="flex flex-1 items-stretch justify-center h-full min-w-0">
        <NavTab href="/" label="Home" icon={Home} isActive />
        <NavTab href="/friends" label="Find Friends" icon={Users} />
        {/* Additional tabs as per Facebook's full header, like Watch, Marketplace, Groups can be added here */}
        {/* For this clone, keeping it to Home & Find Friends as per visual prominence in image */}
      </nav>

      {/* Right Section: User Profile and Action Buttons */}
      <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
        <Button variant="ghost" className="h-10 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-secondary items-center hidden md:flex">
          <Avatar className="mr-0 sm:mr-2 h-7 w-7">
            <AvatarImage src={userAvatarUrl} alt={userName} />
            <AvatarFallback>{userName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-foreground hidden lg:inline">{userName.split(' ')[0]}</span>
        </Button>
        
        <Button variant="ghost" size="icon" aria-label="Menu" className="h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary text-foreground">
          <LayoutGrid size={20} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Messenger" className="relative h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary text-foreground">
          <MessageCircle size={20} />
          <Badge className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 p-0.5 text-[10px] text-white ring-2 ring-card">
            8
          </Badge>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary text-foreground">
          <Bell size={20} />
          <Badge className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 p-0.5 text-[10px] text-white ring-2 ring-card">
            36
          </Badge>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Account" className="h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary text-foreground">
          <ChevronDown size={20} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Help" className="h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary text-foreground hidden md:flex">
           <HelpCircle size={20} />
         </Button>
      </div>
    </header>
  );
};

export default HeaderNav;
