import type { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Button } from '@/components/buttons/Button';
import styles from '@/components/leaderboard/styles/Pagination.module.css';
import type { PaginationProps } from '@/types/components';
import { NAVIGATION_ICONS } from '@/utils/ui/iconUtils';

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => (
  <Row className={styles.paginationRow}>
    <Col xs={1} className={styles.arrowStart}>
      <Button
        onClick={onPrev}
        disabled={page === 1}
        icon={NAVIGATION_ICONS.previous()}
        aria-label="Previous Page"
        tooltip={page === 1 ? 'First' : 'Previous'}
      />
    </Col>
    <Col xs={3} className={styles.pageInfo}>
      {page} of {totalPages}
    </Col>
    <Col xs={1} className={styles.arrowEnd}>
      <Button
        onClick={onNext}
        disabled={page === totalPages}
        icon={NAVIGATION_ICONS.next()}
        aria-label="Next Page"
        tooltip={page === totalPages ? 'Last' : 'Next'}
      />
    </Col>
  </Row>
);
