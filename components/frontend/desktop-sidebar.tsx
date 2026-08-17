'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, CreditCard, User, ShieldCheck, Bookmark, Users, Calendar } from 'lucide-react';

export default function DesktopSidebar() {
  const pathname = usePathname();

  const menu = [
    { label: 'News Feed', href: '/', icon: Home },
    { label: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { label: 'Action / Checkout', href: '/checkout', icon: CreditCard },
    { label: 'Profile & Settings', href: '/profile', icon: User },
    { label: 'Admin Control', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <aside className="hidden md:block w-64 p-4 border-r border-gray-200 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
      <div className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                isActive ? 'bg-blue-50 text-fb-blue' : 'text-fb-text hover:bg-fb-hover'
              }`}
            >
              <Icon className="h-5 w-5 text-fb-blue" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="text-xs font-semibold text-fb-secondary px-3 mb-2 uppercase tracking-wider">
        Shortcuts
      </div>
      <div className="space-y-1 text-sm text-fb-secondary">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-fb-hover cursor-pointer">
          <Bookmark className="h-4 w-4" /> Saved Items
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-fb-hover cursor-pointer">
          <Users className="h-4 w-4" /> Student Groups
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-fb-hover cursor-pointer">
          <Calendar className="h-4 w-4" /> Campus Events
        </div>
      </div>
    </aside>
  );
}