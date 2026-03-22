'use client';

import { useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useUserStore } from '@/lib/stores';

function AuthBridge({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { isLoggedIn, login } = useUserStore();

  useEffect(() => {
    // When NextAuth session exists but Zustand store doesn't have the user,
    // bridge the session into the Zustand store (handles Google/GitHub OAuth)
    if (status === 'authenticated' && session?.user && !isLoggedIn) {
      const email = session.user.email || '';
      const name = session.user.name || email.split('@')[0];
      const username = name.toLowerCase().replace(/[^a-z0-9_]/g, '');
      login(username, name, email);
    }
  }, [status, session, isLoggedIn, login]);

  return <>{children}</>;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthBridge>{children}</AuthBridge>
    </SessionProvider>
  );
}
