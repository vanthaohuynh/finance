import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import ErrorBoundary from './ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </StrictMode>,
  );
});

// Cannot use this because when refreshing the page, everything is removed also.
// window.onbeforeunload = () => {
//   window.localStorage.removeItem('user');
//   window.localStorage.removeItem('token');
// };
