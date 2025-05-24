import type { ModalFooterButtonsProps } from '@/types/components';

import { Button } from './Button';
import styles from './styles/Modal.module.css';

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
  <div className={styles.modalButtons}>
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
