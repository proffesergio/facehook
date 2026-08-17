'use client';

import { Users, Activity, DollarSign, ArrowUpRight } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
        <p className="text-xs text-slate-400">Educational metrics & server dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Registered Users</span>
            <Users className="h-5 w-5 text-fb-blue" />
          </div>
          <div className="text-2xl font-extrabold text-white">1,248</div>
          <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
            <ArrowUpRight className="h-4 w-4" /> +12.4% this week
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400">Active Feed Posts</span>
            <Activity className="h-5 w-5 text-green-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">8,492</div>
          <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
            <ArrowUpRight className="h-4 w-4" /> +8.1% this week
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400">Marketplace Volume</span>
            <DollarSign className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">$14,520</div>
          <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
            <ArrowUpRight className="h-4 w-4" /> +18.2% this week
          </div>
        </div>
      </div>

      {/* Chart Representation */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-slate-200">Weekly User Engagement Metrics</h2>
        <div className="h-48 flex items-end justify-between gap-2 pt-8">
          {[40, 65, 80, 55, 90, 75, 100].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-fb-blue/80 hover:bg-fb-blue rounded-t transition-all duration-300"
                style={{ height: `${val}%` }}
              ></div>
              <span className="text-[10px] text-slate-400">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}