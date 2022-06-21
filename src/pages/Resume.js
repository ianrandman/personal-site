/* eslint-disable */

import React from 'react';
// import ReactPDF from '@react-pdf/renderer';
import { Document, pdfjs, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
    <Document file={file}>
      <Page pageNumber={1} width={document.getElementById('main').clientWidth} />
    </Document>
  </Main>
);

export default Resume;
