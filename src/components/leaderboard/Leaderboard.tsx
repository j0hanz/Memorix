import { Col, Row } from 'react-bootstrap';

import { Button } from '@/components/buttons/Button';
import { Select } from '@/components/forms/Select';
import { CategoryIcon } from '@/components/game/CategoryIcon';
import styles from '@/components/modals/styles/Modal.module.css';
import { StarRating } from '@/components/ui/StarRating';
import { useLeaderboard } from '@/hooks/leaderboard/useLeaderboard';
import { MODAL_ICONS } from '@/utils/ui/iconUtils';

export function Leaderboard() {
  const {
    selectedCategory,
    leaderboard,
    loading,
    error,
    categoryOptions,
    handleCategoryChange,
  } = useLeaderboard();

  return (
    <>
      <div className="mb-3">
        <Select
          id="category-select"
          name="category"
          value={selectedCategory?.toString() || ''}
          onChange={handleCategoryChange}
          options={categoryOptions}
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
        <>
          {leaderboard.slice(0, 5).map((entry) => (
            <Row key={entry.id} className={styles.scoreRow}>
              <Col
                xs={2}
                className="d-flex justify-content-start align-items-center gap-2"
              >
                <div className={styles.rank}>{entry.rank}</div>
                <CategoryIcon categoryName={entry.category_name} />
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
                {MODAL_ICONS.moves()}
              </Col>
              <Col
                xs={1}
                className="d-flex justify-content-end align-items-center"
              >
                {entry.time_seconds}
                {MODAL_ICONS.timer()}
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <div className="text-center p-3 mt-3">
          No leaderboard data available.
        </div>
      )}
    </>
  );
}
