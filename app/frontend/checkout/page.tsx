// app/frontend/checkout/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// 1. Inner component that reads query parameters
function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'Standard';
  const price = searchParams.get('price') || '$0.00';

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Checkout</h1>
      <div className="space-y-3 mb-6 text-sm text-gray-600">
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span>Selected Plan:</span>
          <span className="font-semibold text-gray-900 capitalize">{plan}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span>Total Due:</span>
          <span className="font-semibold text-gray-900">{price}</span>
        </div>
      </div>
      <button className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition">
        Complete Purchase
      </button>
    </div>
  );
}

// 2. Loading placeholder shown during hydration/rendering
function CheckoutFallback() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md w-full animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
}

// 3. Main page component wrapped in a Suspense boundary
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
      <Suspense fallback={<CheckoutFallback />}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}