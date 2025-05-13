import 'bootstrap/dist/css/bootstrap.min.css';
import './variables.css';
import '@fontsource/fredoka/400.css';
import '@fontsource/fredoka/500.css';
import '@/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import { AuthProvider } from '@/components/AuthProvider';
import { ErrorProvider } from '@/components/ErrorProvider';
import { ModalProvider } from '@/components/ModalProvider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
createRoot(rootElement).render(
  <StrictMode>
    <ErrorProvider>
      <AuthProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthProvider>
    </ErrorProvider>
  </StrictMode>,
);
