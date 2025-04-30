import PetsIcon from '@mui/icons-material/Pets';
import PublicIcon from '@mui/icons-material/Public';
import PatternIcon from '@mui/icons-material/Wallpaper';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import type { ReactElement } from 'react';
import React from 'react';

export const CATEGORY_ICONS: Record<string, () => ReactElement> = {
  Animals: () => React.createElement(PetsIcon, { fontSize: 'small' }),
  Astronomy: () => React.createElement(PublicIcon, { fontSize: 'small' }),
  Patterns: () => React.createElement(PatternIcon, { fontSize: 'small' }),
  Sushi: () => React.createElement(RestaurantIcon, { fontSize: 'small' }),
};

export const CATEGORY_OPTIONS = [
  { label: 'Animals', value: 'Animals', id: 1 },
  { label: 'Astronomy', value: 'Astronomy', id: 2 },
  { label: 'Patterns', value: 'Patterns', id: 3 },
  { label: 'Sushi', value: 'Sushi', id: 4 },
];

// Get icon by category name
export function getCategoryIcon(categoryName: string) {
  const Icon = CATEGORY_ICONS[categoryName];
  return Icon ? Icon() : React.createElement('span', null, categoryName);
}
