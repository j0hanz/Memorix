import { Col, ListGroup, Row } from 'react-bootstrap';

import { StarRating } from '@/components/ui/StarRating';
import { SCORING_THRESHOLDS } from '@/constants/scoring';
import type { ScoringCriteriaRowProps } from '@/types/components';
import { MODAL_ICONS } from '@/utils/iconUtils';

export function ScoringTab() {
  // Map the scoring thresholds to the scoring criteria rows
  const scoringCriteria: ScoringCriteriaRowProps[] = SCORING_THRESHOLDS.map(
    (row) => ({
      stars: row.stars,
      moves: row.moves === Infinity ? MODAL_ICONS.infinite() : row.moves,
      time:
        row.time === Infinity ? MODAL_ICONS.infinite() : `${String(row.time)}s`,
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
        <Row
          key={index}
          className="d-flex justify-content-between align-items-center m-1"
        >
          <Col
            xs={1}
            className="d-flex justify-content-start align-items-center"
          >
            {MODAL_ICONS.moves()}
            <small>{criteria.moves}</small>
          </Col>

          <Col
            xs={2}
            className="d-flex justify-content-center align-items-center"
          >
            <StarRating count={criteria.stars} />
          </Col>

          <Col xs={1} className="d-flex justify-content-end align-items-center">
            {MODAL_ICONS.timer()}
            <small>{criteria.time}</small>
          </Col>
          <hr />
        </Row>
      ))}
    </>
  );
}
