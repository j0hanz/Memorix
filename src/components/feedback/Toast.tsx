import { AnimatePresence, motion } from 'framer-motion';

import { DELAYS } from '@/constants/game';
import { useMotions } from '@/hooks/game/useMotions';
import { useToastVisibility } from '@/hooks/ui/useToast';
import type { ToastProps } from '@/types/components';

import styles from './styles/Toast.module.css';

export function Toast({
  message,
  show,
  duration = DELAYS.TOAST_DURATION,
  placement = 'top',
  className = '',
  onClose,
}: ToastProps) {
  const { visible } = useToastVisibility({
    show,
    duration,
    onClose,
  });

  const { toastAnimation } = useMotions();

  // Determine animation states based on placement
  const getAnimationStates = () => {
    if (placement === 'bottom') {
      return {
        initial: 'initialBottom',
        animate: 'animateBottom',
        exit: 'exitBottom',
      };
    }
    return {
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
    };
  };

  const animationStates = getAnimationStates();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${styles.toast} ${styles[placement]} ${className}`}
          role="status"
          aria-live="polite"
          initial={animationStates.initial}
          animate={animationStates.animate}
          exit={animationStates.exit}
          variants={toastAnimation}
          layout={true}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
