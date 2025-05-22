import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Col, ListGroup, Row } from 'react-bootstrap';

import { SCORING_THRESHOLDS } from '@/constants/scoring';
import type { ScoringCriteriaRowProps } from '@/types/components';

import { StarRating } from './StarRating';

function ScoreRow({ stars, moves, time }: ScoringCriteriaRowProps) {
  return (
    <Row className="d-flex justify-content-between align-items-center m-1">
      <Col xs={1} className="d-flex justify-content-start align-items-center">
        <FlipOutlinedIcon fontSize="small" />
        <small>{moves}</small>
      </Col>

      <Col xs={2} className="d-flex justify-content-center align-items-center">
        <StarRating count={stars} />
      </Col>
      <Col xs={1} className="d-flex justify-content-end align-items-center">
        <TimerOutlinedIcon fontSize="small" />
        <small>{time}</small>
      </Col>
      <hr />
    </Row>
  );
}

export function ScoringTab() {
  // Map the scoring thresholds to the scoring criteria rows
  const scoringCriteria: ScoringCriteriaRowProps[] = SCORING_THRESHOLDS.map(
    (row) => ({
      stars: row.stars,
      moves:
        row.moves === Infinity ? (
          <AllInclusiveOutlinedIcon fontSize="small" />
        ) : (
          row.moves
        ),
      time:
        row.time === Infinity ? (
          <AllInclusiveOutlinedIcon fontSize="small" />
        ) : (
          `${String(row.time)}s`
        ),
    }),
  );

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
