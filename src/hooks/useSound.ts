import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import correctSound from '@/assets/sounds/correct.mp3';
import wrongSound from '@/assets/sounds/wrong.mp3';
import clickSound from '@/assets/sounds/click.mp3';
import buttonSound from '@/assets/sounds/button.mp3';
import completeSound from '@/assets/sounds/complete.mp3';
import { SOUNDS, STORAGE_KEYS } from '@/utils/constants';

export function useSoundEffects() {
  // Safely read initial mute state from localStorage
  const initialMuteState = (() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MUTE_STATE) === 'true';
    } catch (error) {
      console.error('Error accessing localStorage for mute state:', error);
      return false;
    }
  })();

  const [sounds, setSounds] = useState<Record<string, Howl>>({});
  const [isMuted, setIsMuted] = useState<boolean>(initialMuteState);

  // Initialize sounds on mount
  useEffect(() => {
    const createSound = (src: string): Howl => new Howl({ src: [src] });
    let soundInstances: Record<string, Howl> = {};

    try {
      soundInstances = {
        [SOUNDS.CORRECT]: createSound(correctSound),
        [SOUNDS.WRONG]: createSound(wrongSound),
        [SOUNDS.CLICK]: createSound(clickSound),
        [SOUNDS.BUTTON]: createSound(buttonSound),
        [SOUNDS.COMPLETE]: createSound(completeSound),
      };
      setSounds(soundInstances);
    } catch (error) {
      console.error('Error initializing sound effects:', error);
    }

    // Cleanup sounds when component unmounts
    return () => {
      Object.values(soundInstances).forEach((sound) => {
        try {
          sound.unload();
        } catch (error) {
          console.error('Error unloading sound:', error);
        }
      });
    };
  }, []);

  // Play sound function
  function playSound(soundName: string): void {
    if (isMuted) return;

    const sound = sounds[soundName];
    if (!sound) {
      console.warn(`No sound found for key: "${soundName}"`);
      return;
    }
    try {
      sound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Toggle mute state
  function toggleMute(): boolean {
    setIsMuted((prev) => {
      const newState = !prev;
      try {
        localStorage.setItem(STORAGE_KEYS.MUTE_STATE, newState.toString());
      } catch (error) {
        console.error('Error updating mute state in localStorage:', error);
      }
      return newState;
    });
    return !isMuted;
  }

  // Get current mute state
  function getMuteState(): boolean {
    return isMuted;
  }

  // Set specific mute state
  function setMuteState(muted: boolean): void {
    setIsMuted(muted);
    try {
      localStorage.setItem(STORAGE_KEYS.MUTE_STATE, muted.toString());
    } catch (error) {
      console.error('Error setting mute state in localStorage:', error);
    }
  }

  return {
    playSound,
    toggleMute,
    getMuteState,
    setMuteState,
    isMuted,
  };
}
