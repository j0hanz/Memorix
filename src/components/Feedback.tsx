import { HiCheck, HiXMark } from 'react-icons/hi2';
import styles from './styles/Feedback.module.css';
import { FEEDBACK } from '@/utils/constants';

interface FeedbackProps {
  message: string | null;
}

// Display feedback messages based on the message prop
const Feedback = ({ message }: FeedbackProps) => {
  if (!message) return null;

  return (
    <div className={styles.feedback}>
      {message === FEEDBACK.SUCCESS ? (
        <HiCheck className={styles.success} />
      ) : (
        <HiXMark className={styles.error} />
      )}
    </div>
  );
};

export default Feedback;
