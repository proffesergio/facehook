'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Package, Settings, Menu, X, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Analytics Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Item Management', href: '/admin/items', icon: Package },
    { label: 'User & Passwords', href: '/admin/users', icon: Users },
    { label: 'Global Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-slate-900 text-slate-100">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-800 px-4 h-14 border-b border-slate-700 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-slate-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-extrabold text-lg text-fb-blue">Facehook Admin</span>
        </div>
        <Link href="/" className="text-xs text-slate-400 flex items-center gap-1 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> App
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-800 border-r border-slate-700 p-4">
        <div className="flex items-center justify-between mb-8 px-2">
          <span className="font-extrabold text-xl text-fb-blue">Facehook Admin</span>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive ? 'bg-fb-blue text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-700">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition px-3 py-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Main App
          </Link>
        </div>
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex md:hidden">
          <div className="w-64 bg-slate-800 h-full p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-extrabold text-lg text-fb-blue">Admin Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold min-h-[48px] ${
                        isActive ? 'bg-fb-blue text-white' : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs text-slate-400 p-3 hover:text-white min-h-[48px]"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Frontend
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}