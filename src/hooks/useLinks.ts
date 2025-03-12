import { useSoundEffects } from '@/hooks/useSound';

export function useLinks() {
  const { isMuted, toggleMute } = useSoundEffects();

  const handleGitHubClick = () => {
    window.open('https://github.com/j0hanz/Memorix', '_blank');
  };

  return {
    isMuted,
    toggleMute,
    handleGitHubClick,
  };
}
