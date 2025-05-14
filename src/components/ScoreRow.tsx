import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import type { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { StarRating } from '@/components/StarRating';
import type { ScoreRowProps } from '@/types/components';
import { getCategoryIcon } from '@/utils/categoryUtils';

import styles from './styles/Modal.module.css';

export const ScoreRow: FC<ScoreRowProps> = ({ score }) => (
  <div>
    <Row
      className={`d-flex justify-content-between align-items-center ${styles.scoreRow}`}
    >
      <Col xs={1} className="d-flex justify-content-start align-items-center">
        {getCategoryIcon(score.category_name)}
      </Col>
      <Col xs={2} className="d-flex justify-content-center align-items-center">
        <StarRating count={score.stars} />
      </Col>
      <Col xs={2} className="d-flex justify-content-start align-items-center">
        {score.moves} <FlipOutlinedIcon fontSize="small" />
      </Col>
      <Col xs={1} className="d-flex justify-content-end align-items-center">
        {score.time_seconds} <TimerOutlinedIcon fontSize="small" />
      </Col>
      <Col xs={2} className="d-flex justify-content-end align-items-center">
        {score.completed_at}
      </Col>
    </Row>
  </div>
);
