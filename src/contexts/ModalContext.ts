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
    size: 'sm',
    backdrop: true,
  },
  instructions: {
    size: 'lg',
    backdrop: true,
  },
  latestUpdates: {
    size: 'lg',
    backdrop: true,
  },
  categorySelection: {
    size: 'md',
    backdrop: 'static',
  },
  profile: {
    size: 'md',
    backdrop: true,
  },
  scoreboard: {
    size: 'md',
    backdrop: 'static',
  },
};
