import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';

// See https://reactjs.org/docs/strict-mode.html
const StrictApp = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

// hydrate is required by react-snap.
if (rootElement.hasChildNodes()) {
  hydrate(<StrictApp />, rootElement);
} else {
  render(<StrictApp />, rootElement);
}

// remember the original fetch-function to delegate to
const originalFetch = global.fetch;

const applyBaseUrlToFetch = (baseUrl) => {
  // replace the global fetch() with our version where we prefix the given URL with a baseUrl
  global.fetch = (url, options) => {
    const finalUrl = baseUrl + url;
    return originalFetch(finalUrl, options);
  };
};

// If we have a differing backend configured, replace the global fetch()
if (process.env.REACT_APP_BACKEND_API_BASE_URL !== undefined && process.env.REACT_APP_BACKEND_API_BASE_URL !== '') {
  applyBaseUrlToFetch(process.env.REACT_APP_BACKEND_API_BASE_URL);
}
