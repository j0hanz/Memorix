import { ListGroup, Badge, Row, Col } from 'react-bootstrap';
import {
  HiStar,
  HiOutlineClock,
  HiOutlineArrowPathRoundedSquare,
} from 'react-icons/hi2';
import { LiaInfinitySolid } from 'react-icons/lia';
import styles from '@/components/styles/Modal.module.css';

interface ScoreRowProps {
  stars: number;
  moves: number;
  time: string | React.ReactNode;
}

// Component for each scoring criteria row
function ScoreRow({ stars, moves, time }: ScoreRowProps) {
  return (
    <>
      <Row className="d-flex justify-content-between mx-1 align-items-center">
        <Col className="text-start">
          {[...Array(5)].map((_, i) => (
            <HiStar
              key={i}
              className={`${styles.scoreIcon} ${
                i < stars ? styles.starIcon : styles.grayedOut
              }`}
            />
          ))}
        </Col>
        <Col className="text-center">
          <HiOutlineArrowPathRoundedSquare
            className={`${styles.scoreListIcon} ${styles.statsIcon} me-1`}
          />
          {moves}
        </Col>
        <Col className="text-end">
          <Badge>
            <HiOutlineClock
              className={`${styles.scoreListIcon} ${styles.clockIcon} me-1`}
            />
            {time}
          </Badge>
        </Col>
      </Row>
      <hr className="my-2" />
    </>
  );
}

export default function ScoringTab() {
  // Scoring criteria data
  const scoringCriteria: ScoreRowProps[] = [
    { stars: 5, moves: 6, time: '15s' },
    { stars: 4, moves: 7, time: '30s' },
    { stars: 3, moves: 8, time: '45s' },
    { stars: 2, moves: 9, time: '60s' },
    {
      stars: 1,
      moves: 10,
      time: <LiaInfinitySolid className={styles.infinityIcon} />,
    },
  ];

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Stars are earned based on moves and time. Here&apos;s the breakdown.
        </ListGroup.Item>
      </ListGroup>
      {scoringCriteria.map((criteria, index) => (
        <ScoreRow
          key={index}
          stars={criteria.stars}
          moves={criteria.moves}
          time={criteria.time}
        />
      ))}
    </>
  );
}
