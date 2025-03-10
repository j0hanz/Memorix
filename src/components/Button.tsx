import { FC, ReactNode } from 'react';
import { Button as CustomButton, ButtonProps } from 'react-bootstrap';
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/utils/constants';
import styles from './styles/Button.module.css';

interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  text?: string;
  className?: string;
}

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
  const { playSound } = useSoundEffects();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    playSound(SOUNDS.BUTTON);
    onClick?.(event);
  };

  return (
    <CustomButton {...props} onClick={handleClick} className={buttonClassName}>
      {text ? <span className={styles.buttonText}>{text}</span> : null}
      {children}
      {icon ? <span className={styles.buttonIcon}>{icon}</span> : null}
    </CustomButton>
  );
};

export default Button;
