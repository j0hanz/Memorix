import { createContext } from 'react';

import type { SoundKey } from '@/constants/sounds';

export interface SoundContextType {
  isMuted: boolean;
  playSound: (soundKey: SoundKey) => void;
  toggleMute: () => void;
  setMuteState: (muted: boolean) => void;
}

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

export default SoundContext;
