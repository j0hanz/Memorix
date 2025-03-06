import { useState, useEffect } from 'react';
import Button from './Button';
import { HiNewspaper } from 'react-icons/hi2';
import { LiaGithub } from 'react-icons/lia';
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2';
import styles from '@/App.module.css';
import { getMuteState, toggleMuteState } from '@/utils/soundManager';

interface SocialLinksProps {
  onLatestUpdatesClick: () => void;
}

export default function SocialLinks({
  onLatestUpdatesClick,
}: SocialLinksProps) {
  // Initialize mute state from soundManager
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());

  // Handle mute button click
  const handleMuteToggle = () => {
    const newMuteState = toggleMuteState();
    setIsMuted(newMuteState);
  };

  // Get initial mute state on component mount
  useEffect(() => {
    setIsMuted(getMuteState());
  }, []);

  return (
    <div className={styles.smallButtonsDiv}>
      <Button
        onClick={onLatestUpdatesClick}
        className={styles.btnUpdates}
        icon={<HiNewspaper />}
      />
      <Button
        onClick={handleMuteToggle}
        className={styles.btnUpdates}
        icon={isMuted ? <HiOutlineSpeakerXMark /> : <HiOutlineSpeakerWave />}
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      />
      <Button
        onClick={() =>
          window.open('https://github.com/j0hanz/Memorix', '_blank')
        }
        className={styles.btnUpdates}
        icon={<LiaGithub />}
      />
    </div>
  );
}
