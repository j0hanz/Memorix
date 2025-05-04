import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';

import type { SoundToggleProps } from '@/types/components';

export const SoundToggle = ({ isMuted, onToggle }: SoundToggleProps) => {
  // Track state change for animation
  const [isChanging, setIsChanging] = useState(false);

  // Visual feedback when toggling
  const handleToggle = () => {
    setIsChanging(true);
    onToggle();
  };

  // Reset animation state
  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isChanging]);

  return (
    <div className={isChanging ? 'sound-toggle-active' : ''}>
      {isMuted ? (
        <VolumeOffOutlinedIcon titleAccess="Sound is muted" />
      ) : (
        <VolumeUpOutlinedIcon titleAccess="Sound is on" />
      )}
      <Switch
        checked={!isMuted}
        onChange={handleToggle}
        color="secondary"
        slotProps={{
          input: {
            'aria-label': isMuted ? 'Unmute sounds' : 'Mute sounds',
          },
        }}
      />
      <span className="visually-hidden">
        {isMuted ? 'Sound is muted' : 'Sound is on'}
      </span>
    </div>
  );
};
