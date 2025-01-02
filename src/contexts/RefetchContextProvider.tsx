'use client'; // Keep this for client-side rendering

import React, { createContext, useContext } from 'react';

type RefetchContextType = {
  refetch: () => void;
};

const RefetchContext = createContext<RefetchContextType | null>(null);

export const useRefetch = () => {
  const context = useContext(RefetchContext);

  if (!context) {
    throw new Error('useRefetch must be used within a RefetchProvider');
  }

  return context.refetch;
};

type RefetchProviderProps = {
  refetch: () => void;
  children: React.ReactNode;
};

export const RefetchProvider: React.FC<RefetchProviderProps> = ({ refetch, children }) => (
  <RefetchContext.Provider value={{ refetch }}>
    {children}
  </RefetchContext.Provider>
);
