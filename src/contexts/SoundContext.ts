import { createContext } from 'react';

import type { SoundContextType } from '@/types/context';

export const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  playSound: () => {
    // Default implementation does nothing
  },
  toggleMute: () => {
    // Default implementation does nothing
  },
  setMuteState: () => {
    // Default implementation does nothing
  },
});
