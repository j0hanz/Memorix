import React from 'react';

interface CardProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
  ariaSelected?: boolean;
  ariaHidden?: boolean;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
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
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div
      className={className}
      onClick={disabled ? undefined : onClick}
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

export default Card;
