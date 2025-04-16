import { Row, Col } from 'react-bootstrap';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import PublicIcon from '@mui/icons-material/Public';
import PatternIcon from '@mui/icons-material/Wallpaper';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import styles from './styles/Modal.module.css';
import type { ProfileGameHistoryProps } from '@/types/components';

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
}) => (
  <>
    {loadingScores ? (
      <div className="text-center p-4">Loading game history...</div>
    ) : scores.length > 0 ? (
      <div className="mt-3">
        {scores.map((score) => (
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
      </div>
    ) : (
      <div className="text-center p-3 mt-3">
        No game history found. Start playing to see your scores here!
      </div>
    )}
  </>
);

export default ProfileGameHistory;
