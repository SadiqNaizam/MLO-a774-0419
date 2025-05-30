import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PlusCircle, Archive, Settings } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  avatarUrl: string;
  hasNewStory?: boolean;
}

interface StoriesWidgetProps {
  className?: string;
}

const dummyStories: Story[] = [
  { id: 'story1', userName: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane', hasNewStory: true },
  { id: 'story2', userName: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john', hasNewStory: true },
  { id: 'story3', userName: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'story4', userName: 'Bob The Builder', avatarUrl: 'https://i.pravatar.cc/150?u=bob', hasNewStory: true },
  { id: 'story5', userName: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=charlie' },
];

const StoriesWidget: React.FC<StoriesWidgetProps> = ({
  className
}) => {
  return (
    <Card className={cn('bg-card shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <h3 className="text-md font-semibold text-foreground">Stories</h3>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-secondary">
            <Archive size={14} className="mr-1" /> Archive
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-secondary">
            <Settings size={14} className="mr-1" /> Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {/* Add Your Story Card */}
          <div className="flex-shrink-0 w-28">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-dashed border-primary flex flex-col items-center justify-center cursor-pointer hover:bg-secondary transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-2">
                <PlusCircle size={24} className="text-primary-foreground" />
              </div>
              <p className="text-xs font-medium text-center text-primary">Add to Your Story</p>
            </div>
          </div>

          {/* Story Thumbnails */}
          {dummyStories.map((story) => (
            <div key={story.id} className="flex-shrink-0 w-28 cursor-pointer group">
              <div 
                className={cn(
                  'relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-transparent group-hover:border-primary/50 transition-all',
                  story.hasNewStory ? 'border-primary' : 'border-muted'
                )}
              >
                <img 
                  src={`https://picsum.photos/seed/${story.id}/150/200`} 
                  alt={`${story.userName}'s story`} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                <Avatar className={cn(
                  'absolute top-2 left-2 w-8 h-8 border-2 bg-card',
                  story.hasNewStory ? 'border-primary' : 'border-muted'
                )}>
                  <AvatarImage src={story.avatarUrl} alt={story.userName} />
                  <AvatarFallback>{story.userName.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-white px-1 truncate">
                  {story.userName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoriesWidget;
