import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Modal as CustomModal } from 'react-bootstrap';

import { Button } from '@/components/Button';
import btnStyles from '@/components/styles/Button.module.css';
import styles from '@/components/styles/Modal.module.css';
import type { ModalProps } from '@/types/components';

export function Modal({
  show,
  onClose,
  title,
  children,
  footer,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  backdrop = true,
  centered = true,
  size,
  showCloseButton = true,
}: ModalProps) {
  return (
    <CustomModal
      show={show}
      onHide={onClose}
      centered={centered}
      className={`${styles.modal} ${className}`}
      backdrop={backdrop}
      size={size}
    >
      {title && (
        <CustomModal.Header
          className={`border-0 d-flex justify-content-center ${headerClassName}`}
        >
          <CustomModal.Title>{title}</CustomModal.Title>
        </CustomModal.Header>
      )}

      <CustomModal.Body className={`p-0 ${bodyClassName}`}>
        {children}
      </CustomModal.Body>

      {footer && (
        <CustomModal.Footer className={`border-0 ${footerClassName}`}>
          {footer}
        </CustomModal.Footer>
      )}

      {!footer && showCloseButton && (
        <CustomModal.Footer className={`border-0 ${footerClassName}`}>
          <Button
            className={`${btnStyles.btnEnd} ${btnStyles.modalButton}`}
            icon={<CloseOutlinedIcon fontSize="small" />}
            onClick={onClose}
            text="Close"
          />
        </CustomModal.Footer>
      )}
    </CustomModal>
  );
}
