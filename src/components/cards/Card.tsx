import type { CardProps } from '@/types/components';

export const Card: React.FC<CardProps> = ({
  className = '',
  onClick,
  children,
  role = 'button',
  ariaLabel,
  ariaSelected = false,
  ariaHidden = false,
  disabled = false,
}) => {
  const defaultStyles: React.CSSProperties = {
    cursor: disabled ? 'default' : onClick ? 'pointer' : 'default',
  };

  return (
    <div
      className={className}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
      role={role}
      aria-label={ariaLabel}
      aria-selected={ariaSelected}
      aria-hidden={ariaHidden}
      tabIndex={disabled ? -1 : 0}
      style={defaultStyles}
    >
      {children}
    </div>
  );
};
