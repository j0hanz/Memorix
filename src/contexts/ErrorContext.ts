import { createContext } from 'react';

import type { ErrorContextType } from '@/types/context';

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);
