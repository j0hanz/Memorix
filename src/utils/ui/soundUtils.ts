import type { SoundKey } from '@/constants/sounds';
import { SOUND_STATE } from '@/constants/sounds';
import type { SoundMapType } from '@/types/utils';

// Function to get the initial mute state from localStorage
export function getInitialMuteState(): boolean {
  try {
    return localStorage.getItem(SOUND_STATE.SOUND_STATE) === 'true';
  } catch (error) {
    console.error('Error accessing localStorage for mute state:', error);
    return false;
  }
}

// Function to set the mute state in localStorage
export function saveMuteState(muted: boolean): void {
  try {
    localStorage.setItem(SOUND_STATE.SOUND_STATE, muted.toString());
  } catch (error) {
    console.error('Error setting mute state in localStorage:', error);
  }
}

// Function to play sound based on the key
export function playSoundEffect(
  soundMap: SoundMapType,
  soundKey: SoundKey,
  isMuted: boolean,
): void {
  if (isMuted) return;

  try {
    const playFn = soundMap[soundKey];
    if (playFn) {
      playFn();
    } else {
      console.warn(`No sound found for key: "${soundKey}"`);
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}
