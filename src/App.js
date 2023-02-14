/* eslint-disable */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles
import SitemapBuilder from './components/Sitemap/sitemap';
import Routes from './data/routes';
import { fetchBackend } from './FetchConfig';

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
// const Projects = lazy(() => import('./pages/Projects'));
const RouteMap = lazy(() => import('./pages/RouteMap'));
const Blog = lazy(() => import('./pages/Blog'));
// const Instagram = lazy(() => import('./pages/Instagram'));
const Fundraiser = lazy(() => import('./pages/Fundraiser'));
const Resume = lazy(() => import('./pages/Resume'));
const Press = lazy(() => import('./pages/Press'));
const Admin = lazy(() => import('./pages/Admin'));
// const Stats = lazy(() => import('./pages/Stats'));

function getActivities() {
  let response = fetchBackend(`/strava?get_all=True`);
  console.log(response);
  return [{id: 0}];

  // fetchBackend(`/strava?get_all=True`)
  //   .then(
  //     response => response.json()
  //   )
  //   .then(jsonOutput => {
  //       console.log(jsonOutput.reduce((acc, activity) => {
  //         if (!activity.name.includes("Hike")) {
  //           return acc + activity.moving_time.split(':').reduce((acc,time) => (60 * acc) + +time);
  //         }
  //         return acc;
  //       }, 0))
  //       this.setState(
  //         {
  //           activities: jsonOutput,
  //           total_distance: jsonOutput.reduce((acc, activity) => {
  //             if (!activity.name.includes("Hike")) {
  //               return acc + activity.distance;
  //             }
  //             return acc;
  //           }, 0),
  //           total_elevation_gain: jsonOutput.reduce((acc, activity) => {
  //             if (!activity.name.includes("Hike")) {
  //               return acc + activity.total_elevation_gain;
  //             }
  //             return acc;
  //           }, 0),
  //           total_moving_time: jsonOutput.reduce((acc, activity) => {
  //             if (!activity.name.includes("Hike")) {
  //               return acc + activity.moving_time.split(':').reduce((acc,time) => (60 * acc) + +time);
  //             }
  //             return acc;
  //           }, 0)
  //         });
  //       this.putRiddenRoute()
  //     }
  //   )
}


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
      <Route path="/sitemap" component={Sitemap} sitemapIndex={true} />
      <Route component={NotFound} status={404} />
    </Switch>
  )
}


function Sitemap(props) {
  return (
    <SitemapBuilder routes={routes} prettify={true} {...props}/>
  );
}

const App = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Suspense fallback={<Main />}>
      {/*<Switch>*/}
        {routes()}
      {/*</Switch>*/}
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
