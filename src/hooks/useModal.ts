import { useState } from 'react';

// Custom hook to manage modal state
export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return { isOpen, open, close, toggle };
}
