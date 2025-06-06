import { AUTH_ICONS } from '@/utils/ui/iconUtils';

export function ProfileDeleteAccount() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center my-4">
      {AUTH_ICONS.warning({ className: 'text-danger' })}
      <h4 className="text-danger mb-4 mt-1">Delete Account</h4>
      <p>All your data and scores will be permanently deleted.</p>
      <span className="d-block mb-3">Are you sure you want to continue?</span>
    </div>
  );
}
