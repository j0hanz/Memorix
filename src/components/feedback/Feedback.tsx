import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import styles from '@/components/styles/GameStats.module.css';
import { FEEDBACK } from '@/constants/game';
import { useMotions } from '@/hooks/game/useMotions';
import type { FeedbackProps } from '@/types/components';
import { getIcon } from '@/utils/ui/iconUtils';

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
        {message === FEEDBACK.SUCCESS
          ? getIcon('CHECK', { fontSize: 'large', className: styles.success })
          : getIcon('CLOSE', { fontSize: 'large', className: styles.error })}
      </motion.div>
    </AnimatePresence>
  );
};
