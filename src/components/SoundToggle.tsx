import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import Switch from '@mui/material/Switch';

import type { SoundToggleProps } from '@/types/components';

export const SoundToggle = ({ isMuted, onToggle }: SoundToggleProps) => (
  <div>
    {isMuted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
    <Switch
      checked={!isMuted}
      onChange={onToggle}
      color="secondary"
      slotProps={{
        input: {
          'aria-label': isMuted ? 'Unmute sounds' : 'Mute sounds',
        },
      }}
    />
  </div>
);
