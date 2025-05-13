import { useSound } from '@/hooks/useProvider';

// This hook manages external links with sound feedback
export function useLinks() {
  const { isMuted, toggleMute, playSound } = useSound();

  // Open GitHub repo with sound feedback
  const handleGitHubClick = () => {
    playSound('button');
    window.open('https://github.com/j0hanz/Memorix', '_blank');
  };

  return {
    isMuted,
    toggleMute,
    handleGitHubClick,
  };
}
