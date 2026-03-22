'use client';

import { useEffect, type ReactNode } from 'react';
import { useUserStore } from '@/lib/stores/userStore';
import AuthProvider from '@/components/providers/AuthProvider';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientShell({ children }: { children: ReactNode }) {
  const user = useUserStore((s) => s.user);
  const loadFromStorage = useUserStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#06060B]">
        <Navbar user={user} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
