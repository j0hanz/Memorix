export type SoundKey = 'button' | 'click' | 'complete' | 'correct' | 'wrong';

// Local storage keys
export const SOUND_STATE = {
  SOUND_STATE: 'memorixMuted',
};

export const SOUND_FILES: Record<SoundKey, string[]> = {
  button: ['/sounds/button.webm', '/sounds/button.mp3'],
  click: ['/sounds/click.webm', '/sounds/click.mp3'],
  complete: ['/sounds/complete.webm', '/sounds/complete.mp3'],
  correct: ['/sounds/correct.webm', '/sounds/correct.mp3'],
  wrong: ['/sounds/wrong.webm', '/sounds/wrong.mp3'],
};
