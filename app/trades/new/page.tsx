'use client';

import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NewTradePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold">New Trade</h1>
          </div>
          {/* Form will be rendered by the dynamic route */}
        </div>
      </main>
    </div>
  );
}
