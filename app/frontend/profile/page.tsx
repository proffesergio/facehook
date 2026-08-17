'use client';

import { User, Shield, Bell, Lock } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-fb-blue mb-3"
        />
        <h1 className="text-xl font-bold text-fb-text">Student Demo Account</h1>
        <p className="text-xs text-fb-secondary mb-4">Web Development Cohort #12</p>
        <span className="inline-block bg-blue-100 text-fb-blue text-xs font-bold px-3 py-1 rounded-full">
          Role: Student User
        </span>
      </div>

      {/* Settings Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
        <div className="p-4 flex items-center justify-between min-h-[48px]">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-fb-blue" />
            <div>
              <div className="text-sm font-semibold text-fb-text">Account Information</div>
              <div className="text-xs text-fb-secondary">student@facehook.edu</div>
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between min-h-[48px]">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-fb-blue" />
            <div>
              <div className="text-sm font-semibold text-fb-text">Privacy Mode</div>
              <div className="text-xs text-fb-secondary">Public visibility active</div>
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between min-h-[48px]">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-fb-blue" />
            <div>
              <div className="text-sm font-semibold text-fb-text">Notifications</div>
              <div className="text-xs text-fb-secondary">Push notifications enabled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}