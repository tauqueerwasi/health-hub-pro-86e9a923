import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthIntent {
  intendedPath: string;
  intendedData?: {
    doctorId?: string;
    specialty?: string;
    city?: string;
    appointmentStep?: number;
    sourcePage?: string;
  };
}

interface AuthIntentContextType {
  authIntent: AuthIntent | null;
  setAuthIntent: (intent: AuthIntent | null) => void;
  clearIntent: () => void;
  saveIntentAndRedirect: (path: string, data?: AuthIntent['intendedData']) => void;
}

const AuthIntentContext = createContext<AuthIntentContextType | undefined>(undefined);

const INTENT_STORAGE_KEY = 'medicare_auth_intent';

export function AuthIntentProvider({ children }: { children: ReactNode }) {
  const [authIntent, setAuthIntentState] = useState<AuthIntent | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(INTENT_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  useEffect(() => {
    if (authIntent) {
      localStorage.setItem(INTENT_STORAGE_KEY, JSON.stringify(authIntent));
    } else {
      localStorage.removeItem(INTENT_STORAGE_KEY);
    }
  }, [authIntent]);

  const setAuthIntent = (intent: AuthIntent | null) => {
    setAuthIntentState(intent);
  };

  const clearIntent = () => {
    setAuthIntentState(null);
    localStorage.removeItem(INTENT_STORAGE_KEY);
  };

  const saveIntentAndRedirect = (path: string, data?: AuthIntent['intendedData']) => {
    const intent: AuthIntent = {
      intendedPath: path,
      intendedData: data,
    };
    setAuthIntent(intent);
  };

  return (
    <AuthIntentContext.Provider value={{
      authIntent,
      setAuthIntent,
      clearIntent,
      saveIntentAndRedirect,
    }}>
      {children}
    </AuthIntentContext.Provider>
  );
}

export function useAuthIntent() {
  const context = useContext(AuthIntentContext);
  if (context === undefined) {
    throw new Error('useAuthIntent must be used within an AuthIntentProvider');
  }
  return context;
}
