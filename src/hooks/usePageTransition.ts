import { Variants } from 'framer-motion';

// Hook to get page transition animations
export function usePageTransition() {
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.7,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.7,
    },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 50,
    damping: 20,
  };

  return { pageVariants, pageTransition };
}
