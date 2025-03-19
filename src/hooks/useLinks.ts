import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';

// This hook manages the links
export function useLinks() {
  const { isMuted, toggleMute, playSound } = useSoundEffects();

  // Function to toggle mute state
  const handleGitHubClick = () => {
    playSound(SOUNDS.BUTTON);
    window.open('https://github.com/j0hanz/Memorix', '_blank');
  };

  return {
    isMuted,
    toggleMute,
    handleGitHubClick,
  };
}
