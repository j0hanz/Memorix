import InstructionsData from '@/components/instructionsData';
import { Modal } from '@/components/Modal';
import { MODAL_CONFIGS } from '@/contexts/ModalContext';
import type { GameInstructionsProps } from '@/types/components';

export function GameInstructions({ show, onClose }: GameInstructionsProps) {
  const config = MODAL_CONFIGS.instructions;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="instructionsModal"
      size={config.size}
      backdrop={config.backdrop}
    >
      <InstructionsData />
    </Modal>
  );
}
