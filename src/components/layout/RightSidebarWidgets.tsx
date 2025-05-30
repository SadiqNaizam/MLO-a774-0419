import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import StoriesWidget from '../Sidebar/StoriesWidget';
import SuggestedGroupsWidget from '../Sidebar/SuggestedGroupsWidget';
import ChatWidget from '../Sidebar/ChatWidget';

interface RightSidebarWidgetsProps {
  className?: string;
}

const RightSidebarWidgets: React.FC<RightSidebarWidgetsProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'fixed right-0 top-16 z-30 h-[calc(100vh-4rem)] w-80 bg-background', // h-16 is 4rem
        className
      )}
    >
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-4 p-4">
          <StoriesWidget />
          <SuggestedGroupsWidget />
          {/* ChatWidget is designed to be at the bottom of this sidebar */}
          {/* If it needed to be fixed at screen bottom, it would need different positioning logic */}
          <ChatWidget className="mt-auto" /> {/* Push ChatWidget towards bottom if sidebar has extra space */}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default RightSidebarWidgets;
