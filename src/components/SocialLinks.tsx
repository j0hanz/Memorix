import { Button } from 'react-bootstrap';
import { HiNewspaper } from 'react-icons/hi2';
import { LiaGithub } from 'react-icons/lia';
import { handleButtonClick } from '@/utils/soundManager';
import styles from '@/App.module.css';

interface SocialLinksProps {
  onLatestUpdatesClick: () => void;
}

export default function SocialLinks({
  onLatestUpdatesClick,
}: SocialLinksProps) {
  return (
    <div className={`${styles.smallButtonsDiv} my-4`}>
      <Button
        onClick={handleButtonClick(onLatestUpdatesClick)}
        className={styles.btnUpdates}
      >
        <HiNewspaper />
      </Button>
      <Button
        onClick={() =>
          window.open('https://github.com/j0hanz/Memorix', '_blank')
        }
        className={styles.btnUpdates}
      >
        <LiaGithub />
      </Button>
    </div>
  );
}
