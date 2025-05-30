import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit3, Users, Settings2, Search, Circle } from 'lucide-react'; // Circle for online status

interface ChatContact {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
}

interface ChatWidgetProps {
  className?: string;
}

const dummyContacts: ChatContact[] = [
  { id: 'contact1', name: 'Julia Fillory', avatarUrl: 'https://i.pravatar.cc/150?u=julia', isOnline: true },
  { id: 'contact2', name: 'Bryan Durand', avatarUrl: 'https://i.pravatar.cc/150?u=bryan', isOnline: false },
  { id: 'contact3', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=alex', isOnline: true },
  { id: 'contact4', name: 'Sarah Miller', avatarUrl: 'https://i.pravatar.cc/150?u=sarah', isOnline: true },
  { id: 'contact5', name: 'Mike Chen', avatarUrl: 'https://i.pravatar.cc/150?u=mike', isOnline: false },
];

const ChatWidget: React.FC<ChatWidgetProps> = ({
  className
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const filteredContacts = dummyContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn('p-3 bg-background', className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-semibold text-foreground">Chat</h3>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:bg-secondary">
            <Edit3 size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:bg-secondary">
            <Users size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:bg-secondary">
            <Settings2 size={16} />
          </Button>
        </div>
      </div>
      
      <div className="relative mb-3">
        <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search contacts..." 
          className="pl-8 h-9 text-sm bg-secondary focus-visible:ring-offset-0 focus-visible:ring-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent pr-1">
        {filteredContacts.map((contact) => (
          <div 
            key={contact.id} 
            className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-secondary cursor-pointer transition-colors"
          >
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                <AvatarFallback>{contact.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              {contact.isOnline && (
                <Circle fill="#34D399" strokeWidth={1.5} stroke="var(--background)" className="absolute bottom-0 right-0 w-2.5 h-2.5 text-green-400" />
              )}
            </div>
            <p className="text-sm font-medium text-foreground truncate">{contact.name}</p>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
