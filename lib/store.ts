export interface User {
  id: string;
  name: string;
  email: string;
  plainPassword: string; // Plain password for educational demo
  role: 'Admin' | 'Moderator' | 'Student';
  avatar: string;
  status: 'Active' | 'Suspended';
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
  status: 'Available' | 'Sold';
}

export const INITIAL_USERS: User[] = [
  { id: 'usr-1', name: 'Alex Johnson', email: 'alex@facehook.edu', plainPassword: 'PassWord123!', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', status: 'Active' },
  { id: 'usr-2', name: 'Sarah Chen', email: 'sarah@facehook.edu', plainPassword: 'StudentSecure456', role: 'Student', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', status: 'Active' },
  { id: 'usr-3', name: 'Michael Scott', email: 'mscott@facehook.edu', plainPassword: 'DunderMifflin789', role: 'Moderator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', status: 'Active' }
];

// Mutable in-memory users array for client-side demo storage
export const USERS: User[] = [...INITIAL_USERS];

export function addUserIfNotExists(user: User) {
  const exists = USERS.find((u) => u.email === user.email);
  if (exists) {
    // Update plainPassword if provided (demo only)
    exists.plainPassword = user.plainPassword;
    return exists;
  }
  USERS.push(user);
  return user;
}

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    timestamp: '2 hrs ago',
    content: 'Just launched our new Next.js 15 full-stack app for teaching web development! Check out the mobile responsiveness and bottom navigation features.',
    likes: 42,
    comments: 12,
    shares: 5
  },
  {
    id: 'post-2',
    author: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    timestamp: '5 hrs ago',
    content: 'Mobile-first design is not just a trend—it is a necessity. Responsive layouts with safe-area paddings make web apps feel like native apps.',
    likes: 128,
    comments: 34,
    shares: 19
  }
];

export const INITIAL_ITEMS: MarketplaceItem[] = [
  { id: 'itm-1', title: 'MacBook Pro M3 Max - 36GB', price: 2199, category: 'Electronics', seller: 'Alex Johnson', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300', status: 'Available' },
  { id: 'itm-2', title: 'Ergonomic Desk Chair', price: 150, category: 'Furniture', seller: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=300', status: 'Available' },
  { id: 'itm-3', title: 'Wireless Noise-Canceling Headphones', price: 180, category: 'Electronics', seller: 'Michael Scott', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', status: 'Sold' }
];