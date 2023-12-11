import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Analytics from '../components/Template/Analytics';
import Navigation from '../components/Template/Navigation';
import SideBar from '../components/Template/SideBar';
// import ScrollToTop from '../components/Template/ScrollToTop';

const Main = (props) => {
  useEffect(() => {
    const pageURL = window.location.href;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', pageURL);
    }
  }, [window.location.href]);

  return (
    // <></>
    <HelmetProvider>
      <Analytics />
      {/* <ScrollToTop /> */}
      <Helmet titleTemplate="%s | Ian Randman" defaultTitle="Ian Randman" defer={false}>
        {props.title && <title>{props.title}</title>}
        <meta name="description" content={props.description} />
      </Helmet>
      <div id="wrapper">
        <Navigation />
        <div id="main">
          {props.children}
        </div>
        {props.fullPage ? null : <SideBar />}
      </div>
    </HelmetProvider>
  );
};

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fullPage: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

Main.defaultProps = {
  children: null,
  fullPage: false,
  title: null,
  description: "Ian Randman's personal website.",
};

export default Main;
