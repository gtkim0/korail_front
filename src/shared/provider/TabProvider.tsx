'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children, initialTab }: { children: ReactNode; initialTab: string }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};