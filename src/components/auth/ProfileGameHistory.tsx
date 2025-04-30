import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Button from '@/components/Button';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import PublicIcon from '@mui/icons-material/Public';
import PatternIcon from '@mui/icons-material/Wallpaper';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import styles from '@/components/styles/Modal.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { ProfileGameHistoryProps } from '@/types/components';

const ITEMS_PER_PAGE = 5;

const renderStars = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <StarOutlinedIcon key={i} className={styles.scoreIconStar} />
  ));

const getscoreIcon = (categoryName: string) => {
  const categoryMap: Record<string, React.ReactElement> = {
    Animals: <PetsIcon fontSize="small" />,
    Astronomy: <PublicIcon fontSize="small" />,
    Patterns: <PatternIcon fontSize="small" />,
    Sushi: <RestaurantIcon fontSize="small" />,
  };
  return categoryMap[categoryName] || <span>{categoryName}</span>;
};

const ProfileGameHistory: React.FC<ProfileGameHistoryProps> = ({
  scores,
  loadingScores,
}) => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Filter scores by selected category (if any)
  const filteredScores = selectedCategory
    ? scores.filter((score) => score.category_name === selectedCategory)
    : scores;

  const totalPages = Math.ceil(filteredScores.length / ITEMS_PER_PAGE);
  const paginatedScores = filteredScores.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  return (
    <>
      <Form.Group>
        <Form.Label className="d-none">Filter by Category</Form.Label>
        <Form.Select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className={styles.input}
        >
          <option value="">All Categories</option>
          <option value="Animals">Animals</option>
          <option value="Astronomy">Astronomy</option>
          <option value="Patterns">Patterns</option>
          <option value="Sushi">Sushi</option>
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
                {getscoreIcon(score.category_name)}
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-center align-items-center"
              >
                {renderStars(score.stars)}
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
            <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
              <Button
                className={styles.btnRounded}
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Previous Page"
                icon={<ArrowBackIosNewIcon fontSize="small" />}
              />

              <span>
                {page} of {totalPages}
              </span>
              <Button
                className={styles.btnRounded}
                onClick={handleNext}
                disabled={page === totalPages}
                aria-label="Next Page"
                icon={<ArrowForwardIosIcon fontSize="small" />}
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
