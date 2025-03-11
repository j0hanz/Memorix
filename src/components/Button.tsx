import { FC } from 'react';
import { Button as CustomButton } from 'react-bootstrap';
import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';
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
