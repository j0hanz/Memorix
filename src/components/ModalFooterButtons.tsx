import type { ReactNode } from 'react';
import Button from './Button';
import styles from './styles/Modal.module.css';

interface ModalFooterButtonsProps {
  leftText?: ReactNode;
  rightText: ReactNode;
  onLeftClick?: () => void;
  onRightClick: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  leftClassName?: string;
  rightClassName?: string;
}

export const ModalFooterButtons = ({
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
  leftIcon,
  rightIcon,
  leftDisabled = false,
  rightDisabled = false,
  leftClassName = '',
  rightClassName = '',
}: ModalFooterButtonsProps) => (
  <div className={`d-flex ${styles.modalButtons}`}>
    {leftText && (
      <Button
        className={`${styles.btnLeft} ${styles.modalButton} ${leftClassName}`}
        onClick={onLeftClick}
        icon={leftIcon}
        text={leftText}
        color="primary"
        disabled={leftDisabled}
      />
    )}
    <Button
      className={`${styles.btnRight} ${styles.modalButton} ${rightClassName}`}
      onClick={onRightClick}
      icon={rightIcon}
      text={rightText}
      color="secondary"
      disabled={rightDisabled}
    />
  </div>
);
