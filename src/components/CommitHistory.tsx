import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import type { Commit } from '@/types/api';
import { useCommit } from '@/hooks/useCommitHistory';
import { useLinks } from '@/hooks/useLinks';
import { ModalFooterButtons } from './ModalFooterButtons';
import styles from './styles/Modal.module.css';

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
export default function CommitStatus({ onClose }: { onClose?: () => void }) {
  const { commits, loading, error } = useCommit();
  const { handleGitHubClick } = useLinks();

  if (loading) {
    return <>Loading commit data...</>;
  }

  if (error) {
    return <>Failed to load commit data.</>;
  }

  return (
    <>
      <CommitList commits={commits} />
        <ModalFooterButtons
          leftText="Github"
          rightText="Close"
          rightIcon={<ExitToAppOutlinedIcon fontSize="small" />}
          leftIcon={<GitHubIcon fontSize="small" />}
          onLeftClick={handleGitHubClick}
          onRightClick={() => onClose?.()}
        />
    </>
  );
}
