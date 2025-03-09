import { ListGroup, Badge, Row, Col } from 'react-bootstrap';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
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
      <Row className="d-flex justify-content-between align-items-center">
        <Col className="d-flex justify-content-start align-items-center">
          {[...Array(5)].map((_, i) => (
            <StarOutlinedIcon
              key={i}
              className={`${styles.scoreIcon} ${
                i < stars ? styles.starIcon : styles.grayedOut
              }`}
            />
          ))}
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <FlipOutlinedIcon className={styles.scoreIcon} />
          {moves}
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Badge>
            <TimerOutlinedIcon className={styles.scoreIcon} />
            {time}
          </Badge>
        </Col>
      </Row>
      <hr />
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
      time: <AllInclusiveOutlinedIcon className={styles.scoreIcon} />,
    },
  ];

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item className="mb-2">
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
