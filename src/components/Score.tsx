import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import styles from './styles/GameStats.module.css';
import { useGameScore } from '@/hooks/useGameScore';

interface ScoreProps {
  moves: number;
  completedTime: string;
}

export default function Score({ moves, completedTime }: ScoreProps) {
  const { stars } = useGameScore(moves, parseInt(completedTime, 10));

  return (
    <>
      {[...Array(5)].map((_, index) => (
        <StarOutlinedIcon
          key={index}
          className={
            index < stars
              ? styles.scoreIcon
              : `${styles.scoreIcon} ${styles.grayedOut}`
          }
          aria-hidden={true}
        />
      ))}
      <span className="visually-hidden">{stars} stars out of 5</span>
    </>
  );
}
