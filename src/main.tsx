import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register corporate static assets caching Service Worker
// @ts-ignore
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('Scattergates Service Worker successfully registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.error('Scattergates Service Worker registration failed:', err);
      });
  });
}
