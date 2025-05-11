import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CrueltyFreeOutlinedIcon from '@mui/icons-material/CrueltyFreeOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import type { ReactElement } from 'react';
import React from 'react';

export const CATEGORY_ICONS: Record<string, () => ReactElement> = {
  Animals: () =>
    React.createElement(CrueltyFreeOutlinedIcon, { fontSize: 'small' }),
  Nature: () => React.createElement(ParkOutlinedIcon, { fontSize: 'small' }),
  Vehicles: () =>
    React.createElement(DirectionsCarOutlinedIcon, { fontSize: 'small' }),
  Food: () =>
    React.createElement(RestaurantOutlinedIcon, { fontSize: 'small' }),
  Shapes: () =>
    React.createElement(CategoryOutlinedIcon, { fontSize: 'small' }),
  Numbers: () =>
    React.createElement(LooksOneOutlinedIcon, { fontSize: 'small' }),
};

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
