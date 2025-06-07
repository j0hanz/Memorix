import { Modal } from '@/components/modals/Modal';
import styles from '@/components/modals/styles/Modal.module.css';
import { InstructionsData } from '@/components/ui/instructionsData';
import { MODAL_CONFIGS } from '@/constants/configs';
import type { GameInstructionsProps } from '@/types/components';

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
