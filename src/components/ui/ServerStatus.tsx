import { useServerStatus } from '@/hooks/ui/useServerStatus';
import { getIcon } from '@/utils/ui/iconUtils';

import styles from './styles/ServerStatus.module.css';

export const ServerStatus = () => {
  const { isOnline, isLoading } = useServerStatus();

  if (isLoading) {
    return (
      <div className={`${styles.indicator} ${styles.loading}`}>
        {getIcon('CIRCLE', { className: styles.serverIcon })}
        Server: <span className={styles.statusText}>Checking...</span>
      </div>
    );
  }

  const statusText = isOnline ? 'Online' : 'Offline';
  const statusClass = isOnline ? styles.online : styles.offline;

  return (
    <div className={`${styles.indicator} ${statusClass}`}>
      {getIcon('CIRCLE', { className: styles.serverIcon })}
      Server: <span className={styles.statusText}>{statusText}</span>
    </div>
  );
};
