import React from 'react';

interface CardProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
}

// Card component
const Card: React.FC<CardProps> = ({
  className = '',
  onClick,
  children,
  role = 'region',
  ariaLabel,
}) => {
  const defaultStyles: React.CSSProperties = {
    cursor: onClick ? 'pointer' : 'default',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div
      className={className}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      style={defaultStyles}
    >
      {children}
    </div>
  );
};

export default Card;
