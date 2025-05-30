import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  memberCount: number;
  coverImageUrl: string;
  memberAvatars: string[];
}

interface SuggestedGroupsWidgetProps {
  className?: string;
}

const dummyGroups: Group[] = [
  {
    id: 'group1',
    name: 'Mad Men (MADdicts)',
    memberCount: 6195,
    coverImageUrl: 'https://picsum.photos/seed/madmen/300/100',
    memberAvatars: ['https://i.pravatar.cc/150?u=g1m1', 'https://i.pravatar.cc/150?u=g1m2', 'https://i.pravatar.cc/150?u=g1m3', 'https://i.pravatar.cc/150?u=g1m4'],
  },
  {
    id: 'group2',
    name: 'Dexter Morgan Fans',
    memberCount: 6984,
    coverImageUrl: 'https://picsum.photos/seed/dexter/300/100',
    memberAvatars: ['https://i.pravatar.cc/150?u=g2m1', 'https://i.pravatar.cc/150?u=g2m2', 'https://i.pravatar.cc/150?u=g2m3'],
  },
  {
    id: 'group3',
    name: 'React Developers Hub',
    memberCount: 12034,
    coverImageUrl: 'https://picsum.photos/seed/reactdev/300/100',
    memberAvatars: ['https://i.pravatar.cc/150?u=g3m1', 'https://i.pravatar.cc/150?u=g3m2', 'https://i.pravatar.cc/150?u=g3m3', 'https://i.pravatar.cc/150?u=g3m4', 'https://i.pravatar.cc/150?u=g3m5'],
  },
];

const SuggestedGroupsWidget: React.FC<SuggestedGroupsWidgetProps> = ({
  className
}) => {
  const [groups, setGroups] = React.useState<Group[]>(dummyGroups);

  const handleDismissGroup = (groupId: string) => {
    setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  return (
    <Card className={cn('bg-card shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <h3 className="text-md font-semibold text-foreground">Suggested Groups</h3>
        <Button variant="link" size="sm" className="text-xs text-primary px-0 h-auto">
          See All
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="relative rounded-lg overflow-hidden border border-border">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-1 right-1 w-6 h-6 bg-black/30 hover:bg-black/50 text-white rounded-full z-10"
                onClick={() => handleDismissGroup(group.id)}
              >
                <X size={14} />
              </Button>
              <div className="h-24 bg-muted">
                <img src={group.coverImageUrl} alt={`${group.name} cover`} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 bg-card">
                <div className="flex -mt-6 mb-2">
                  {group.memberAvatars.slice(0, 5).map((avatarUrl, index) => (
                    <Avatar key={index} className={cn(
                      'w-7 h-7 border-2 border-card',
                      index > 0 && '-ml-2'
                    )}>
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{group.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <h4 className="text-sm font-semibold text-foreground truncate">{group.name}</h4>
                <p className="text-xs text-muted-foreground">{group.memberCount.toLocaleString()} members</p>
                <Button variant="secondary" size="sm" className="w-full mt-3">
                  <Plus size={16} className="mr-1" /> Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedGroupsWidget;
