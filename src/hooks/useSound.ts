import { useContext } from 'react';

import { SoundContext } from '@/contexts/SoundContext';

export function useSound() {
  return useContext(SoundContext);
}

export default useSound;
