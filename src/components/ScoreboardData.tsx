import { useState } from 'react';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { ModalFooterButtons } from './ModalFooterButtons';
import { useAuth } from '@/hooks/useAuth';
import { useScore } from '@/hooks/useScore';
import { useSaveScore } from '@/hooks/useSaveScore';
import Scoreboard from '@/components/scoreData';
import type { ScoreboardDataProps } from '@/types/components';

export default function ScoreboardData({
  onReset,
  onExit,
  moves,
  completedTime,
  categoryCode,
  children,
}: ScoreboardDataProps) {
  const { isAuthenticated } = useAuth();
  const { stars } = useScore(moves, completedTime);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useSaveScore({
    show: true,
    isAuthenticated,
    scoreSaved,
    setScoreSaved,
    setSaveError,
    categoryCode,
    moves,
    completedTime,
    stars,
  });

  return (
    <>
      <div className="p-3">
        {children}
        <Scoreboard moves={moves} completedTime={completedTime.toString()} />
        {isAuthenticated && scoreSaved && (
          <div className="text-success text-center mt-3">
            <small>Score saved successfully!</small>
          </div>
        )}
        {saveError && (
          <div className="text-danger text-center mt-3">
            <small>{saveError}</small>
          </div>
        )}
      </div>
      <ModalFooterButtons
        leftText="Restart"
        rightText="Exit"
        onLeftClick={onReset}
        onRightClick={onExit}
        leftIcon={<ReplayCircleFilledOutlinedIcon fontSize="small" />}
        rightIcon={<ExitToAppOutlinedIcon fontSize="small" />}
      />
    </>
  );
}
