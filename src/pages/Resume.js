/* eslint-disable */

import React from 'react';
import '../main.css';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage


const Resume = () => (
  <Main
    title="Resume"
    // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
  >
    <header>
      <div className="title">
        <h2 data-testid="heading"><Link to="/resume">Resume</Link></h2>
      </div>
    </header>
    <iframe id="resume" src="/resume.pdf#toolbar=0" width="825" allowTransparency="true" frameBorder="0" />
  </Main>
);

export default Resume;
