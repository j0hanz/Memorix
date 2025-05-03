import { createContext } from 'react';

import type { GameContextType } from '@/types/context';

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
