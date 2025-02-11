import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Ian Randman</h2>
        <p><a href="mailto:ianrandman@gmail.com">ianrandman@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Ian.
        I am a recent graduate of Rochester Institute of Technology with
        degrees in Computer Science (M.S.) and Software Engineering (B.S.).
        I am interested in all things AI, computer vision, and autonomous vehicles.
      </p>
      {/* <ul className="actions"> */}
      {/*   <li> */}
      {/*     <Link to="/fundraiser" className="button"> */}
      {/*       <div style={{ color: '#FF0000' }}>See the fundraiser</div> */}
      {/*     </Link> */}
      {/*   </li> */}
      {/*   <li> */}
      {/*     <Link to="/routeMap" className="button">See the route</Link> */}
      {/*   </li> */}
      {/*   <li> */}
      {/*     <Link to="/blog" className="button">See the blog</Link> */}
      {/*   </li> */}
      {/*   /!* <li> *!/ */}
      {/*   /!*  <Link to="/instagram" className="button">See my Instagram updates</Link> *!/ */}
      {/*   /!* </li> *!/ */}
      {/* </ul> */}
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Ian Randman <Link to="/">ianrandman.com</Link>.</p>
    </section>
  </section>
);

export default SideBar;
