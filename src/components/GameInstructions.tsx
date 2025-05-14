import InstructionsData from '@/components/instructionsData';
import { Modal } from '@/components/Modal';
import type { GameInstructionsProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export function GameInstructions({ show, onClose }: GameInstructionsProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      className={styles.instructionsModal}
      showCloseButton={true}
    >
      <InstructionsData />
    </Modal>
  );
}
