import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/fredoka/400.css';
import '@fontsource/fredoka/500.css';
import '@/index.css';
import App from '@/App';
import { AuthProvider } from '@/components/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
