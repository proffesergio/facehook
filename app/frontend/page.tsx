'use client';

import { useState } from 'react';
import { INITIAL_POSTS, Post } from '@/lib/store';
import { ThumbsUp, MessageSquare, Share2, Image, Smile, Video } from 'lucide-react';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: 'You (Student Demo)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      timestamp: 'Just now',
      content: newPostText,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleToggleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Create Post Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 bg-fb-bg rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-fb-blue"
          />
        </div>
        <hr className="my-3 border-gray-100" />
        <div className="flex justify-between items-center px-2">
          <button className="flex items-center gap-2 text-xs font-semibold text-fb-secondary hover:bg-fb-hover px-3 py-2 rounded-lg transition min-h-[48px]">
            <Video className="h-5 w-5 text-red-500" /> Live Video
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold text-fb-secondary hover:bg-fb-hover px-3 py-2 rounded-lg transition min-h-[48px]">
            <Image className="h-5 w-5 text-green-500" /> Photo/Video
          </button>
          <button 
            onClick={handleCreatePost}
            className="bg-fb-blue text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition min-h-[48px]"
          >
            Post
          </button>
        </div>
      </div>

      {/* Feed Stream */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-sm text-fb-text">{post.author}</h3>
                <span className="text-xs text-fb-secondary">{post.timestamp}</span>
              </div>
            </div>

            <p className="text-sm text-fb-text mb-4 leading-relaxed">{post.content}</p>

            <div className="flex items-center justify-between text-xs text-fb-secondary pb-2 border-b border-gray-100">
              <span>{post.likes} Likes</span>
              <div className="flex gap-3">
                <span>{post.comments} Comments</span>
                <span>{post.shares} Shares</span>
              </div>
            </div>

            <div className="flex items-center justify-around pt-1">
              <button
                onClick={() => handleToggleLike(post.id)}
                className={`flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg hover:bg-fb-hover transition min-h-[48px] ${
                  post.isLiked ? 'text-fb-blue' : 'text-fb-secondary'
                }`}
              >
                <ThumbsUp className="h-4 w-4" /> Like
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-fb-secondary rounded-lg hover:bg-fb-hover transition min-h-[48px]">
                <MessageSquare className="h-4 w-4" /> Comment
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-fb-secondary rounded-lg hover:bg-fb-hover transition min-h-[48px]">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}