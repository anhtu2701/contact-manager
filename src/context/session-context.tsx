import { createContext, useContext, useState, type ReactNode } from 'react';

import { ACCOUNT } from '@/constants/auth';

type SessionContextValue = {
  isLoggedIn: boolean;
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = (username: string, password: string) => {
    const isMatch = username === ACCOUNT.username && password === ACCOUNT.password;
    setIsLoggedIn(isMatch);
    return isMatch;
  };

  const signOut = () => setIsLoggedIn(false);

  return (
    <SessionContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
