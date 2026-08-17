'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const itemName = searchParams.get('item') || 'Demo Boost Sponsorship Post';
  const itemPrice = searchParams.get('price') || '25';

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
      <h1 className="text-xl font-bold text-fb-text flex items-center gap-2">
        <CreditCard className="text-fb-blue h-6 w-6" /> Action Checkout Workflow
      </h1>

      {submitted ? (
        <div className="text-center py-8 space-y-3">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-lg font-bold text-fb-text">Transaction Complete!</h2>
          <p className="text-xs text-fb-secondary">
            This checkout workflow simulates student purchases on Facehook.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-fb-blue text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition min-h-[48px]"
          >
            Process Another Item
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-fb-bg p-3 rounded-lg border border-gray-200">
            <span className="text-xs text-fb-secondary">Selected Package</span>
            <div className="font-bold text-sm text-fb-text">{itemName}</div>
            <div className="text-fb-blue font-extrabold text-base">${itemPrice}.00 USD</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-fb-secondary mb-1">Full Name</label>
            <input
              type="text"
              required
              defaultValue="Demo Student"
              className="w-full bg-fb-bg border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-fb-blue min-h-[48px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-fb-secondary mb-1">Demo Card Number</label>
            <input
              type="text"
              required
              defaultValue="4242 •••• •••• 4242"
              className="w-full bg-fb-bg border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-fb-blue min-h-[48px]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-fb-blue text-white font-bold py-3 rounded-lg text-sm hover:bg-blue-600 transition min-h-[48px]"
          >
            Pay ${itemPrice}.00
          </button>
        </form>
      )}
    </div>
  );
}