import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Suspense } from 'react';

import { LoadingSpinner } from '@/components/Spinner';
import { useCommit } from '@/hooks/useCommitHistory';
import { useNavigation } from '@/hooks/useProvider';
import type { CommitStatusProps } from '@/types/services';

import { ModalFooterButtons } from './ModalFooterButtons';
import styles from './styles/Modal.module.css';

const CommitContent = () => {
  const { commits, loading, error } = useCommit();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={styles.commitStatus} role="alert">
        {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  if (commits.length > 0) {
    return (
      <ul className={styles.commitList}>
        {commits.map(({ sha, date, url, message }) => (
          <li key={sha} className={styles.commitItem}>
            <div className={styles.commitDate}>
              <CalendarTodayOutlinedIcon fontSize="small" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className={styles.commitMessage}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.commitLink}
              >
                {message}
              </a>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.commitStatus}>No commit history available.</div>
  );
};

export const CommitStatus = ({ onClose }: CommitStatusProps) => {
  const { handleGitHubClick } = useNavigation();

  return (
    <>
      <div className={styles.modalRow}>
        <Suspense fallback={<LoadingSpinner />}>
          <CommitContent />
        </Suspense>
      </div>
      <ModalFooterButtons
        leftText="GitHub"
        leftIcon={<GitHubIcon fontSize="small" />}
        onLeftClick={handleGitHubClick}
        rightText="Close"
        rightIcon={<CloseOutlinedIcon fontSize="small" />}
        onRightClick={onClose ?? (() => {})}
      />
    </>
  );
};
