import PetsIcon from '@mui/icons-material/Pets';
import PublicIcon from '@mui/icons-material/Public';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PatternIcon from '@mui/icons-material/Wallpaper';
import type { ReactElement } from 'react';
import React from 'react';

export const CATEGORY_ICONS: Record<string, () => ReactElement> = {
  Animals: () => React.createElement(PetsIcon, { fontSize: 'small' }),
  Astronomy: () => React.createElement(PublicIcon, { fontSize: 'small' }),
  Patterns: () => React.createElement(PatternIcon, { fontSize: 'small' }),
  Food: () => React.createElement(RestaurantIcon, { fontSize: 'small' }),
};

export const CATEGORY_OPTIONS = [
  { label: 'Animals', value: 'Animals', id: 1 },
  { label: 'Astronomy', value: 'Astronomy', id: 2 },
  { label: 'Patterns', value: 'Patterns', id: 3 },
  { label: 'Food', value: 'Food', id: 4 },
];

// Get icon by category name
export function getCategoryIcon(categoryName: string) {
  if (categoryName in CATEGORY_ICONS) {
    return CATEGORY_ICONS[categoryName]();
  }
  return React.createElement('span', null, categoryName);
}
