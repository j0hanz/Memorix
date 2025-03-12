import { FEEDBACK } from '@/constants/constants';
import { CSSModuleClasses } from '@/types/hooks';

export function useCardLayout(feedback: string) {
  // Function to get the class for the top
  const getStatsTopClass = (styles: CSSModuleClasses) => {
    if (!feedback) return styles.statsTop;

    if (feedback === FEEDBACK.SUCCESS) {
      return `${styles.statsTop} ${styles.statsTopSuccess}`;
    } else if (feedback === FEEDBACK.ERROR) {
      return `${styles.statsTop} ${styles.statsTopError}`;
    }

    return styles.statsTop;
  };

  return {
    getStatsTopClass,
  };
}
