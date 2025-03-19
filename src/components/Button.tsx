import { FC } from 'react';
import { Button as CustomButton } from 'react-bootstrap';
import { CustomButtonProps } from '@/types/components';
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
      {icon}
      {text}
      {children}
    </CustomButton>
  );
};

export default Button;
