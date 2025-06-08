import { useState } from 'react';

import type { TabContent, TabItem } from '@/types/components';

export interface UseTabsProps {
  tabs: TabItem[];
  tabContents: TabContent[];
  defaultActiveKey?: string;
}

export function useTabs({ tabs, tabContents, defaultActiveKey }: UseTabsProps) {
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey || tabs[0]?.key || '',
  );

  const getActiveContent = () => {
    const activeContent = tabContents.find(
      (content) => content.key === activeKey,
    );
    return activeContent?.content;
  };

  return {
    activeKey,
    setActiveKey,
    getActiveContent,
  };
}
