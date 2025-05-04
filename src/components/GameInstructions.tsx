import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Modal } from 'react-bootstrap';

import Button from '@/components/Button';
import InstructionsData from '@/components/instructionsData';
import type { GameInstructionsProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export function GameInstructions({ show, onClose }: GameInstructionsProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered={true}
      className={`${styles.modal} ${styles.instructionsModal}`}
    >
      <InstructionsData />
      <Modal.Footer className="border-0 mt-2">
        <Button
          className={styles.modalButton}
          icon={<CloseOutlinedIcon fontSize="small" />}
          onClick={onClose}
          text="Close"
        />
      </Modal.Footer>
    </Modal>
  );
}
