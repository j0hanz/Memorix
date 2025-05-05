import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import appStyles from '@/App.module.css';
import Button from '@/components/Button';
import styles from '@/components/styles/Modal.module.css';
import { gameService } from '@/services/gameService';
import type { UserScore } from '@/types/api';
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
  const [bestScoreCategory, setBestScoreCategory] = useState<string>('');
  const [bestScores, setBestScores] = useState<UserScore[]>([]);
  const [loadingBestScores, setLoadingBestScores] = useState(false);
  const scoresArray = Array.isArray(scores) ? scores : [];

  // Fetch best scores
  useEffect(() => {
    const fetchBestScores = async () => {
      setLoadingBestScores(true);
      try {
        const data = await gameService.getUserBestScores();
        setBestScores(data);
        // Set default best score category to first available category
        if (data.length > 0 && !bestScoreCategory) {
          setBestScoreCategory(data[0].category_name);
        }
      } catch (error) {
        console.error('Error fetching best scores:', error);
      } finally {
        setLoadingBestScores(false);
      }
    };

    void fetchBestScores();
  }, [bestScoreCategory]);

  // Filter scores by selected category (if any)
  const filteredScores = selectedCategory
    ? scoresArray.filter((score) => score.category_name === selectedCategory)
    : scoresArray;

  // Get the best score for the selected category
  const selectedBestScore = bestScoreCategory
    ? bestScores.find((score) => score.category_name === bestScoreCategory)
    : undefined;

  const totalPages = Math.ceil(filteredScores.length / ITEMS_PER_PAGE);
  const paginatedScores = filteredScores
    .filter((score): score is UserScore => 'username' in score)
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

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

  const handleBestScoreCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setBestScoreCategory(e.target.value);
  };

  // Function to render a score row
  const renderScoreRow = (score: UserScore, isBestScore = false) => (
    <Row
      key={`${isBestScore ? 'best-' : ''}${String(score.id)}`}
      className={`d-flex justify-content-between align-items-center ${styles.scoreRow}`}
    >
      <Col xs={1} className="d-flex justify-content-start align-items-center">
        {getCategoryIcon(score.category_name)}
      </Col>
      <Col xs={2} className="d-flex justify-content-center align-items-center">
        <StarRating count={score.stars} />
      </Col>
      <Col xs={2} className="d-flex justify-content-start align-items-center">
        {score.moves}
        <FlipOutlinedIcon fontSize="small" />
      </Col>
      <Col xs={1} className="d-flex justify-content-end align-items-center">
        {score.time_seconds}
        <TimerOutlinedIcon fontSize="small" />
      </Col>
      <Col xs={1} className="d-flex justify-content-end align-items-center">
        {score.completed_at}
      </Col>
    </Row>
  );

  // Get unique categories from best scores
  const bestScoreCategories = bestScores
    .map((score) => score.category_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      {loadingBestScores ? (
        <div className="text-center mb-4">Loading best scores...</div>
      ) : (
        bestScores.length > 0 && (
          <Form.Group>
            <Form.Label htmlFor="best-score-category-select" className="m-2">
              <EmojiEventsIcon fontSize="small" className="me-2" />
              Best Scores
            </Form.Label>
            <Form.Select
              id="best-score-category-select"
              name="bestScoreCategory"
              onChange={handleBestScoreCategoryChange}
              value={bestScoreCategory}
              className={styles.formSelect}
              aria-label="Select category for best score"
            >
              {bestScoreCategories.map((category) => (
                <option key={category} value={category}>
                  {CATEGORY_OPTIONS.find((cat) => cat.value === category)
                    ?.label || category}
                </option>
              ))}
            </Form.Select>
            {selectedBestScore && renderScoreRow(selectedBestScore, true)}
          </Form.Group>
        )
      )}
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
        <div className="mb-3">
          {paginatedScores.map((score) => renderScoreRow(score))}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 gap-5">
              <Button
                className={appStyles.btnRounded}
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Previous Page"
                icon={<ArrowBackIosNewIcon fontSize="small" />}
                color="secondary"
              />
              {page} of {totalPages}
              <Button
                className={appStyles.btnRounded}
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
