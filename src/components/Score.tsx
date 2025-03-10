import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import styles from './styles/GameStats.module.css';
import { SCORING } from '@/utils/constants';

interface ScoreProps {
  moves: number;
  completedTime: string;
}

export default function Score({ moves, completedTime }: ScoreProps) {
  // Helper function to compute the star rating using constants
  function getStars(moves: number, time: number): number {
    if (moves <= SCORING.FIVE_STAR.moves && time <= SCORING.FIVE_STAR.time)
      return 5;
    if (moves <= SCORING.FOUR_STAR.moves && time <= SCORING.FOUR_STAR.time)
      return 4;
    if (moves <= SCORING.THREE_STAR.moves && time <= SCORING.THREE_STAR.time)
      return 3;
    if (moves <= SCORING.TWO_STAR.moves && time <= SCORING.TWO_STAR.time)
      return 2;
    return 1;
  }

  const stars = getStars(moves, parseInt(completedTime, 10));

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
