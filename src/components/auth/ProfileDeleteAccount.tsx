import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { useProfile } from '@/hooks/useProvider';

export function ProfileDeleteAccount() {
  const { error, success } = useProfile();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center my-4">
      <WarningAmberIcon color="error" fontSize="large" />
      <h4 className="text-danger mb-4 mt-1">Delete Account</h4>
      <p>All your data and scores will be permanently deleted.</p>
      <span className="d-block mb-3">Are you sure you want to continue?</span>
      {error && <div className="text-danger mb-3">{error}</div>}
      {success && <div className="text-success mb-3">{success}</div>}
    </div>
  );
}
