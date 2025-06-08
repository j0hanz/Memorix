import { AUTH_ICONS } from '@/utils/ui/iconUtils';

export function ProfileClearScores() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center my-4">
      {AUTH_ICONS.warning({ className: 'text-warning' })}
      <h4 className="text-warning mb-4 mt-1">Clear All Scores</h4>
      <p>All your game scores and history will be permanently deleted.</p>
      <span className="d-block mb-3">Are you sure you want to continue?</span>
    </div>
  );
}
