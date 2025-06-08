import { useTooltip } from '@/hooks/ui/useTooltip';
import type { TooltipProps } from '@/types/components';

import styles from './styles/Tooltip.module.css';

export function Tooltip({
  children,
  content,
  placement = 'bottom',
  className = '',
}: TooltipProps) {
  const { visible, showTooltip, hideTooltip } = useTooltip();

  return (
    <div
      className={`${styles.tooltipTrigger} ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-expanded={visible}
    >
      {children}
      {visible && content && (
        <div
          className={`${styles.tooltip} ${styles[placement]}`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}
