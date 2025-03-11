import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styles from './styles/GameStats.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotions } from '@/hooks/useMotions';
import { FEEDBACK } from '@/utils/constants';

interface FeedbackProps {
  message: string | null;
}

// Display feedback messages based on the message prop
const Feedback = ({ message }: FeedbackProps) => {
  // Get the feedback animation
  const { feedbackAnimation } = useMotions();
  if (!message) return null;

  return (
    <>
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
    </>
  );
};

export default Feedback;
