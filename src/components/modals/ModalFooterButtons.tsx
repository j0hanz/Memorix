import { Button } from '@/components/buttons/Button';
import btnStyles from '@/components/buttons/styles/Button.module.css';
import type { ModalFooterButtonsProps } from '@/types/components';
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
  leftForm,
  rightForm,
}: ModalFooterButtonsProps) => (
  <div className={btnStyles.btnModalFooter}>
    {leftText && (
      <Button
        className={`${btnStyles.btnLeft} ${btnStyles.modalButton}`}
        onClick={onLeftClick}
        icon={leftIcon}
        text={leftText}
        color="primary"
        disabled={leftDisabled}
        type={leftType}
        form={leftForm}
      />
    )}
    <Button
      className={`${btnStyles.btnRight} ${btnStyles.modalButton}`}
      onClick={onRightClick}
      icon={rightIcon}
      text={rightText}
      color="secondary"
      disabled={rightDisabled}
      type={rightType}
      form={rightForm}
    />
  </div>
);
