import { motion } from 'framer-motion';
import { Col, Container, Row } from 'react-bootstrap';

import { useCards } from '@/hooks/useCards';
import { useMotions } from '@/hooks/useMotions';
import type { CardsProps } from '@/types/components';

import GameCard from './GameCard';
import { StatsBar } from './StatsBar';
import styles from './styles/Cards.module.css';

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
  const { getStatsTopClass } = useCards();

  return (
    <Container>
      <Row className={styles.row}>
        <Col xs={12} className={getStatsTopClass(styles, feedback)}>
          <StatsBar
            moves={moves}
            timerActive={timerActive}
            feedback={feedback}
            onReset={onReset}
            onExit={onExit}
          />
        </Col>
        {cards.map((card, index) => (
          <Col xs={4} sm={4} md={3} lg={3} xl={3} key={index}>
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
