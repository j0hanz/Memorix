import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Col, Row } from 'react-bootstrap';

import { useLeaderboardData } from '@/hooks/useLeaderboardData';

import Button from './Button';
import Select from './Select';
import StarRating from './StarRating';
import styles from './styles/Modal.module.css';

const Leaderboard = () => {
  const {
    selectedCategory,
    leaderboard,
    loading,
    error,
    categoryOptions,
    handleCategoryChange,
  } = useLeaderboardData();

  return (
    <>
      <div className="mb-3">
        <Select
          id="category-select"
          name="category"
          value={selectedCategory?.toString() || ''}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="All Categories"
          label="Filter by Category"
          hideLabel={true}
          className={styles.formSelect}
        />
      </div>
      {loading ? (
        <div className="text-center p-4">Loading leaderboard...</div>
      ) : error ? (
        <div className="text-danger text-center p-3">{error}</div>
      ) : leaderboard.length > 0 ? (
        <div className="my-3">
          {leaderboard.slice(0, 5).map((entry, index) => (
            <Row
              key={entry.id}
              className={`d-flex justify-content-between align-items-center ${styles.scoreRow}`}
            >
              <Col
                xs={1}
                className="d-flex justify-content-start align-items-center gap-3"
              >
                <span className={styles.rank}>{index + 1}</span>
                {entry.profile_picture_url && (
                  <Button
                    img={entry.profile_picture_url}
                    imgAlt={entry.username}
                    imgClassName={styles.leaderboardAvatar}
                    aria-label={`View profile of ${entry.username}`}
                    variant="menu"
                    color="transparent"
                    tooltip={entry.username}
                  />
                )}
              </Col>
              <Col xs={2} className="d-flex align-items-center">
                <StarRating count={entry.stars} />
              </Col>
              <Col
                xs={2}
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
