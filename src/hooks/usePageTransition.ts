import { Variants } from 'framer-motion';

// Hook to get page transition animations
export function usePageTransition() {
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.5,
    },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 40,
    damping: 20,
  };

  return { pageVariants, pageTransition };
}
