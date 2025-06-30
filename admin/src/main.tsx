import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoot from './components/appRoot';

const root = document.getElementById('root');
if (!root) {
  throw new Error('No root element found to mount the app');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
);
