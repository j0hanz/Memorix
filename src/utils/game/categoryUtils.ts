import React from 'react';

import { CATEGORY_ICONS } from '@/utils/ui/iconUtils';

export const CATEGORY_OPTIONS = [
  { label: 'Animals', value: 'animals', id: 1 },
  { label: 'Nature', value: 'nature', id: 2 },
  { label: 'Vehicles', value: 'vehicles', id: 3 },
  { label: 'Food', value: 'food', id: 4 },
  { label: 'Shapes', value: 'shapes', id: 5 },
  { label: 'Numbers', value: 'numbers', id: 6 },
];

// Get icon by category name
export function getCategoryIcon(categoryName: string) {
  if (categoryName in CATEGORY_ICONS) {
    return CATEGORY_ICONS[categoryName]();
  }
  return React.createElement('span', null, categoryName);
}

// Centralized function for category options
export function getCategoryOptions() {
  return CATEGORY_OPTIONS.map((c) => ({
    value: c.value,
    label: c.label,
    id: c.id,
  }));
}
