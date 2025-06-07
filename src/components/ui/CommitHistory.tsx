import { Suspense } from 'react';

import { ModalFooterButtons } from '@/components/modals/ModalFooterButtons';
import styles from '@/components/modals/styles/Modal.module.css';
import { LoadingSpinner } from '@/components/ui/Spinner';
import { useCommit } from '@/hooks/api/useCommitHistory';
import { useNavigation } from '@/hooks/shared/useProvider';
import type { CommitStatusProps } from '@/types/services';
import { MENU_ICONS, NAVIGATION_ICONS } from '@/utils/ui/iconUtils';

const CommitContent = () => {
  const { commits, loading, error } = useCommit();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={styles.commitStatus} role="alert">
        {String(error)}
      </div>
    );
  }

  if (commits.length > 0) {
    return (
      <ul className={styles.commitList}>
        {commits.map(({ sha, date, url, message }) => (
          <li key={sha} className={styles.commitItem}>
            <div className={styles.commitDate}>
              {MENU_ICONS.calendar()}
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
        leftIcon={MENU_ICONS.github()}
        onLeftClick={handleGitHubClick}
        rightText="Close"
        rightIcon={NAVIGATION_ICONS.close()}
        onRightClick={onClose ?? (() => {})}
      />
    </>
  );
};
