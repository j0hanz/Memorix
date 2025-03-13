import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';

export function useLinks() {
  const { isMuted, toggleMute, playSound } = useSoundEffects();

  const handleGitHubClick = () => {
    playSound(SOUNDS.BUTTON);
    window.open('https://github.com/j0hanz/Memorix', '_blank');
  };

  const handleToggleMute = () => {
    // Play a sound when unmuting
    if (isMuted) {
      const sound = new Audio();
      sound.src = '/src/assets/sounds/button.mp3';
      sound.volume = 0.5;
      sound
        .play()
        .catch((err) => console.error('Error playing unmute sound:', err));
      setTimeout(() => toggleMute(), 50);
    } else {
      // Just toggle mute if already muted
      toggleMute();
    }
  };

  return {
    isMuted,
    toggleMute: handleToggleMute,
    handleGitHubClick,
  };
}
