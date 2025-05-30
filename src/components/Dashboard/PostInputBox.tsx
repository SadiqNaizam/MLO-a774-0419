import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Image as ImageIcon, UserPlus, Smile, Edit } from 'lucide-react'; // Edit for 'Make Post'

interface PostInputBoxProps {
  className?: string;
  userName?: string;
  userAvatarUrl?: string;
}

const PostInputBox: React.FC<PostInputBoxProps> = ({
  className,
  userName = 'Olenna Mason',
  userAvatarUrl = 'https://i.pravatar.cc/150?u=olenna',
}) => {
  const [postText, setPostText] = React.useState<string>('');

  return (
    <div className={cn('bg-card p-4 rounded-lg shadow', className)}>
      <div className='flex items-center mb-3 border-b pb-3'>
        <Button variant="ghost" className='flex-1 justify-start text-foreground hover:bg-secondary'>
            <Edit size={20} className='mr-2 text-primary' /> Make Post
        </Button>
        <Separator orientation='vertical' className='h-6 mx-2'/>
        <Button variant="ghost" className='flex-1 justify-start text-muted-foreground hover:bg-secondary'>
            <ImageIcon size={20} className='mr-2 text-green-500' /> Photo/Video Album
        </Button>
        <Separator orientation='vertical' className='h-6 mx-2'/>
        <Button variant="ghost" className='flex-1 justify-start text-muted-foreground hover:bg-secondary'>
            <Smile size={20} className='mr-2 text-yellow-500' /> Feeling/Activity
        </Button>
      </div> 
      <div className="flex items-start space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={userAvatarUrl} alt={userName} />
          <AvatarFallback>{userName.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <textarea
          className="flex-1 p-2 bg-background border border-input rounded-full text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none h-10 leading-tight"
          placeholder={`What's on your mind, ${userName}?`}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          rows={1}
        />
      </div>
      <Separator className="my-3" />
      <div className="flex justify-around mt-2">
        <Button variant="ghost" className="text-muted-foreground hover:bg-secondary w-full">
          <ImageIcon size={20} className="mr-2 text-green-500" />
          <span className="text-sm font-medium">Photo/Video</span>
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:bg-secondary w-full">
          <UserPlus size={20} className="mr-2 text-blue-500" />
          <span className="text-sm font-medium">Tag Friends</span>
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:bg-secondary w-full">
          <Smile size={20} className="mr-2 text-yellow-500" />
          <span className="text-sm font-medium">Feeling/Activity</span>
        </Button>
      </div>
    </div>
  );
};

export default PostInputBox;
