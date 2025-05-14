import { useEffect, useState } from 'react';

export function useToggle(onToggle: () => void) {
  const [isChanging, setIsChanging] = useState(false);

  const handleToggle = () => {
    setIsChanging(true);
    onToggle();
  };

  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isChanging]);

  return { isChanging, handleToggle };
}
