import { Modal } from 'react-bootstrap';
import InstructionsData from '@/components/instructionsData';
import Button from '@/components/Button';
import type { GameInstructionsProps } from '@/types/components';
import styles from './styles/Modal.module.css';

export function GameInstructions({ show, onClose }: GameInstructionsProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className={`${styles.modal} ${styles.instructionsModal}`}
    >
      <InstructionsData />
      <Modal.Footer className="border-0 mt-2">
        <Button className={styles.btnClose} onClick={onClose} text="Close" />
      </Modal.Footer>
    </Modal>
  );
}
