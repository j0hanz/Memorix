import { Tooltip } from '@/components/ui/Tooltip';
import type { CategoryIconProps } from '@/types/components';
import { getCategoryIcon } from '@/utils/game/categoryUtils';

export function CategoryIcon({
  categoryName,
  placement = 'bottom',
  className = '',
}: CategoryIconProps) {
  return (
    <Tooltip content={categoryName} placement={placement} className={className}>
      {getCategoryIcon(categoryName)}
    </Tooltip>
  );
}
