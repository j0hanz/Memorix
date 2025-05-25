import { InstructionsData } from '@/components/instructionsData';
import { Modal } from '@/components/Modal';
import { MODAL_CONFIGS } from '@/constants/configs';
import type { GameInstructionsProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export function GameInstructions({ show, onClose }: GameInstructionsProps) {
  const config = MODAL_CONFIGS.instructions;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className={styles.modalContent}
      backdrop={config.backdrop}
    >
      <InstructionsData />
    </Modal>
  );
}
