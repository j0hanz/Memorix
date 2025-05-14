import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Switch from '@mui/material/Switch';

import { useToggle } from '@/hooks/useToggle';
import type { SoundToggleProps } from '@/types/components';

export function SoundToggle({ isMuted, onToggle }: SoundToggleProps) {
  const { isChanging, handleToggle } = useToggle(onToggle);

  return (
    <div className={isChanging ? 'sound-toggle-active' : ''}>
      {isMuted ? (
        <VolumeOffIcon titleAccess="Sound is muted" />
      ) : (
        <VolumeUpIcon titleAccess="Sound is on" />
      )}
      <Switch
        checked={!isMuted}
        onChange={handleToggle}
        aria-label="Toggle sound"
        color="secondary"
        slotProps={{
          input: {
            'aria-label': isMuted ? 'Unmute sounds' : 'Mute sounds',
          },
        }}
      />
    </div>
  );
}
