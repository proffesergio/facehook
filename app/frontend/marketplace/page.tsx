'use client';

import { INITIAL_ITEMS } from '@/lib/store';
import { Tag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function MarketplacePage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-fb-text">Campus Marketplace</h1>
          <p className="text-xs text-fb-secondary">Educational items and tech discovery feed</p>
        </div>
        <button className="bg-fb-blue text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition">
          + Sell Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INITIAL_ITEMS.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm text-fb-text line-clamp-1">{item.title}</h3>
                  <span className="text-fb-blue font-extrabold text-sm">${item.price}</span>
                </div>
                <p className="text-xs text-fb-secondary mb-2">Seller: {item.seller}</p>
                <span className="inline-block bg-gray-100 text-fb-secondary text-[10px] px-2 py-0.5 rounded-md font-semibold">
                  {item.category}
                </span>
              </div>

              <Link
                href={`/checkout?item=${encodeURIComponent(item.title)}&price=${item.price}`}
                className="mt-4 flex items-center justify-center gap-2 bg-fb-blue text-white w-full py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition min-h-[48px]"
              >
                <ShoppingCart className="h-4 w-4" /> Instant Checkout
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}