import type { FC } from 'react';
import { Button as CustomButton } from 'react-bootstrap';
import type { CustomButtonProps } from '@/types/components';
import styles from './styles/Button.module.css';

// Button component with optional icon and text
const Button: FC<CustomButtonProps> = ({
  icon,
  text = '',
  className = '',
  children,
  onClick,
  ...props
}) => {
  const buttonClassName = `${styles.customButton} ${className}`.trim();

  return (
    <CustomButton {...props} onClick={onClick} className={buttonClassName}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {text && <div className={styles.text}>{text}</div>}
      {children}
    </CustomButton>
  );
};

export default Button;
