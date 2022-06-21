/* eslint-disable */

import React from 'react';
import '../main.css';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

import file from '../data/resume/resume.pdf'


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
    <iframe id="resume" src={file} width="825" allowTransparency="true" frameBorder="0" />
  </Main>
);

export default Resume;
