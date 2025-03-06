import { Howl } from 'howler';
import correctSound from '@/assets/sounds/correct.mp3';
import wrongSound from '@/assets/sounds/wrong.mp3';
import clickSound from '@/assets/sounds/click.mp3';
import buttonSound from '@/assets/sounds/button.mp3';
import completeSound from '@/assets/sounds/complete.mp3';

// Helper function to create a Howl instance
const createSound = (src: string): Howl => new Howl({ src: [src] });

// Predefine and preload your sounds
const sounds: Record<string, Howl> = {
  correct: createSound(correctSound),
  wrong: createSound(wrongSound),
  click: createSound(clickSound),
  button: createSound(buttonSound),
  complete: createSound(completeSound),
};

// Track mute state (initialize from localStorage if available)
let isMuted = localStorage.getItem('memorixMuted') === 'true' || false;

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

// Function to handle button clicks and play button sound
export const handleButtonClick =
  (callback?: (event: React.MouseEvent<HTMLButtonElement>) => void) =>
  (event: React.MouseEvent<HTMLButtonElement>): void => {
    playSound('button');
    callback?.(event);
  };

// Functions to manage mute state
export const getMuteState = (): boolean => isMuted;

export const setMuteState = (muted: boolean): void => {
  isMuted = muted;
  localStorage.setItem('memorixMuted', muted.toString());
};

export const toggleMuteState = (): boolean => {
  setMuteState(!isMuted);
  return isMuted;
};
