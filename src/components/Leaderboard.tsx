import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import styles from './styles/Modal.module.css';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import type { LeaderboardProps } from '@/types/components';
import { CATEGORY_OPTIONS } from '@/utils/categoryUtils';

const renderStars = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <StarOutlinedIcon key={i} className={styles.scoreIconStar} />
  ));

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const { leaderboard, loading, error } = useLeaderboard(selectedCategory);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value ? parseInt(value, 10) : undefined);
  };

  return (
    <>
      <Form.Group>
        <Form.Label className="d-none">Filter by Category</Form.Label>
        <Form.Select
          onChange={handleCategoryChange}
          value={selectedCategory || ''}
          className={styles.formSelect}
        >
          <option value="">All Categories</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {loading ? (
        <div className="text-center p-4">Loading leaderboard...</div>
      ) : error ? (
        <div className="text-danger text-center p-3">{error}</div>
      ) : leaderboard.length > 0 ? (
        <div className="my-3">
          {leaderboard.slice(0, 5).map((entry, index) => (
            <Row key={entry.id} className={styles.scoreRow}>
              <Col
                xs={1}
                className="d-flex justify-content-start align-items-center gap-3"
              >
                <span className={styles.rank}>{index + 1}</span>
                <div className={styles.playerInfo}>
                  {entry.profile_picture_url && (
                    <img
                      src={entry.profile_picture_url}
                      alt={entry.username}
                      className={styles.leaderboardAvatar}
                    />
                  )}
                </div>
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-center align-items-center"
              >
                {renderStars(entry.stars)}
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-end align-items-center"
              >
                {entry.moves}
                <FlipOutlinedIcon fontSize="small" />
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-end align-items-center"
              >
                {entry.time_seconds}
                <TimerOutlinedIcon fontSize="small" />
              </Col>
            </Row>
          ))}
        </div>
      ) : (
        <div className="text-center p-3 mt-3">
          No leaderboard data available.
        </div>
      )}
    </>
  );
};

export default Leaderboard;
