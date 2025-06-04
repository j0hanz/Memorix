import { useState } from 'react';

import type { ModalType } from '@/types/context';
import type { ModalData } from '@/types/data';

// Modal state handler
export function useModalHandler() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<ModalData>({});

  const openModal = (type: ModalType, data: ModalData = {}) => {
    setActiveModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData({});
  };

  return {
    activeModal,
    modalData,
    openModal,
    closeModal,
  };
}
