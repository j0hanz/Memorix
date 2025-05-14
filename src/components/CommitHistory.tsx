import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useCommit } from '@/hooks/useCommitHistory';
import { useLinks } from '@/hooks/useLinks';
import type { Commit } from '@/types/api';

import { ModalFooterButtons } from './ModalFooterButtons';
import styles from './styles/Modal.module.css';

// Commit list
function CommitList({ commits }: { commits: Commit[] }) {
  if (!commits.length) {
    return (
      <div className={styles.commitStatus}>No commit history available.</div>
    );
  }

  return (
    <div className={styles.commitStatus}>
      <ul className={styles.commitList}>
        {commits.map((commit) => (
          <CommitListItem key={commit.sha} commit={commit} />
        ))}
      </ul>
    </div>
  );
}

// Commit list item
function CommitListItem({ commit }: { commit: Commit }) {
  return (
    <li className={styles.commitItem}>
      <div className={styles.commitDate}>
        <CalendarTodayOutlinedIcon fontSize="small" />
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
  );
}

// Main component
export function CommitStatus({ onClose }: { onClose?: () => void }) {
  const { commits, loading, error } = useCommit();
  const { handleGitHubClick } = useLinks();

  if (loading) {
    return <div className={styles.commitStatus}>Loading commit data...</div>;
  }

  if (error) {
    return (
      <div className={styles.commitStatus} role="alert">
        {typeof error === 'string' ? error : error.message}
      </div>
    );
  }

  return (
    <>
      <div className={styles.latestUpdatesModal}>
        <CommitList commits={commits} />
      </div>
      <ModalFooterButtons
        leftText="Github"
        rightText="Close"
        rightIcon={<CloseOutlinedIcon fontSize="small" />}
        leftIcon={<GitHubIcon fontSize="small" />}
        onLeftClick={handleGitHubClick}
        onRightClick={() => onClose?.()}
      />
    </>
  );
}

export default CommitStatus;
