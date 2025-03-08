import { HiOutlineArrowPathRoundedSquare } from 'react-icons/hi2';
import styles from './styles/Moves.module.css';

interface MovesProps {
  moves: number;
}

const Moves = ({ moves }: MovesProps) => {
  // Display number of moves
  return (
    <div className={styles.moves}>
      <HiOutlineArrowPathRoundedSquare />
      {moves}
    </div>
  );
};

export default Moves;
