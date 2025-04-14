import type { Commit } from '@/types/api';
import styles from './styles/Modal.module.css';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useCommit } from '@/hooks/useCommitHistory';

// Component that displays the commit list
const CommitList = ({ commits }: { commits: Commit[] }) => {
  // Handle empty commit list
  if (!commits.length) {
    return <>No commit history available.</>;
  }

  return (
    <div className={styles.commitStatus}>
      <ul className={styles.commitList}>
        {commits.map((commit, index) => (
          <li key={commit.sha || index} className={styles.commitItem}>
            <div className={styles.commitDate}>
              <CalendarTodayOutlinedIcon
                fontSize="small"
                className={styles.commitIcon}
              />
              <span>{new Date(commit.date).toLocaleDateString()}</span>
            </div>

            <div className={styles.commitMessage}>
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.commitLink}
              >
                {commit.message}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main component
export default function CommitStatus() {
  const { commits, loading, error } = useCommit();

  if (loading) {
    return <>Loading commit data...</>;
  }

  if (error) {
    return <>Failed to load commit data.</>;
  }

  return <CommitList commits={commits} />;
}
