import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import Welcome from './components/Welcome';
import ErrorBoundary from './ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <Router>
          {/* <Welcome /> */}
          <App />
        </Router>
      </ErrorBoundary>
    </StrictMode>,
  );
});
