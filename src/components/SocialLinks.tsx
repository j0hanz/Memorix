import Button from './Button';
import { HiNewspaper } from 'react-icons/hi2';
import { LiaGithub } from 'react-icons/lia';
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
        onClick={onLatestUpdatesClick}
        className={styles.btnUpdates}
        icon={<HiNewspaper />}
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
