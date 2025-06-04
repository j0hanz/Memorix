import type { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { CategoryIcon } from '@/components/game/CategoryIcon';
import { StarRating } from '@/components/ui/StarRating';
import type { ScoreRowProps } from '@/types/components';
import { MODAL_ICONS } from '@/utils/ui/iconUtils';

import styles from '../styles/Modal.module.css';

export const ScoreRow: FC<ScoreRowProps> = ({ score }) => (
  <Row className={styles.scoreRow}>
    <Col xs={1} className="d-flex justify-content-start align-items-center">
      <CategoryIcon categoryName={score.category_name} />
    </Col>
    <Col xs={2} className="d-flex justify-content-center align-items-center">
      <StarRating count={score.stars} />
    </Col>
    <Col xs={2} className="d-flex justify-content-start align-items-center">
      {score.moves} {MODAL_ICONS.moves()}
    </Col>
    <Col xs={1} className="d-flex justify-content-end align-items-center">
      {score.time_seconds} {MODAL_ICONS.timer()}
    </Col>
    <Col xs={2} className="d-flex justify-content-end align-items-center">
      {score.completed_at}
    </Col>
  </Row>
);
