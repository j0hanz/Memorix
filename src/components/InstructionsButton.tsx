import Button from './Button';
import styles from '@/App.module.css';

interface InstructionsButtonProps {
  onClick: () => void;
}

export default function InstructionsButton({
  onClick,
}: InstructionsButtonProps) {
  return (
    <Button onClick={onClick} className={styles.btnGuide}>
      Guide
    </Button>
  );
}
