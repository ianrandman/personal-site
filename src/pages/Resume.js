/* eslint-disable */

import React from 'react';
// import ReactPDF from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

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
    <Document file={process.env.REACT_APP_BACKEND_API_BASE_URL + "/static/ian_randman_resume.pdf"}>
      <Page pageNumber={1} width={document.getElementById('main').clientWidth} />
    </Document>
    <p/>
    <a href={process.env.REACT_APP_BACKEND_API_BASE_URL + "/static/ian_randman_resume.pdf"} className="button" download="ian_randman_resume.pdf">Download</a>
    <p/>
  </Main>
);

export default Resume;
