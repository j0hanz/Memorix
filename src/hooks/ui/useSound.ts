import { useState } from 'react';
import useSound from 'use-sound';

import type { SoundKey } from '@/constants/sounds';
import { SOUND_FILES } from '@/constants/sounds';
import type { SoundContextType } from '@/types/context';
import type { SoundMapType } from '@/types/utils';
import {
  getInitialMuteState,
  playSoundEffect,
  saveMuteState,
} from '@/utils/soundUtils';

// Sound state handler
export function useSoundHandler(): SoundContextType {
  const [isMuted, setIsMuted] = useState<boolean>(() => getInitialMuteState());

  const toggleMute = (): void => {
    setMuteState(!isMuted);
  };

  const setMuteState = (muted: boolean): void => {
    setIsMuted(muted);
    saveMuteState(muted);
  };

  const [playButton] = useSound(SOUND_FILES.button, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playClick] = useSound(SOUND_FILES.click, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playComplete] = useSound(SOUND_FILES.complete, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playCorrect] = useSound(SOUND_FILES.correct, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });
  const [playWrong] = useSound(SOUND_FILES.wrong, {
    volume: 1.0,
    soundEnabled: !isMuted,
  });

  const soundMap: SoundMapType = {
    button: playButton,
    click: playClick,
    complete: playComplete,
    correct: playCorrect,
    wrong: playWrong,
  };

  const playSound = (soundKey: SoundKey): void => {
    playSoundEffect(soundMap, soundKey, isMuted);
  };

  return {
    isMuted,
    playSound,
    toggleMute,
    setMuteState,
  };
}
