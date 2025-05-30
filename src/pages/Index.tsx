import React from 'react';
import HeaderNav from '@/components/layout/HeaderNav';
import LeftSidebarNav from '@/components/layout/LeftSidebarNav';
import RightSidebarWidgets from '@/components/layout/RightSidebarWidgets';
import PostInputBox from '@/components/Dashboard/PostInputBox';
import FeedPostCard from '@/components/Dashboard/FeedPostCard';

// NOTE: If PostData, LocationData, UserInfo interfaces from FeedPostCard.tsx were exported,
// it would be cleaner to import them. Since they are not, they are redefined here for clarity
// and to ensure compatibility with the FeedPostCard component's expected props.

interface CurrentUser {
  name: string;
  avatarUrl: string;
}

// Data structure definitions, compatible with FeedPostCard props
interface UserInfo {
  name: string;
  avatarUrl: string;
}

interface LocationData {
  city: string;
  country: string;
  addressLine?: string;
  mapImageUrl: string;
  attendees?: string[];
}

interface PagePostData {
  id: string;
  user: UserInfo;
  timeAgo: string;
  privacy: 'public' | 'friends' | 'only_me';
  text?: string;
  imageUrl?: string;
  location?: LocationData;
  likes: number;
  comments: number;
  shares: number;
}

const currentUserData: CurrentUser = {
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
};

const feedPostsData: PagePostData[] = [
  {
    id: 'post-julia-raleigh',
    user: { name: 'Julia Fillory', avatarUrl: 'https://i.pravatar.cc/150?u=julia' },
    timeAgo: '2 hrs', // Matching image OCR
    privacy: 'friends' as const,
    text: 'Checking out some new stores downtown!',
    location: {
      city: 'Raleigh',
      country: 'North Carolina',
      mapImageUrl: 'https://source.unsplash.com/featured/600x300/?raleigh,cityscape,map', // Placeholder map image
      attendees: ['Bryan Durand', 'Alex Johnson', 'Chris Lee'], // To match "Bryan Durand and 2 others"
    },
    likes: 125,
    comments: 12,
    shares: 5,
  },
  {
    id: 'post-john-workout',
    user: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=johnsmith' },
    timeAgo: '5 hrs ago',
    privacy: 'public' as const,
    text: 'Just finished a great workout session! Feeling energized. #fitness #healthylifestyle 🏋️‍♂️💪',
    imageUrl: 'https://source.unsplash.com/featured/600x400/?fitness,gym',
    likes: 78,
    comments: 5,
    shares: 2,
  },
  {
    id: 'post-alice-sunset',
    user: { name: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
    timeAgo: '1 day ago',
    privacy: 'friends' as const,
    text: 'Beautiful sunset today! Captured this amazing view. 🌅 Nature is stunning.',
    imageUrl: 'https://source.unsplash.com/featured/600x450/?sunset,nature',
    likes: 210,
    comments: 25,
    shares: 10,
  },
  {
    id: 'post-bob-project',
    user: { name: 'Bob The Builder', avatarUrl: 'https://i.pravatar.cc/150?u=bob' },
    timeAgo: '3 days ago',
    privacy: 'public' as const,
    text: 'Working on a new architectural model for the "Green Urban Living" project. It features sustainable materials and integrated green spaces. Excited to share more updates soon! What do you think of this initial concept? #architecture #sustainability #urbanliving',
    likes: 55,
    comments: 8,
    shares: 1,
  },
  {
    id: 'post-carla-food',
    user: { name: 'Carla Espinoza', avatarUrl: 'https://i.pravatar.cc/150?u=carla' },
    timeAgo: '1 week ago',
    privacy: 'public' as const,
    text: 'Tried out a new recipe for vegan paella. It was delicious! Highly recommend giving it a try. 🥘🌱 #vegan #paella #homecooking #foodie',
    imageUrl: 'https://source.unsplash.com/featured/600x400/?paella,food',
    likes: 150,
    comments: 30,
    shares: 15,
  }
];


const Homepage: React.FC = () => {
  return (
    // The overall page container. `bg-secondary` (#E9EBEE) provides a backdrop consistent with some UI elements like the left sidebar.
    // The main browser window background is `bg-background` (#F5F6F7) from index.css body styles.
    <div className="relative min-h-screen bg-secondary">
      <HeaderNav />
      <LeftSidebarNav />
      <RightSidebarWidgets />
      
      {/* Main Content Area */}
      {/* Positioned absolutely to fit in the space between fixed header and sidebars */}
      {/* Header height: h-16 (4rem). Left sidebar width: w-64 (16rem). Right sidebar width: w-80 (20rem). */}
      <main 
        className="absolute bottom-0 left-64 right-80 top-16 overflow-y-auto bg-background"
        aria-label="Main Content Feed"
      >
        {/* Inner container for padding as per mainContent.layout requirements (px-6 py-4) */}
        <div className="px-6 py-4">
          {/* Content wrapper: max-w-2xl for readability, mx-auto to center, flex column with gap-6 as per mainContent.container */}
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            <PostInputBox 
              userName={currentUserData.name} 
              userAvatarUrl={currentUserData.avatarUrl} 
            />
            {feedPostsData.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
