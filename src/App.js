/* eslint-disable */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles
const rides = require('./rides').rides;

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const About = lazy(() => import('./pages/About'));
const Rides = lazy(() => import('./pages/Rides'));
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
      <Route exact path="/" component={Index} />
      <Route exact path="/about" component={About} />
      <Route exact path="/rides" render={(props) => <Rides {...props} rides={rides} />} />
      {rides.map((ride) => (
        <Route key={`route-map-${ride.codename}`} exact path={`/rides/${ride.codename}/route-map`}
               render={(props) => <RouteMap {...props} ride={ride} />} />
      ))}
      {rides.map((ride) => (
        <Route key={`blog-${ride.codename}`} exact path={`/rides/${ride.codename}/blog/:id`}
               render={(props) => <Blog {...props} ride={ride} />} />
      ))}
      {rides.map((ride) => (
        <Route key={`generic-blog-${ride.codename}`} exact path={`/rides/${ride.codename}/blog`}
               render={(props) => <Blog {...props} ride={ride} />} />
      ))}
      <Route path="/routeMap" render={() => <Redirect to={'/rides/florida-to-alaska/route-map'} />} />
      {rides.map((ride) =>
        <Route key={`ride-${ride.codename}`} exact path={`/rides/${ride.codename}`}
               render={() => <Redirect to={`/rides/${ride.codename}/blog`} />} />
      )}
      <Route path="/blog/:id" component={Blog} />
      <Route path="/blog" component={Blog} />
      {/*<Route path="/instagram" component={Instagram} />*/}
      <Route exact path="/fundraiser" component={Fundraiser} sitemapIndex={true} />
      <Route exact path="/contact" component={Contact} sitemapIndex={true} />
      <Route exact path="/resume" component={Resume} sitemapIndex={true} />
      <Route exact path="/press" component={Press} sitemapIndex={true} />
      <Route exact path="/admin" component={Admin} />
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
