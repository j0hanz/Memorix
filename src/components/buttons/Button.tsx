import type { FC } from 'react';
import { Button as CustomButton } from 'react-bootstrap';

import { Image } from '@/components/ui/Image';
import { Tooltip } from '@/components/ui/Tooltip';
import { useSound } from '@/hooks/shared/useProvider';
import type { CustomButtonProps } from '@/types/components';

import styles from './styles/Button.module.css';

export const Button: FC<
  CustomButtonProps & {
    variant?: 'menu' | 'centered';
    color?: 'primary' | 'secondary' | 'transparent';
    img?: string;
    imgAlt?: string;
    imgClassName?: string;
    tooltip?: string;
    tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
    category?: string;
    className?: string;
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
  tooltipPlacement,
  ...props
}) => {
  const baseButtonAppearanceClasses = [
    styles.customButton,
    color === 'primary' ? styles.primaryColor : '',
    color === 'secondary' ? styles.secondaryColor : '',
    color === 'transparent' ? styles.transparent : '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const textClassName =
    `${styles.text} ${variant === 'menu' ? styles.menuText : ''}`.trim();
  const { playSound } = useSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      playSound('button');
      onClick(e);
    }
  };

  const buttonInnards = (
    <>
      {img && (
        <Image
          src={img}
          alt={imgAlt || ''}
          className={imgClassName}
          fallbackSrc="/img/fallback.webp"
          loading="eager"
        />
      )}
      {icon && <div className={styles.icon}>{icon}</div>}
      {text && <div className={textClassName}>{text}</div>}
      {children}
    </>
  );

  if (tooltip) {
    return (
      <Tooltip
        content={tooltip}
        placement={tooltipPlacement || 'bottom'}
        className={className}
      >
        <CustomButton
          {...props}
          onClick={handleClick}
          className={baseButtonAppearanceClasses}
        >
          {buttonInnards}
        </CustomButton>
      </Tooltip>
    );
  } else {
    const finalButtonClassName =
      `${baseButtonAppearanceClasses} ${className}`.trim();
    return (
      <CustomButton
        {...props}
        onClick={handleClick}
        className={finalButtonClassName}
      >
        {buttonInnards}
      </CustomButton>
    );
  }
};
