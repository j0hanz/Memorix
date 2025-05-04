import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import type { ProfileGameHistoryProps } from '@/types/components';
import { CATEGORY_OPTIONS, getCategoryIcon } from '@/utils/categoryUtils';

import StarRating from '../StarRating';

const ITEMS_PER_PAGE = 5;

const ProfileGameHistory: React.FC<ProfileGameHistoryProps> = ({
  scores = [],
  loadingScores,
}) => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const scoresArray = Array.isArray(scores) ? scores : [];

  // Filter scores by selected category (if any)
  const filteredScores = selectedCategory
    ? scoresArray.filter((score) => score.category_name === selectedCategory)
    : scoresArray;

  const totalPages = Math.ceil(filteredScores.length / ITEMS_PER_PAGE);
  const paginatedScores = filteredScores.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };
  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  return (
    <>
      <Form.Group>
        <Form.Label className="d-none" htmlFor="category-select">
          Filter by Category
        </Form.Label>
        <Form.Select
          id="category-select"
          name="category"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className={styles.formSelect}
        >
          <option value="">All Categories</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {loadingScores ? (
        <div className="text-center p-4">Loading game history...</div>
      ) : filteredScores.length > 0 ? (
        <div className="my-3">
          {paginatedScores.map((score) => (
            <Row key={score.id} className={styles.scoreRow}>
              <Col
                xs={1}
                className="d-flex justify-content-start align-items-center"
              >
                {getCategoryIcon(score.category_name)}
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-center align-items-center"
              >
                <StarRating count={score.stars} />
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-end align-items-center"
              >
                {score.moves}
                <FlipOutlinedIcon fontSize="small" />
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-end align-items-center"
              >
                {score.time_seconds}
                <TimerOutlinedIcon fontSize="small" />
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-end align-items-center"
              >
                {score.completed_at}
              </Col>
            </Row>
          ))}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 gap-5">
              <Button
                className={styles.btnRounded}
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Previous Page"
                icon={<ArrowBackIosNewIcon fontSize="small" />}
                color="secondary"
              />
              {page} of {totalPages}
              <Button
                className={styles.btnRounded}
                onClick={handleNext}
                disabled={page === totalPages}
                aria-label="Next Page"
                icon={<ArrowForwardIosIcon fontSize="small" />}
                color="secondary"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-3 mt-3">
          No game history found. Start playing to see your scores here!
        </div>
      )}
    </>
  );
};

export default ProfileGameHistory;
