/* eslint-disable */
// remember the original fetch-function to delegate to

export const fetchBackend = (url, options) => {

  const finalUrl = process.env.REACT_APP_BACKEND_API_BASE_URL + url;
  return global.fetch(finalUrl, options);
};
