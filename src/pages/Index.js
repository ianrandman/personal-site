import React from 'react';
import { Link } from 'react-router-dom';

import '../main.css';
import Main from '../layouts/Main';
// import rides from '../rides';

const { PUBLIC_URL } = process.env;

const Index = () => (
  <Main
    description={"Ian Randman's personal website."}
  >
    <article className="post" id="index">
      {/* <header> */}
      {/*   <div className="title"> */}
      {/*     <h2 data-testid="heading"><Link to="/">About this site</Link></h2> */}
      {/*   </div> */}
      {/* </header> */}
      <img className="home-image" src={`${PUBLIC_URL}/images/fireworks.jpg`} alt="bicycle with fireworks" />
      <p>Welcome to my website. I use this space to document my life adventures, like
        <Link to="/rides/florida-to-alaska/blog">riding my bicycle from Florida to Alaska</Link>.
        Please feel free to check out
        my <Link to="/rides">other trips</Link>,
        or you can check out my {' '}
        <Link to="/resume">resume</Link> {' '}
        or <Link to="/contact">contact</Link> me. You can
        also read more <Link to="/about">about me</Link>.
        <br /><br />
        I have also compiled news articles about myself on my <Link to="/press">Press page</Link>.
      </p>

      {/* eslint-disable-next-line max-len */}
      {/* <p> Welcome to my website. I just finished riding my bicycle from the southernmost point in */}
      {/*   the continental */}
      {/*   US <a href="https://goo.gl/maps/UCVC9NjKZU4DaEcv7" target="_blank" rel="noreferrer">(Key West, FL)</a> to */}
      {/*   the northernmost point in North America accessible by */}
      {/*   road <a href="https://goo.gl/maps/qmWmRrfzJz28bWv97" target="_blank" rel="noreferrer">(Prudhoe Bay, AK)</a>. */}
      {/* eslint-disable-next-line max-len */}
      {/*   This ride is a <Link to="/fundraiser">fundraiser</Link> in memory of my cousin, Joshua Randman. */}
      {/*   Please consider reading more about my cousin and signing */}
      {/*   this <a href="https://www.change.org/p/increase-federal-funding-for-childhood-cancer-research-from-4-to-8-josh-randman" target="_blank" rel="noreferrer">change.org petition</a> and */}
      {/*   this <a href="https://img1.wsimg.com/blobby/go/f6014cc3-949e-4ac6-86db-c77d836bf2b7/Joshua%20New%20Jersey.pdf" target="_blank" rel="noreferrer">other petition</a> (at the bottom). */}
      {/*   <br /><br /> */}
      {/*   Please feel free to check out */}
      {/* eslint-disable-next-line max-len */}
      {/*   my <Link to="/blog">daily blog</Link> from the trip, /!* <Link to="/instagram">Instagram Story updates</Link>, *!/ */}
      {/*   my <Link to="/routeMap">route and current location</Link>, */}
      {/*   or you can check out my {' '} */}
      {/*   <Link to="/resume">resume</Link>, {' '} */}
      {/*   or <Link to="/contact">contact</Link> me. You can */}
      {/*   also read more <Link to="/about">about me</Link>. */}
      {/*   <br /><br /> */}
      {/* eslint-disable-next-line max-len */}
      {/*   I have also compiled news articles about the trip on my <Link to="/press">Press page</Link>. */}
      {/* </p> */}

      {/* <div className="rectangles-container"> */}
      {/*   {rides.map((ride) => ( */}
      {/*     <div className="long-rectangle"> */}
      {/*       <a href={`/rides/${ride.codename}/routeMap`}> */}
      {/*         <div className="rectangle-image"> */}
      {/*           /!* <div className="rectangle-title">Florida to Alaska</div> *!/ */}
      {/*           <img src={ride.imageUrl} alt="from ride" /> */}
      {/*           <div className="rectangle-title">{ride.title}</div> */}
      {/*         </div> */}
      {/*       </a> */}
      {/*     </div> */}
      {/*   ))} */}
      {/* </div> */}
    </article>
  </Main>
);

export default Index;
