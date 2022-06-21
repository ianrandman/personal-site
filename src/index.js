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
const fetchBackend = (url, options) => {
  const finalUrl = process.env.REACT_APP_BACKEND_API_BASE_URL + url;
  return global.fetch(finalUrl, options);
};

export default fetchBackend;
