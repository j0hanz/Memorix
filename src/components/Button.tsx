import type { FC } from 'react';
import { Button as CustomButton } from 'react-bootstrap';

import { Tooltip } from '@/components/Tooltip';
import type { CustomButtonProps } from '@/types/components';

import styles from './styles/Button.module.css';

// Button component with optional icon, text, img, and tooltip
const Button: FC<
  CustomButtonProps & {
    variant?: 'menu' | 'centered';
    color?: 'primary' | 'secondary' | 'transparent';
    img?: string;
    imgAlt?: string;
    imgClassName?: string;
    tooltip?: string;
    category?: string;
  }
> = ({
  icon,
  text = '',
  img,
  imgAlt = '',
  imgClassName = '',
  className = '',
  children,
  onClick,
  variant,
  color = 'secondary',
  tooltip,
  ...props
}) => {
  const buttonClassName = [
    styles.customButton,
    className,
    color === 'primary' ? styles.primaryColor : '',
    color === 'secondary' ? styles.secondaryColor : '',
    color === 'transparent' ? styles.transparent : '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const textClassName =
    `${styles.text} ${variant === 'menu' ? styles.menuText : ''}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const buttonContent = (
    <CustomButton {...props} onClick={handleClick} className={buttonClassName}>
      {img && <img src={img} alt={imgAlt} className={imgClassName} />}
      {icon && <div className={styles.icon}>{icon}</div>}
      {text && <div className={textClassName}>{text}</div>}
      {children}
    </CustomButton>
  );

  return tooltip ? (
    <Tooltip content={tooltip}>{buttonContent}</Tooltip>
  ) : (
    buttonContent
  );
};

export default Button;
