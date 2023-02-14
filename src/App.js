/* eslint-disable */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const RouteMap = lazy(() => import('./pages/RouteMap'));
const Blog = lazy(() => import('./pages/Blog'));
// const Instagram = lazy(() => import('./pages/Instagram'));
const Fundraiser = lazy(() => import('./pages/Fundraiser'));
const Resume = lazy(() => import('./pages/Resume'));
const Press = lazy(() => import('./pages/Press'));
const Admin = lazy(() => import('./pages/Admin'));

const routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} sitemapIndex={true} />
      <Route path="/about" component={About} sitemapIndex={true} />
      <Route path="/routeMap" component={RouteMap} sitemapIndex={true} />
      <Route path="/blog/:id" component={Blog} sitemapIndex={false} />
      <Route path="/blog" component={Blog} sitemapIndex={true} />
      {/*<Route path="/instagram" component={Instagram} />*/}
      <Route path="/fundraiser" component={Fundraiser} sitemapIndex={true} />
      <Route path="/contact" component={Contact} sitemapIndex={true} />
      <Route path="/resume" component={Resume} sitemapIndex={true} />
      <Route path="/press" component={Press} sitemapIndex={true} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} status={404} />
    </Switch>
  )
}

const App = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Suspense fallback={<Main />}>
      {routes()}
    </Suspense>
  </BrowserRouter>
);

export function iOS() {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export default App;
