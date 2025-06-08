import { TabNavigation } from '@/components/navigation/TabNavigation';
import { useTabs } from '@/hooks/ui/useTabs';
import type { ModalTabsProps } from '@/types/components';

export function ModalTabs({
  tabs,
  tabContents,
  defaultActiveKey,
}: ModalTabsProps) {
  const { activeKey, setActiveKey, getActiveContent } = useTabs({
    tabs,
    tabContents,
    defaultActiveKey,
  });

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
