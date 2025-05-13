import 'bootstrap/dist/css/bootstrap.min.css';
import './variables.css';
import '@fontsource/fredoka/400.css';
import '@fontsource/fredoka/500.css';
import '@/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import {
  AuthProvider,
  ErrorProvider,
  ModalProvider,
  SoundProvider,
  ToastProvider,
} from '@/components/Provider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorProvider>
      <ToastProvider>
        <SoundProvider>
          <AuthProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </AuthProvider>
        </SoundProvider>
      </ToastProvider>
    </ErrorProvider>
  </StrictMode>,
);
