import Switch from '@mui/material/Switch';

import { Tooltip } from '@/components/ui/Tooltip';
import { useToggle } from '@/hooks/ui/useToggle';
import type { SoundToggleProps } from '@/types/components';
import { getIcon } from '@/utils/ui/iconUtils';

export function SoundToggle({ isMuted, onToggle }: SoundToggleProps) {
  const { isChanging, handleToggle } = useToggle(onToggle);

  return (
    <Tooltip content={isMuted ? 'Unmute' : 'Mute'} placement="bottom">
      <div className={isChanging ? 'sound-toggle-active' : ''}>
        {isMuted
          ? getIcon('VOLUME_OFF', { titleAccess: 'Sound is muted' })
          : getIcon('VOLUME_UP', { titleAccess: 'Sound is on' })}
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
    </Tooltip>
  );
}
