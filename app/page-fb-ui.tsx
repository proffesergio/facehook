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
  Smile,
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
} from 'lucide-react';

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

export default function FacebookUI() {
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

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: 'Student Demo User',
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

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-14 px-4 flex items-center justify-between shadow-sm">
        {/* Left: Logo & Search */}
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

        {/* Center: Navigation Tabs (Desktop) */}
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

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1.5 bg-[#1877F2] text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-blue-600 transition"
          >
            <ShieldCheck className="h-4 w-4" /> Admin Panel
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
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border cursor-pointer"
          />
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 flex justify-between max-w-[1920px] w-full mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-80 p-4 space-y-2 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
              alt="User"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-semibold text-sm">Student Demo User</span>
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
            <Users className="h-7 w-7" />
            <span className="font-semibold text-sm text-[#050505]">Groups</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition text-[#1877F2]">
            <Store className="h-7 w-7" />
            <span className="font-semibold text-sm text-[#050505]">Marketplace</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer transition text-[#1877F2]">
            <Calendar className="h-7 w-7" />
            <span className="font-semibold text-sm text-[#050505]">Events</span>
          </div>
        </aside>

        {/* Center Stream */}
        <main className="flex-1 max-w-[680px] mx-auto p-2 sm:p-4 space-y-4 pb-20 md:pb-6">
          {/* Stories Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {/* Create Story */}
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

            {/* Friend Stories */}
            {[
              { name: 'Sarah Chen', bg: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
              { name: 'Alex Johnson', bg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
              { name: 'Michael Scott', bg: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=300', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
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

          {/* Create Post Widget */}
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
                placeholder="What's on your mind, Student?"
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
                {/* Post Header */}
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

                {/* Post Body */}
                <p className="text-sm text-[#050505] leading-normal">{post.content}</p>

                {post.image && (
                  <div className="-mx-4">
                    <img src={post.image} alt="Post Attachment" className="w-full max-h-[450px] object-cover" />
                  </div>
                )}

                {/* Reactions Metrics */}
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

                {/* Action Buttons */}
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

        {/* Right Sidebar */}
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

          <hr className="border-gray-200" />

          <div className="text-xs font-bold text-[#65676B] uppercase">Contacts</div>
          <div className="space-y-1">
            {['Sarah Chen', 'Alex Johnson', 'Michael Scott'].map((name, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-[#E4E6EB] rounded-xl cursor-pointer">
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${1494790108377 + i}?w=100`}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <span className="text-sm font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Persistent Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-2 md:hidden">
        <button className="flex flex-col items-center justify-center min-w-[48px] text-[#1877F2]">
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center min-w-[48px] text-[#65676B]">
          <Tv className="h-6 w-6" />
          <span className="text-[10px] font-bold">Watch</span>
        </button>
        <button className="flex flex-col items-center justify-center min-w-[48px] text-[#65676B]">
          <Store className="h-6 w-6" />
          <span className="text-[10px] font-bold">Market</span>
        </button>
        <Link href="/admin" className="flex flex-col items-center justify-center min-w-[48px] text-[#65676B]">
          <ShieldCheck className="h-6 w-6" />
          <span className="text-[10px] font-bold">Admin</span>
        </Link>
      </nav>
    </div>
  );
}