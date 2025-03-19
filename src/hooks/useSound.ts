import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import correctSound from '@/assets/sounds/correct.mp3';
import wrongSound from '@/assets/sounds/wrong.mp3';
import clickSound from '@/assets/sounds/click.mp3';
import buttonSound from '@/assets/sounds/button.mp3';
import completeSound from '@/assets/sounds/complete.mp3';
import { SOUNDS, STORAGE_KEYS } from '@/constants/constants';

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

  // State to manage sound effects
  const soundsRef = useRef<Record<string, Howl>>({});
  // State to manage mute status
  const [isMuted, setIsMuted] = useState<boolean>(initialMuteState);

  // Initialize sounds on mount
  useEffect(() => {
    soundsRef.current = {
      [SOUNDS.CORRECT]: new Howl({ src: [correctSound] }),
      [SOUNDS.WRONG]: new Howl({ src: [wrongSound] }),
      [SOUNDS.CLICK]: new Howl({ src: [clickSound] }),
      [SOUNDS.BUTTON]: new Howl({ src: [buttonSound] }),
      [SOUNDS.COMPLETE]: new Howl({ src: [completeSound] }),
    };

    // Cleanup sounds when component unmounts
    return () => {
      Object.values(soundsRef.current).forEach((sound) => {
        try {
          sound.unload();
        } catch (error) {
          console.error('Error unloading sound:', error);
        }
      });
    };
  }, []);

  function playSound(soundName: string): void {
    // Check if sounds are muted
    const currentMuteState =
      localStorage.getItem(STORAGE_KEYS.MUTE_STATE) === 'true';
    if (currentMuteState) return;

    const sound = soundsRef.current[soundName];
    // Check if sound exists
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
  function toggleMute(): void {
    const newMuteState = !isMuted;
    // Play a sound when unmuting
    setIsMuted(newMuteState);
    try {
      localStorage.setItem(STORAGE_KEYS.MUTE_STATE, newMuteState.toString());
    } catch (error) {
      console.error('Error updating mute state in localStorage:', error);
    }
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
