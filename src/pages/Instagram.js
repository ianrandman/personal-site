/* eslint-disable */

import React from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ReactHlsPlayer from 'react-hls-player';

import 'react-image-gallery/styles/css/image-gallery.css';


import '../main.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ContactIcons from '../components/Contact/ContactIcons';
import { fetchBackend } from '../FetchConfig';


async function a() {
  console.log('test before')
  const res = await fetch('https://instasave.biz/api/search/highlightedStories/highlight:17880159521677171');
  console.log(res);
}

a();

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
      if (media.media_type === "image") {
        return <LazyLoadImage className={"instagram-image"} src={media.source} width={168} height={300}/>
        // return <></>
      } else {
        return <video src={media.source} type="video/mp4" />
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
            </div>
            <a href="https://www.instagram.com/ianrandman" className="button" target="_blank">Go to my Instagram</a>
          </header>
          {this.state.data && this.renderHighlight()}
          <ContactIcons />
        </article>
      </Main>
    );
  }
}

export default Instagram;
