import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './variables.css';
import '@fontsource/fredoka/400.css';
import '@fontsource/fredoka/500.css';
import '@/index.css';
import App from '@/App';
import { AuthProvider } from '@/components/AuthProvider';
import { ModalProvider } from '@/components/ModalProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </StrictMode>,
);
