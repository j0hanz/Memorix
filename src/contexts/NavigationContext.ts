import { createContext } from 'react';

import type { NavigationContextType } from '@/types/context';

export const NavigationContext = createContext<NavigationContextType | null>(
  null,
);
