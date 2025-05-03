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
  leftType?: 'button' | 'submit' | 'reset';
  rightType?: 'button' | 'submit' | 'reset';
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
  leftType = 'button',
  rightType = 'button',
}: ModalFooterButtonsProps) => (
  <div className={`d-flex ${styles.modalButtons}`}>
    {leftText && (
      <Button
        className={`${styles.btnLeft} ${styles.modalButton}`}
        onClick={onLeftClick}
        icon={leftIcon}
        text={leftText}
        color="primary"
        disabled={leftDisabled}
        type={leftType}
      />
    )}
    <Button
      className={`${styles.btnRight} ${styles.modalButton}`}
      onClick={onRightClick}
      icon={rightIcon}
      text={rightText}
      color="secondary"
      disabled={rightDisabled}
      type={rightType}
    />
  </div>
);
