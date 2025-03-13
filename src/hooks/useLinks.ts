import { useSoundEffects } from '@/hooks/useSound';
import { SOUNDS } from '@/constants/constants';

export function useLinks() {
  const { isMuted, toggleMute, playSound } = useSoundEffects();

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
