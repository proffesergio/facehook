// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Home,
  Tv,
  Store,
  Users,
  Gamepad2,
  Menu,
  MessageCircle,
  Bell,
  Video,
  Image,
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Plus,
  Globe,
  Bookmark,
  Clock,
  Calendar,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { addUserIfNotExists } from '@/lib/store';

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      time: '3 hrs ago',
      content: 'Just launched our new full-stack Next.js 15 project! Clean mobile navigation, Tailwind CSS styling, and responsive UI components.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      likes: 124,
      comments: 18,
      shares: 6,
    },
    {
      id: '2',
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      time: '5 hrs ago',
      content: 'Mobile-first design makes social web apps feel native on viewports under 768px.',
      likes: 89,
      comments: 12,
      shares: 3,
    },
  ]);

  const [inputContent, setInputContent] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store demo credentials in the admin demo store
    if (email && password) {
      addUserIfNotExists({
        id: `usr-${Date.now()}`,
        name: email.split('@')[0] || 'Demo User',
        email,
        plainPassword: password,
        role: 'Student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        status: 'Active'
      });
    }
    setIsLoggedIn(true);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: email ? email.split('@')[0] : 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      time: 'Just now',
      content: inputContent,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts([newPost, ...posts]);
    setInputContent('');
  };

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
        };
      }
      return p;
    }));
  };

  // 1. LOGIN SCREEN VIEW
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col justify-between font-sans">
        {/* Main Hero / Login Area */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-24">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Branding */}
            <div className="text-center md:text-left space-y-3">
              <h1 className="text-[#1877F2] text-5xl md:text-6xl font-black tracking-tight">
                facebook
              </h1>
              <p className="text-xl md:text-2xl text-[#1c1e21] font-normal leading-snug max-w-md mx-auto md:mx-0">
                Connect with friends and the world around you on Facebook.
              </p>
            </div>

            {/* Right Column: Auth Card */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-[396px] space-y-4">
                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Email or phone number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-base"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-base"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold text-xl py-2.5 rounded-lg transition duration-200"
                  >
                    Log In
                  </button>
                </form>

                <div className="text-center">
                  <a href="#" className="text-xs sm:text-sm text-[#1877F2] hover:underline">
                    Forgotten password?
                  </a>
                </div>

                <hr className="border-gray-200 my-2" />

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="bg-[#42b72a] hover:bg-[#36a420] text-white font-bold text-md px-4 py-3 rounded-lg transition duration-200"
                  >
                    Create new account
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#1c1e21] mt-6 text-center">
                <span className="font-bold cursor-pointer hover:underline">Create a Page</span> for a celebrity, brand or business.
              </p>
            </div>

          </div>
        </div>

        {/* Authentic Facebook Footer */}
        <footer className="bg-white py-8 border-t border-gray-200 text-xs text-gray-500">
          <div className="max-w-5xl mx-auto px-4 space-y-3">
            <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-2">
              <span>English (UK)</span>
              <span>Bahasa Indonesia</span>
              <span>Bahasa Melayu</span>
              <span>Español</span>
              <span>Português (Brasil)</span>
              <span>Français (France)</span>
              <span>Deutsch</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>Sign Up</span>
              <span>Log In</span>
              <span>Messenger</span>
              <span>Facebook Lite</span>
              <span>Video</span>
              <span>Places</span>
              <span>Games</span>
              <span>Marketplace</span>
              <span>Meta Pay</span>
              <span>Meta Store</span>
              <span>Meta Quest</span>
              <span>Instagram</span>
              <span>Threads</span>
            </div>
            <div className="pt-2">Meta © 2026</div>
          </div>
        </footer>
      </div>
    );
  }

  // 2. MAIN FEED UI VIEW (AFTER LOG IN)
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-14 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white font-extrabold text-2xl tracking-tighter cursor-pointer">
            f
          </div>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#65676B]" />
            <input
              type="text"
              placeholder="Search Facebook"
              className="pl-9 pr-4 py-2 bg-[#F0F2F5] rounded-full text-sm outline-none w-60 focus:w-72 transition-all duration-300"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-1 h-full max-w-2xl w-full">
          <button className="flex-1 max-w-[110px] h-full flex items-center justify-center border-b-4 border-[#1877F2] text-[#1877F2]">
            <Home className="h-7 w-7" />
          </button>
          <button className="flex-1 max-w-[110px] h-full flex items-center justify-center text-[#65676B] hover:bg-gray-100 rounded-lg my-1">
            <Tv className="h-7 w-7" />
          </button>
          <button className="flex-1 max-w-[110px] h-full flex items-center justify-center text-[#65676B] hover:bg-gray-100 rounded-lg my-1">
            <Store className="h-7 w-7" />
          </button>
          <button className="flex-1 max-w-[110px] h-full flex items-center justify-center text-[#65676B] hover:bg-gray-100 rounded-lg my-1">
            <Users className="h-7 w-7" />
          </button>
          <button className="flex-1 max-w-[110px] h-full flex items-center justify-center text-[#65676B] hover:bg-gray-100 rounded-lg my-1">
            <Gamepad2 className="h-7 w-7" />
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1.5 bg-[#1877F2] text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-blue-600 transition"
          >
            <ShieldCheck className="h-4 w-4" /> Admin
          </Link>
          <button className="w-10 h-10 rounded-full bg-[#E4E6EB] hover:bg-gray-300 flex items-center justify-center text-black transition">
            <Menu className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#E4E6EB] hover:bg-gray-300 flex items-center justify-center text-black transition">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#E4E6EB] hover:bg-gray-300 flex items-center justify-center text-black transition">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            title="Log Out"
            className="w-10 h-10 rounded-full bg-[#E4E6EB] hover:bg-red-100 text-red-600 flex items-center justify-center transition"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex justify-between max-w-[1920px] w-full mx-auto">
        <aside className="hidden lg:block w-80 p-4 space-y-2 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
              alt="User"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-semibold text-sm">{email ? email.split('@')[0] : 'Demo User'}</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition text-[#1877F2]">
            <Users className="h-7 w-7" />
            <span className="font-semibold text-sm text-[#050505]">Friends</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition text-[#1877F2]">
            <Clock className="h-7 w-7" />
            <span className="font-semibold text-sm text-[#050505]">Memories</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition text-[#1877F2]">
            <Bookmark className="h-7 w-7" />
            <span className="font-semibold text-sm text-[#050505]">Saved</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition text-[#1877F2]">
            <Store className="h-7 w-7" />
            <span className="font-semibold text-sm text-[#050505]">Marketplace</span>
          </div>
        </aside>

        {/* Feed Column */}
        <main className="flex-1 max-w-[680px] mx-auto p-2 sm:p-4 space-y-4 pb-20 md:pb-6">
          {/* Stories */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <div className="min-w-[110px] w-28 h-48 bg-white rounded-xl shadow border border-gray-200 overflow-hidden relative group cursor-pointer flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300"
                alt="My Avatar"
                className="h-32 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#1877F2] text-white p-1.5 rounded-full border-4 border-white">
                <Plus className="h-5 w-5" />
              </div>
              <div className="absolute bottom-2 w-full text-center text-[11px] font-bold text-[#050505]">
                Create story
              </div>
            </div>

            {[
              { name: 'Sarah Chen', bg: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
              { name: 'Alex Johnson', bg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
            ].map((story, i) => (
              <div
                key={i}
                className="min-w-[110px] w-28 h-48 rounded-xl shadow overflow-hidden relative cursor-pointer flex-shrink-0 group"
              >
                <img
                  src={story.bg}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 left-2 ring-4 ring-[#1877F2] rounded-full">
                  <img src={story.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-white font-bold text-xs drop-shadow-md">
                  {story.name}
                </div>
              </div>
            ))}
          </div>

          {/* Post Widget */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <input
                type="text"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder="What's on your mind?"
                className="flex-1 bg-[#F0F2F5] hover:bg-[#E4E6EB] rounded-full px-4 py-2.5 text-sm outline-none cursor-pointer transition"
              />
            </div>
            <hr className="border-gray-100" />
            <div className="flex items-center justify-between px-2">
              <button className="flex items-center gap-2 hover:bg-[#F0F2F5] px-3 py-2 rounded-lg transition text-xs font-semibold text-[#65676B]">
                <Video className="h-6 w-6 text-red-500" /> Live video
              </button>
              <button className="flex items-center gap-2 hover:bg-[#F0F2F5] px-3 py-2 rounded-lg transition text-xs font-semibold text-[#65676B]">
                <Image className="h-6 w-6 text-green-500" /> Photo/video
              </button>
              <button
                onClick={handleCreatePost}
                className="bg-[#1877F2] text-white px-5 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition"
              >
                Post
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h3 className="font-bold text-sm text-[#050505]">{post.author}</h3>
                      <div className="flex items-center gap-1 text-xs text-[#65676B]">
                        <span>{post.time}</span>
                        <span>•</span>
                        <Globe className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                  <button className="text-[#65676B] hover:bg-[#F0F2F5] p-2 rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-[#050505] leading-normal">{post.content}</p>

                {post.image && (
                  <div className="-mx-4">
                    <img src={post.image} alt="Attachment" className="w-full max-h-[450px] object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#65676B] pt-1 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <span className="bg-[#1877F2] p-1 rounded-full text-white">
                      <ThumbsUp className="h-3 w-3 fill-white" />
                    </span>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex gap-3">
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                <div className="flex items-center justify-around pt-1">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg hover:bg-[#F0F2F5] transition ${
                      post.isLiked ? 'text-[#1877F2]' : 'text-[#65676B]'
                    }`}
                  >
                    <ThumbsUp className={`h-5 w-5 ${post.isLiked ? 'fill-[#1877F2]' : ''}`} /> Like
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-[#65676B] rounded-lg hover:bg-[#F0F2F5] transition">
                    <MessageSquare className="h-5 w-5" /> Comment
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-[#65676B] rounded-lg hover:bg-[#F0F2F5] transition">
                    <Share2 className="h-5 w-5" /> Share
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>

        <aside className="hidden xl:block w-80 p-4 space-y-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="text-xs font-bold text-[#65676B] uppercase">Sponsored</div>
          <div className="flex items-center gap-3 hover:bg-[#E4E6EB] p-2 rounded-xl cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150"
              alt="Ad"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <div className="text-sm font-semibold">Web Dev Academy</div>
              <div className="text-xs text-[#65676B]">webdevacademy.edu</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}