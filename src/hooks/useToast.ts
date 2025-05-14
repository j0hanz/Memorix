import { useEffect, useState } from 'react';

interface UseToastProps {
  show: boolean;
  duration?: number;
  onClose?: () => void;
}

export function useToast({ show, duration = 0, onClose }: UseToastProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, duration, onClose]);

  return { visible };
}
