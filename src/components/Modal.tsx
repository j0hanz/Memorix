import { Modal as CustomModal } from 'react-bootstrap';
import styles from './styles/Modal.module.css';
import Button from './Button';
import type { ModalProps } from '@/types/components';

export function Modal({
  show,
  onClose,
  title,
  children,
  footerContent,
  modalClassName = '',
  hasCloseButton = false,
  backdrop,
  closeButtonText = 'Close',
  bodyClassName = '',
}: ModalProps) {
  return (
    <CustomModal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${modalClassName}`}
      backdrop={backdrop}
    >
      {title && (
        <CustomModal.Header className="border-0 d-flex justify-content-center">
          <CustomModal.Title>{title}</CustomModal.Title>
        </CustomModal.Header>
      )}
      <CustomModal.Body className={bodyClassName}>{children}</CustomModal.Body>
      <CustomModal.Footer className="border-0 mt-2">
        {footerContent}
        {hasCloseButton && (
          <Button className={styles.btnClose} onClick={onClose}>
            {closeButtonText}
          </Button>
        )}
      </CustomModal.Footer>
    </CustomModal>
  );
}
