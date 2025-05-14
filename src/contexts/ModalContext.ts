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

// Configuration for different modal types
export const MODAL_CONFIGS = {
  auth: {
    backdrop: true,
  },
  instructions: {
    backdrop: true,
  },
  latestUpdates: {
    backdrop: true,
  },
  categorySelection: {
    backdrop: 'static',
  },
  profile: {
    backdrop: true,
  },
  scoreboard: {
    backdrop: 'static',
  },
};
