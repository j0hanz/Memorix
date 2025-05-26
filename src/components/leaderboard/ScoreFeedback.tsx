import type { ScoreFeedbackProps } from '@/types/components';

export const ScoreFeedback = ({
  isAuthenticated,
  scoreSaved,
  saveError,
}: ScoreFeedbackProps) => {
  if (isAuthenticated && scoreSaved) {
    return (
      <div className="text-success text-center mt-3">
        <small>Score saved successfully!</small>
      </div>
    );
  }
  if (saveError) {
    return (
      <div className="text-danger text-center mt-3">
        <small>{saveError}</small>
      </div>
    );
  }
  return null;
};
