import type { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { StarRating } from '@/components/StarRating';
import type { ScoreRowProps } from '@/types/components';
import { MODAL_ICONS } from '@/utils/iconUtils';

import { CategoryIcon } from './CategoryIcon';
import styles from './styles/Modal.module.css';

export const ScoreRow: FC<ScoreRowProps> = ({ score }) => (
  <Row className={styles.scoreRow}>
    <Col xs={1} className="d-flex justify-content-start align-items-center">
      <CategoryIcon categoryName={score.category_name} />
    </Col>
    <Col xs={2} className="d-flex justify-content-center align-items-center">
      <StarRating count={score.stars} />
    </Col>
    <Col xs={2} className="d-flex justify-content-start align-items-center">
      {MODAL_ICONS.moves()} {score.moves}
    </Col>
    <Col xs={1} className="d-flex justify-content-start align-items-center">
      {MODAL_ICONS.timer()} {score.time_seconds}
    </Col>
    <Col xs={2} className="d-flex justify-content-end align-items-center">
      {score.completed_at}
    </Col>
  </Row>
);
