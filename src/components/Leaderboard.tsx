import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { Tooltip } from './Tooltip';
import type { LeaderboardProps } from '@/types/components';
import { CATEGORY_OPTIONS } from '@/utils/categoryUtils';
import StarRating from './StarRating';
import styles from './styles/Modal.module.css';

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
                    <Tooltip content={entry.username}>
                      <img
                        src={entry.profile_picture_url}
                        alt={entry.username}
                        className={styles.leaderboardAvatar}
                      />
                    </Tooltip>
                  )}
                </div>
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-center align-items-center"
              >
                <StarRating count={entry.stars} />
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
