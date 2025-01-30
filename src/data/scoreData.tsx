import React from "react";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineClock,
} from "react-icons/hi2";
import styles from "../components/styles/Modal.module.css";
import Score from "../components/Score";

// Define the props type
interface ScoreboardProps {
  score: number;
  moves: number;
  completedTime: string;
}

// Displays the game statistics
export default function Scoreboard({
  score,
  moves,
  completedTime,
}: ScoreboardProps) {
  return (
    <div className={styles.scoreboard}>
      <div className={styles.scoreItem}>
        <HiOutlineArrowPathRoundedSquare
          className={`me-1 ${styles.statsIcon}`}
        />
        {moves}
      </div>
      <div className={styles.scoreItem}>
        <Score moves={moves} completedTime={completedTime} />
      </div>
      <div className={styles.scoreItem}>
        <HiOutlineClock className={`me-2 ${styles.clockIcon}`} />
        {completedTime}
      </div>
    </div>
  );
}
