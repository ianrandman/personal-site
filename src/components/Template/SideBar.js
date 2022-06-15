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
        <h2>Ian&apos;Randman</h2>
        <p><a href="mailto:ianrandman@gmail.com">ianrandman@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Ian.
        I am a recent graduate of Rochester Institute of Technology with my bachelor&apos;s
        in Software Engineering and my master&apos;s in Computer Science. I am interested in
        all things AI, computer vision, and autonomous vehicles.
        I am currently on a bike ride from Key West, FL to Prudhoe Bay, AK.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Ian D&apos;Randman <Link to="/">ianrandman.com</Link>.</p>
    </section>
  </section>
);

export default SideBar;
