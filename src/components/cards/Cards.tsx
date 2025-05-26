import { motion } from 'framer-motion';
import { Col, Container, Row } from 'react-bootstrap';

import { GameCard } from '@/components/cards/GameCard';
import { StatsBar } from '@/components/ui/StatsBar';
import { useMotions } from '@/hooks/useMotions';
import { useGameState } from '@/hooks/useProvider';
import type { CardsProps } from '@/types/components';

import styles from '../styles/Cards.module.css';

// Component to display the game cards
export function Cards({
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
  const { getStatsTopClass } = useGameState();

  const statsTopClassName: string = getStatsTopClass(styles, feedback);

  return (
    <Container>
      <Row className={styles.row}>
        <Col xs={12} className={statsTopClassName}>
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
