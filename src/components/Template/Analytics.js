import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const { REACT_APP_NODE_ENV, REACT_APP_GA_TRACKING_ID } = process.env;

if (REACT_APP_NODE_ENV === 'production') {
  ReactGA.initialize([
    {
      trackingId: REACT_APP_GA_TRACKING_ID,
    },
  ]);
}

const Analytics = () => {
  const { pathname } = useLocation();
  // eslint-disable-next-line no-console
  console.log(REACT_APP_NODE_ENV);

  useEffect(() => {
    if (REACT_APP_NODE_ENV === 'production') {
      // eslint-disable-next-line no-console
      console.log('Sending GA');
      ReactGA.send({
        hitType: 'pageview',
        page: pathname,
      });
    }
  }, [pathname]);

  return null;
};

export default Analytics;
