import { HiStar } from 'react-icons/hi';
import style from './styles/Score.module.css';

interface ScoreProps {
  moves: number;

  completedTime: string;
}

export default function Score({ moves, completedTime }: ScoreProps) {
  // Helper function to compute the star rating
  function getStars(m: number, t: number): number {
    if (m <= 6 && t <= 15) return 5;
    if (m <= 7 && t <= 30) return 4;
    if (m <= 8 && t <= 45) return 3;
    if (m <= 9 && t <= 60) return 2;
    return 1;
  }

  const stars = getStars(moves, parseInt(completedTime, 10));

  return (
    <>
      {[...Array(5)].map((_, index) => (
        <HiStar
          key={index}
          className={
            index < stars
              ? style.scoreIcon
              : `${style.scoreIcon} ${style.grayedOut}`
          }
        />
      ))}
    </>
  );
}
