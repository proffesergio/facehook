'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [toggles, setToggles] = useState({
    enableMarketplace: true,
    enableComments: true,
    maintenanceMode: false,
    plainPasswordAudit: true,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Feature Settings</h1>
        <p className="text-xs text-slate-400">Toggle live platform features across the application</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl divide-y divide-slate-700">
        <div className="p-4 flex items-center justify-between min-h-[48px]">
          <div>
            <div className="text-sm font-semibold text-white">Enable Marketplace</div>
            <div className="text-xs text-slate-400">Allow users to view and buy items</div>
          </div>
          <button
            onClick={() => toggle('enableMarketplace')}
            className={`w-12 h-6 rounded-full transition-colors p-1 ${toggles.enableMarketplace ? 'bg-fb-blue' : 'bg-slate-600'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggles.enableMarketplace ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <div className="p-4 flex items-center justify-between min-h-[48px]">
          <div>
            <div className="text-sm font-semibold text-white">Enable Comments on Feed</div>
            <div className="text-xs text-slate-400">Allow interactive user replies</div>
          </div>
          <button
            onClick={() => toggle('enableComments')}
            className={`w-12 h-6 rounded-full transition-colors p-1 ${toggles.enableComments ? 'bg-fb-blue' : 'bg-slate-600'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggles.enableComments ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <div className="p-4 flex items-center justify-between min-h-[48px]">
          <div>
            <div className="text-sm font-semibold text-white">Maintenance Mode</div>
            <div className="text-xs text-slate-400">Display maintenance screen to non-admins</div>
          </div>
          <button
            onClick={() => toggle('maintenanceMode')}
            className={`w-12 h-6 rounded-full transition-colors p-1 ${toggles.maintenanceMode ? 'bg-fb-blue' : 'bg-slate-600'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggles.maintenanceMode ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}