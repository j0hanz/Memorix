import { useState } from 'react';

import type { TooltipProps } from '@/types/components';

import styles from './styles/Tooltip.module.css';

export function Tooltip({
  children,
  content,
  placement = 'bottom',
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={styles.tooltipTrigger}
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
    >
      {children}
      {visible && content && (
        <span
          className={`${styles.tooltip} ${styles[placement]} ${className}`}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}
