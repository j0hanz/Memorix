import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import type { ProfileDeleteAccountProps } from '@/types/components';

export const ProfileDeleteAccount: React.FC<ProfileDeleteAccountProps> = ({
  error,
  success,
}) => (
  <div className="d-flex flex-column align-items-center justify-content-center text-center my-4">
    <WarningAmberIcon color="error" fontSize="large" />
    <h4 className="text-danger mb-4 mt-1">Delete Account</h4>
    All your data and scores will be permanently deleted.
    <span className="d-block">Are you sure you want to continue?</span>
    {error && <div className="text-danger mb-3">{error}</div>}
    {success && <div className="text-success mb-3">{success}</div>}
  </div>
);
