import type { FC } from 'react';
import { Button as CustomButton } from 'react-bootstrap';
import type { CustomButtonProps } from '@/types/components';
import styles from './styles/Button.module.css';

// Button component with optional icon and text
const Button: FC<CustomButtonProps & { variant?: 'menu' | 'centered' }> = ({
  icon,
  text = '',
  className = '',
  children,
  onClick,
  variant,
  ...props
}) => {
  const buttonClassName = `${styles.customButton} ${className}`.trim();
  const textClassName =
    `${styles.text} ${variant === 'menu' ? styles.menuText : ''}`.trim();

  return (
    <CustomButton {...props} onClick={onClick} className={buttonClassName}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {text && <div className={textClassName}>{text}</div>}
      {children}
    </CustomButton>
  );
};

export default Button;
