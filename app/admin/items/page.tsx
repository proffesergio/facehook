'use client';

import { useState } from 'react';
import { INITIAL_ITEMS, MarketplaceItem } from '@/lib/store';

export default function ItemManagementPage() {
  const [items, setItems] = useState<MarketplaceItem[]>(INITIAL_ITEMS);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Item Management</h1>
          <p className="text-xs text-slate-400">Responsive list collapsing to stacked cards on mobile</p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/50 text-xs font-semibold text-slate-400 uppercase">
            <tr>
              <th className="px-4 py-3">Item Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Seller</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {items.map((itm) => (
              <tr key={itm.id} className="hover:bg-slate-700/50">
                <td className="px-4 py-3 font-semibold text-white">{itm.title}</td>
                <td className="px-4 py-3">{itm.category}</td>
                <td className="px-4 py-3 text-fb-blue font-bold">${itm.price}</td>
                <td className="px-4 py-3">{itm.seller}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    itm.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {itm.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="space-y-3 md:hidden">
        {items.map((itm) => (
          <div key={itm.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-white text-sm">{itm.title}</h3>
              <span className="text-fb-blue font-extrabold text-sm">${itm.price}</span>
            </div>
            <div className="text-xs text-slate-400">Category: {itm.category}</div>
            <div className="text-xs text-slate-400">Seller: {itm.seller}</div>
            <div className="pt-2">
              <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                itm.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {itm.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}