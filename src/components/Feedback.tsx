import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { AnimatePresence, motion } from 'framer-motion';

import { FEEDBACK } from '@/constants/game';
import { useMotions } from '@/hooks/useMotions';
import type { FeedbackProps } from '@/types/components';

import styles from './styles/GameStats.module.css';

// Display feedback messages based on the message prop
export const Feedback = ({ message }: FeedbackProps) => {
  // Get the feedback animation
  const { feedbackAnimation } = useMotions();
  if (!message) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={feedbackAnimation}
      >
        {message === FEEDBACK.SUCCESS ? (
          <CheckOutlinedIcon fontSize="large" className={styles.success} />
        ) : (
          <CloseOutlinedIcon fontSize="large" className={styles.error} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
