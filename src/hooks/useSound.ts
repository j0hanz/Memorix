import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import correctSound from '@/assets/sounds/correct.mp3';
import wrongSound from '@/assets/sounds/wrong.mp3';
import clickSound from '@/assets/sounds/click.mp3';
import buttonSound from '@/assets/sounds/button.mp3';
import completeSound from '@/assets/sounds/complete.mp3';
import { SOUNDS, STORAGE_KEYS } from '@/utils/constants';

export function useSoundEffects() {
  // Use React state instead of module variables
  const [sounds, setSounds] = useState<Record<string, Howl>>({});
  const [isMuted, setIsMuted] = useState<boolean>(
    localStorage.getItem(STORAGE_KEYS.MUTE_STATE) === 'true' || false,
  );

  // Initialize sounds on mount
  useEffect(() => {
    const createSound = (src: string): Howl => new Howl({ src: [src] });

    // Create all sound instances
    const soundInstances: Record<string, Howl> = {
      [SOUNDS.CORRECT]: createSound(correctSound),
      [SOUNDS.WRONG]: createSound(wrongSound),
      [SOUNDS.CLICK]: createSound(clickSound),
      [SOUNDS.BUTTON]: createSound(buttonSound),
      [SOUNDS.COMPLETE]: createSound(completeSound),
    };

    setSounds(soundInstances);

    // Cleanup sounds when component unmounts
    return () => {
      Object.values(soundInstances).forEach((sound) => sound.unload());
    };
  }, []);

  // Play sound function
  const playSound = useCallback(
    (soundName: string): void => {
      if (isMuted) return;

      const sound = sounds[soundName];
      if (!sound) {
        console.warn(`No sound found for key: "${soundName}"`);
        return;
      }
      sound.play();
    },
    [sounds, isMuted],
  );

  // Toggle mute state
  const toggleMute = useCallback((): boolean => {
    setIsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem(STORAGE_KEYS.MUTE_STATE, newState.toString());
      return newState;
    });
    return !isMuted;
  }, [isMuted]);

  // Get current mute state
  const getMuteState = useCallback((): boolean => {
    return isMuted;
  }, [isMuted]);

  // Set specific mute state
  const setMuteState = useCallback((muted: boolean): void => {
    setIsMuted(muted);
    localStorage.setItem(STORAGE_KEYS.MUTE_STATE, muted.toString());
  }, []);

  return {
    playSound,
    toggleMute,
    getMuteState,
    setMuteState,
    isMuted,
  };
}
