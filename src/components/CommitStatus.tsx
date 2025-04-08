import styles from './styles/Modal.module.css';
import { useCommitStatus } from '@/hooks/useCommitStatus';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

export default function CommitStatus() {
  const { commits, loading, error } = useCommitStatus();

  if (loading) {
    return <div>Loading commit data...</div>;
  }

  if (error) {
    return <div>Error loading commits: {error.message}</div>;
  }

  if (!commits.length) {
    return <div>No commit history available.</div>;
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
}
