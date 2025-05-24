import { createContext } from 'react';

import type { ModalContextType } from '@/types/context';

// Default modal context values
export const ModalContext = createContext<ModalContextType>({
  activeModal: null,
  modalData: {},
  openModal: () => {
    throw new Error('openModal not implemented');
  },
  closeModal: () => {
    throw new Error('closeModal not implemented');
  },
});
