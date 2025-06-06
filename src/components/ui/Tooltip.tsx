import { useState } from 'react';

import styles from '@/components/styles/Tooltip.module.css';
import type { TooltipProps } from '@/types/components';

export function Tooltip({
  children,
  content,
  placement = 'bottom',
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`${styles.tooltipTrigger} ${className}`}
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
      onFocus={() => {
        setVisible(true);
      }}
      onBlur={() => {
        setVisible(false);
      }}
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
