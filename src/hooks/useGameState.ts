import { useContext } from 'react';
import { GameContext } from '@/contexts/GameContext';

export function useGameState() {
  // Retrieve game state from context
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }

  return context;
}
