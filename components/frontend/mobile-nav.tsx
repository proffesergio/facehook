'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, CreditCard, User, ShieldCheck } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Feed', href: '/', icon: Home },
    { label: 'Market', href: '/marketplace', icon: ShoppingBag },
    { label: 'Checkout', href: '/checkout', icon: CreditCard },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Admin', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 h-16 flex items-center justify-around px-2 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 rounded-lg transition-colors ${
              isActive ? 'text-fb-blue' : 'text-fb-secondary hover:text-fb-text'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}