import React from 'react';
import { Button } from 'react-bootstrap';
import { handleButtonClick } from '../utils/soundManager';
import styles from '../styles/global/App.module.css';

interface StartButtonProps {
  onClick: () => void;
}

export default function StartButton({ onClick }: StartButtonProps) {
  return (
    <Button
      onClick={handleButtonClick(onClick)}
      className={`${styles.btnStart} mb-4`}
    >
      Start Game
    </Button>
  );
}
