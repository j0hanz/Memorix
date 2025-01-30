import { memo } from 'react';
import { HiOutlineArrowPathRoundedSquare } from 'react-icons/hi2';
import styles from './styles/Moves.module.css';

interface MovesProps {
  moves: number;
}

const Moves = memo(({ moves }: MovesProps) => {
  // Display number of moves
  return (
    <div className={styles.moves}>
      <HiOutlineArrowPathRoundedSquare className={styles.statsIcon} />
      {moves}
    </div>
  );
});

Moves.displayName = 'Moves';
export default Moves;
