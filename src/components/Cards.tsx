import GameCard from './GameCard';
import { Row, Col, Container } from 'react-bootstrap';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { motion } from 'framer-motion';
import { useMotions } from '@/hooks/useMotions';
import { Timer, Moves } from './GameStats';
import Feedback from './Feedback';
import { FEEDBACK } from '@/constants/constants';
import styles from './styles/Cards.module.css';

interface CardData {
  img: string;
  name: string;
  status: string;
}

interface CardsProps {
  cards: CardData[];
  handleCardSelection: (index: number) => void;
  moves: number;
  onReset: () => void;
  onExit: () => void;
  timerActive: boolean;
  feedback: string;
  matchedPairs: number;
}

// Component to display the game cards
export default function Cards({
  cards,
  handleCardSelection,
  moves,
  onReset,
  onExit,
  timerActive,
  feedback,
}: CardsProps) {
  // Get the card entrance animation
  const { cardEntranceAnimation } = useMotions();

  // Function to get the class for the top
  const getStatsTopClass = () => {
    if (!feedback) return styles.statsTop;

    if (feedback === FEEDBACK.SUCCESS) {
      return `${styles.statsTop} ${styles.statsTopSuccess}`;
    } else if (feedback === FEEDBACK.ERROR) {
      return `${styles.statsTop} ${styles.statsTopError}`;
    }

    return styles.statsTop;
  };

  return (
    <Container>
      <Row className={styles.row}>
        <Col xs={12} className={getStatsTopClass()}>
          <div className={styles.statsLeft}>
            <Moves moves={moves} />
            <Timer timerActive={timerActive} />
          </div>
          <div className={styles.feedback}>
            <Feedback message={feedback} />
          </div>
          <div className={styles.statsRight}>
            <div className={styles.btnExitRestart} onClick={onReset}>
              <ReplayCircleFilledOutlinedIcon />
            </div>

            <div className={styles.btnExitRestart} onClick={onExit}>
              <ExitToAppOutlinedIcon />
            </div>
          </div>
        </Col>
        {cards.map((card, index) => (
          <Col
            xs={4}
            sm={4}
            md={3}
            lg={3}
            xl={3}
            key={index}
            className={styles.cardsMap}
          >
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={cardEntranceAnimation}
              custom={index}
            >
              <GameCard
                card={card}
                index={index}
                clickHandler={handleCardSelection}
              />
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
