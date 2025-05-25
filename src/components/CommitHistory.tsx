import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useCommit } from '@/hooks/useCommitHistory';
import { useNavigation } from '@/hooks/useProvider';
import type { CommitStatusProps } from '@/types/services';

import { ModalFooterButtons } from './ModalFooterButtons';
import styles from './styles/Modal.module.css';

export const CommitStatus = ({ onClose }: CommitStatusProps) => {
  const { commits, loading, error } = useCommit();
  const { handleGitHubClick } = useNavigation();

  return (
    <>
      <div className={styles.modalRow}>
        {loading && (
          <div className={styles.commitStatus}>Loading commit data...</div>
        )}
        {!loading && error && (
          <div className={styles.commitStatus} role="alert">
            {error instanceof Error ? error.message : String(error)}
          </div>
        )}
        {!loading && !error && commits.length > 0 && (
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
        )}
        {!loading && !error && commits.length === 0 && (
          <div className={styles.commitStatus}>
            No commit history available.
          </div>
        )}
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
