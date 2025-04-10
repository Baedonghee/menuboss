import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export interface HValidation {
  history: string[];
  setHistory(data: string[]): void;
  back(fallbackRoute?: string): void;
}

interface IHistoryProvider {
  children: React.ReactNode;
}

export const HistoryContext = createContext<HValidation>({} as HValidation);
export const HistoryProvider: React.FC<IHistoryProvider> = ({ children }) => {
  const router = useRouter();
  const { asPath, push, pathname } = router;
  const [history, setHistory] = useState<string[]>([]);
  function back(fallbackRoute?: string) {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i];
      if (!route.includes('#') && route !== pathname) {
        push(route);
        const newHistory = history.slice(0, i);
        setHistory(newHistory);
        return;
      }
    }
    if (fallbackRoute) {
      router.push(fallbackRoute);
    }
  }

  useEffect(() => {
    setHistory((previous) => [...previous, asPath]);
  }, [asPath]);

  return (
    <HistoryContext.Provider
      value={{
        back,
        history,
        setHistory
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
