import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Users } from 'lucide-react';
import MapCard from './MapCard'; // Assuming MapCard is in the same directory

interface UserInfo {
  name: string;
  avatarUrl: string;
}

interface PostData {
  id: string;
  user: UserInfo;
  timeAgo: string;
  privacy: 'public' | 'friends' | 'only_me' as const;
  text?: string;
  imageUrl?: string;
  location?: LocationData; // For MapCard integration
  likes: number;
  comments: number;
  shares: number;
}

interface LocationData {
  city: string;
  country: string;
  addressLine?: string;
  mapImageUrl: string; // Placeholder for map image
  attendees?: string[];
}

interface FeedPostCardProps {
  post: PostData;
  className?: string;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({
  post,
  className
}) => {
  const { user, timeAgo, privacy, text, imageUrl, location, likes, comments, shares } = post;

  const PrivacyIcon = () => {
    switch (privacy) {
      case 'friends':
        return <Users size={14} className="text-muted-foreground" />;
      // Add other cases if needed, default to public or no icon
      default:
        return null; // Or a Globe icon for public
    }
  };

  return (
    <Card className={cn('w-full shadow-md', className)}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-foreground">{user.name}</p>
              <div className="flex items-center space-x-1">
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
                {PrivacyIcon() && <span className="text-muted-foreground">•</span>}
                <PrivacyIcon />
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0">
        {text && <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">{text}</p>}
        {imageUrl && (
          <div className="rounded-lg overflow-hidden border border-border mb-3">
            <img src={imageUrl} alt="Post content" className="w-full h-auto object-cover" />
          </div>
        )}
        {location && <MapCard location={location} className="mb-3" />}
      </CardContent>
      {(likes > 0 || comments > 0 || shares > 0) && (
         <div className="px-4 pb-2 flex justify-between items-center text-xs text-muted-foreground">
            <div>{likes > 0 && <p>{likes} Likes</p>}</div>
            <div className="flex space-x-2">
                {comments > 0 && <p>{comments} Comments</p>}
                {shares > 0 && <p>{shares} Shares</p>}
            </div>
        </div>
      )}
      <Separator className="mx-4" />
      <CardFooter className="p-2">
        <div className="flex justify-around w-full">
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-secondary">
            <ThumbsUp size={18} className="mr-2" /> Like
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-secondary">
            <MessageCircle size={18} className="mr-2" /> Comment
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-secondary">
            <Share2 size={18} className="mr-2" /> Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedPostCard;
