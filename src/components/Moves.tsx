import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import styles from './styles/Moves.module.css';

interface MovesProps {
  moves: number;
}

const Moves = ({ moves }: MovesProps) => {
  // Display number of moves
  return (
    <div className={styles.moves}>
      <FlipOutlinedIcon />
      {moves}
    </div>
  );
};

export default Moves;
