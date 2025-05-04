import { Howl, Howler } from 'howler';
import { useEffect, useRef, useState } from 'react';

import { STORAGE_KEYS } from '@/constants/constants';
import type { SoundKey } from '@/constants/sounds';
import { SOUND_FILES } from '@/constants/sounds';

export function useSoundEffects() {
  // Read mute state from localStorage on first render
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MUTE_STATE) === 'true';
    } catch (error) {
      console.error('Error accessing localStorage for mute state:', error);
      return false;
    }
  });

  // Store Howl instances
  const soundsRef = useRef<Record<SoundKey, Howl>>(
    {} as Record<SoundKey, Howl>,
  );

  // Load sound files and set up Howl instances
  useEffect(() => {
    const newSounds: Record<SoundKey, Howl> = {
      button: new Howl({
        src: SOUND_FILES.button,
        onloaderror: (_id, error) => {
          console.error(`Error loading sound button:`, error);
        },
      }),
      click: new Howl({
        src: SOUND_FILES.click,
        onloaderror: (_id, error) => {
          console.error(`Error loading sound click:`, error);
        },
      }),
      complete: new Howl({
        src: SOUND_FILES.complete,
        onloaderror: (_id, error) => {
          console.error(`Error loading sound complete:`, error);
        },
      }),
      correct: new Howl({
        src: SOUND_FILES.correct,
        onloaderror: (_id, error) => {
          console.error(`Error loading sound correct:`, error);
        },
      }),
      wrong: new Howl({
        src: SOUND_FILES.wrong,
        onloaderror: (_id, error) => {
          console.error(`Error loading sound wrong:`, error);
        },
      }),
    };
    soundsRef.current = newSounds;

    // Sync mute state with Howler
    Howler.mute(isMuted);

    // Cleanup on unmount
    return () => {
      Object.values(soundsRef.current).forEach((sound) => {
        try {
          sound.unload();
        } catch (error) {
          console.error('Error unloading sound:', error);
        }
      });
    };
  }, [isMuted]);

  // Play a sound by key, if not muted
  function playSound(soundKey: SoundKey): void {
    if (isMuted) return;
    const sound = soundsRef.current[soundKey];
    if (!sound) {
      console.warn(`No sound found for key: "${soundKey}"`);
      return;
    }
    try {
      sound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Toggle mute state and sync with localStorage and Howler
  function toggleMute(): void {
    setMuteState(!isMuted);
  }

  // Set mute state and sync with localStorage and Howler
  function setMuteState(muted: boolean): void {
    setIsMuted(muted);
    Howler.mute(muted);
    try {
      localStorage.setItem(STORAGE_KEYS.MUTE_STATE, muted.toString());
    } catch (error) {
      console.error('Error setting mute state in localStorage:', error);
    }
  }

  return {
    isMuted,
    playSound,
    toggleMute,
    setMuteState,
  };
}
