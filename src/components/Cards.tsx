import React from 'react';
import Card from './Card';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { HiArrowPath } from 'react-icons/hi2';
import { TbDoorExit } from 'react-icons/tb';
import Timer from './Timer';
import Moves from './Moves';
import Feedback from './Feedback';
import styles from './styles/Cards.module.css';
import { handleButtonClick } from '@/utils/soundManager';

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
}

const Cards: React.FC<CardsProps> = ({
  cards,
  handleCardSelection,
  moves,
  onReset,
  onExit,
  timerActive,
  feedback,
}) => {
  const isInitialFlip = false;

  return (
    <Container>
      <Row className={styles.row}>
        <Col xs={12} className={styles.statsTop}>
          <Button
            className={styles.btnExitRestart}
            onClick={handleButtonClick(onReset)}
          >
            <HiArrowPath className={styles.exitRestartIcon} />
          </Button>
          <Timer timerActive={timerActive} />
          <Moves moves={moves} />
          <Button
            className={styles.btnExitRestart}
            onClick={handleButtonClick(onExit)}
          >
            <TbDoorExit className={styles.exitRestartIcon} />
          </Button>
        </Col>
        {cards.map((card, index) => (
          <Col xs={4} sm={4} md={3} lg={3} xl={3} key={index}>
            <Card
              card={card}
              index={index}
              clickHandler={isInitialFlip ? undefined : handleCardSelection}
            />
          </Col>
        ))}
        <Col xs={12} className={styles.statsBottom}>
          <Feedback message={feedback} />
        </Col>
      </Row>
    </Container>
  );
};

export default Cards;
