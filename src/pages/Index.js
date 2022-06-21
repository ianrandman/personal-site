import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={"Ian Randman's personal website."}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">About this site</Link></h2>
        </div>
      </header>
      <p> Welcome to my website. I&apos;m currently biking from the southernmost point in the
        continental
        US <a href="https://goo.gl/maps/UCVC9NjKZU4DaEcv7" target="_blank" rel="noreferrer">(Key West, FL)</a> to
        the northernmost point in North America accessible by
        road <a href="https://goo.gl/maps/qmWmRrfzJz28bWv97" target="_blank" rel="noreferrer">(Prudhoe Bay, AK)</a>.
        Please feel free to check out
        my <Link to="/blog">daily updates</Link>,
        my <Link to="/routeMap">route and current location</Link>,
        or you can check out my {' '}
        <Link to="/resume">resume</Link>, {' '}
        or <Link to="/contact">contact</Link> me.
      </p>
    </article>
  </Main>
);

export default Index;
