import Button from './Button';
import styles from '@/App.module.css';

interface StartButtonProps {
  onClick: () => void;
}

export default function StartButton({ onClick }: StartButtonProps) {
  return (
    <Button onClick={onClick} className={styles.btnStart}>
      Start Game
    </Button>
  );
}
