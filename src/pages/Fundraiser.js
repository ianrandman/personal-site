/* eslint-disable */

import React from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

class Fundraiser extends React.Component {
  redirect() {
    window.location.replace("http://give.hackensackmeridianhealth.org/goto/BikeForJosh");
  }

  componentDidMount() {
    this.redirect();
  };

  render() {
    return (
      <Main
        title="Fundraiser"
        // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
      >
        <article className="post markdown" id="fundraiser">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/fundraiser">Fundraiser</Link></h2>
            </div>
          </header>
          <button onClick={this.redirect}>Click here if you are not redirected</button>
        </article>
      </Main>
    )
  }
}

export default Fundraiser;
