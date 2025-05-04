import { useState } from 'react';

import { TabNavigation } from '@/components/TabNavigation';
import type { ModalTabsProps } from '@/types/components';

export function ModalTabs({
  tabs,
  tabContents,
  defaultActiveKey,
}: ModalTabsProps) {
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey || tabs[0]?.key || '',
  );

  const getActiveContent = () => {
    const activeContent = tabContents.find(
      (content) => content.key === activeKey,
    );
    return activeContent?.content;
  };

  return (
    <>
      <TabNavigation
        activeKey={activeKey}
        tabs={tabs}
        onSelect={setActiveKey}
      />
      {getActiveContent()}
    </>
  );
}
