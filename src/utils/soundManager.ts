import { Howl } from 'howler';
import correctSound from '@/assets/sounds/correct.mp3';
import wrongSound from '@/assets/sounds/wrong.mp3';
import clickSound from '@/assets/sounds/click.mp3';
import buttonSound from '@/assets/sounds/button.mp3';
import completeSound from '@/assets/sounds/complete.mp3';
import { SOUNDS, STORAGE_KEYS } from '@/utils/constants';

// Helper function to create a Howl instance
const createSound = (src: string): Howl => new Howl({ src: [src] });

// Predefine and preload your sounds
const sounds: Record<string, Howl> = {
  [SOUNDS.CORRECT]: createSound(correctSound),
  [SOUNDS.WRONG]: createSound(wrongSound),
  [SOUNDS.CLICK]: createSound(clickSound),
  [SOUNDS.BUTTON]: createSound(buttonSound),
  [SOUNDS.COMPLETE]: createSound(completeSound),
};

// Track mute state (initialize from localStorage if available)
let isMuted = localStorage.getItem(STORAGE_KEYS.MUTE_STATE) === 'true' || false;

// Function to play a sound by key
export const playSound = (soundName: string): void => {
  if (isMuted) return;

  const sound = sounds[soundName];
  if (!sound) {
    console.warn(`No sound found for key: "${soundName}"`);
    return;
  }
  sound.play();
};

// Functions to manage mute state in localStorage
export const getMuteState = (): boolean => isMuted;
export const setMuteState = (muted: boolean): void => {
  isMuted = muted;
  localStorage.setItem(STORAGE_KEYS.MUTE_STATE, muted.toString());
};

export const toggleMuteState = (): boolean => {
  setMuteState(!isMuted);
  return isMuted;
};
