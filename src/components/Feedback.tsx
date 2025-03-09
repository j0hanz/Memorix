import { HiCheck, HiXMark } from 'react-icons/hi2';
import styles from './styles/Feedback.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '@/hooks/usePageTransition';
import { FEEDBACK } from '@/utils/constants';

interface FeedbackProps {
  message: string | null;
}

// Display feedback messages based on the message prop
const Feedback = ({ message }: FeedbackProps) => {
  // Get animation settings for page transitions
  const { feedbackVariants } = usePageTransition();
  if (!message) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={feedbackVariants}
        >
          {message === FEEDBACK.SUCCESS ? (
            <HiCheck className={styles.success} />
          ) : (
            <HiXMark className={styles.error} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Feedback;
