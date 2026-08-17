import React from 'react';
import MobileNav from '@/components/frontend/mobile-nav';
import DesktopSidebar from '@/components/frontend/desktop-sidebar';
import { Search, MessageCircle, Bell, ShieldCheck as UserAdmin, Menu } from 'lucide-react';
import Link from 'next/link';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-fb-bg text-fb-text">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-14 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-fb-blue font-extrabold text-2xl tracking-tighter hover:opacity-90 transition">
            facehook
          </Link>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-fb-secondary" />
            <input
              type="text"
              placeholder="Search Facehook..."
              className="pl-9 pr-4 py-1.5 bg-fb-bg rounded-full text-sm outline-none w-48 focus:w-64 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin" className="hidden sm:flex items-center gap-1 bg-fb-blue text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-600 transition">
            Admin Panel
          </Link>
          <button className="min-w-[48px] min-h-[48px] flex items-center justify-center bg-fb-hover rounded-full hover:bg-gray-300 transition">
            <MessageCircle className="h-5 w-5 text-fb-text" />
          </button>
          <button className="min-w-[48px] min-h-[48px] flex items-center justify-center bg-fb-hover rounded-full hover:bg-gray-300 transition">
            <Bell className="h-5 w-5 text-fb-text" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 md:pb-0">
        <DesktopSidebar />
        <main className="flex-1 min-w-0 p-2 sm:p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}