'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ items, defaultValue, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value || '');

  return (
    <div className={className}>
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              activeTab === item.value && 'bg-background text-foreground shadow-sm'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {items.find((item) => item.value === activeTab)?.content}
      </div>
    </div>
  );
}
