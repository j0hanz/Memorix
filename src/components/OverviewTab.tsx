import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ListGroup } from 'react-bootstrap';

import styles from './styles/Modal.module.css';

export function OverviewTab() {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Welcome to Memorix memory game! Your goal is to match all pairs of
          cards. When the game starts, all cards will briefly reveal themselves
          for 3 seconds before flipping back over. Memorize their positions
          during this time. The game consists of 6 pairs of cards (12 cards in
          total).
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal={true}>
        <ListGroup.Item>
          <PlayArrowIcon fontSize="small" className={styles.errorArrowIcon} />
        </ListGroup.Item>
        <ListGroup.Item>
          The game rates your performance based on the number of moves and time
          taken to complete the game. Details are available in the Scoring tab.
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
