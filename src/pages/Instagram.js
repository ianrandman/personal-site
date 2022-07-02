/* eslint-disable */

import React from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ReactHlsPlayer from 'react-hls-player';

import 'react-image-gallery/styles/css/image-gallery.css';

import '../main.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchBackend } from '../FetchConfig';

class Instagram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.getHighlight = this.getHighlight.bind(this);
    this.renderHighlight = this.renderHighlight.bind(this);
  }

  renderHighlight() {
    console.log(this.state.data);
    return this.state.data.reverse().map(media => {
      if (media.type === "photo") {
        return <LazyLoadImage className={"instagram-image"} src={media.url} width={168} height={300}/>
        // return <></>
      } else {
        console.log(media.url)
        return (
          <ReactHlsPlayer
            src={media.url}
            autoPlay={false}
            controls={true}
            width="100%"
            height="auto"
          />
        )
        // return <video src={media.url} />
      }
    })
  }

  getHighlight() {
    fetchBackend(`/instagram`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
        this.setState({data: jsonOutput.data})
        // console.log(this.state.data)
        }
      )
  }

  componentDidMount() {
    this.getHighlight();
  }

  render() {
    return (
      <Main
        title='Instagram Story Updates'
      >
        <article className="post" id="instagram">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/instagram">Instagram Story Updates</Link></h2>
              <a href="https://www.instagram.com/ianrandman" className="button" target="_blank">Go to my Instagram</a>
            </div>
          </header>
          {!this.state.data && <h3>Loading Instagram...</h3>}
          {this.state.data && this.renderHighlight()}
        </article>
      </Main>
    );
  }
}

export default Instagram;
