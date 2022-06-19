/* eslint-disable */

import React from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { Helmet } from 'react-helmet-async';

import ImageGallery from 'react-image-gallery';
import ReactHlsPlayer from 'react-hls-player';


const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const images = [
  {
    original: 'https://dgtzuqphqg23d.cloudfront.net/Q9d4pwyMDx8DbhHOWxhztdHNsyXvAQDAuotdhgquzLc-2048x1536.jpg',
    thumbnail: 'https://dgtzuqphqg23d.cloudfront.net/Q9d4pwyMDx8DbhHOWxhztdHNsyXvAQDAuotdhgquzLc-2048x1536.jpg',
  },
  {
    original: 'https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8',
    thumbnail: 'https://image.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4/thumbnail.jpg?width=3000&height=1687&fit_mode=preserve&time=0'
  },
  {
    original: 'https://dgtzuqphqg23d.cloudfront.net/vLiaAnLgxVeorhrasgcBS9v8YcZfTWDwTamNx8mIK4o-2048x1536.jpg',
    thumbnail: 'https://dgtzuqphqg23d.cloudfront.net/vLiaAnLgxVeorhrasgcBS9v8YcZfTWDwTamNx8mIK4o-2048x1536.jpg'
  }
]
const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';
class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
      showVideo: {},
      useWindowKeyDown: true,
    };

    this.images = [
      {
        thumbnail: `${PREFIX_URL}4v.jpg`,
        original: `${PREFIX_URL}4v.jpg`,
        embedUrl: 'https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8',
        description: 'Render custom slides (such as videos)',
        renderItem: this._renderVideo.bind(this)
      },
      {
        original: `${PREFIX_URL}1.jpg`,
        thumbnail: `${PREFIX_URL}1t.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails',
      },
    ].concat(this._getStaticImages());
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    if (event.target.value > 0) {
      this.setState({[state]: event.target.value});
    }
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _handleThumbnailPositionChange(event) {
    this.setState({thumbnailPosition: event.target.value});
  }

  _getStaticImages() {
    let images = [];
    for (let i = 2; i < 12; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail:`${PREFIX_URL}${i}t.jpg`
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
              <a
                className='close-video'
                onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
              >
              </a>
              <ReactHlsPlayer
                src={item.embedUrl}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
              />,
              {/*<video width="560" height="315" controls>*/}
              {/*  <source src={item.embedUrl} type="application/x-mpegURL" />*/}
              {/*</video>*/}
              {/*<iframe*/}
              {/*  width='560'*/}
              {/*  height='315'*/}
              {/*  src={item.embedUrl}*/}
              {/*  frameBorder='0'*/}
              {/*  allowFullScreen*/}
              {/*>*/}
              {/*</iframe>*/}
            </div>
            :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img className='image-gallery-image' src={item.original} />
              {
                item.description &&
                <span
                  className='image-gallery-description'
                  style={{right: '0', left: 'initial'}}
                >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    return (
      <Main
        title="Blog"
        // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
      >
        <header>
          <div className="title">
            <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
          </div>
        </header>
        <Helmet>
          <script src='https://strava-embeds.com/embed.js'></script>
        </Helmet>
        {/*Hello*/}
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          isRTL={this.state.isRTL}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailOver={this.state.slideOnThumbnailOver}
          additionalClass="app-image-gallery"
          useWindowKeyDown={this.state.useWindowKeyDown}
        />
        {/*<div className='strava-embed-placeholder' data-embed-type='activity'*/}
        {/*     data-embed-id='7282971555'></div>*/}
      </Main>
    );
  }

}


// const Blog = () => (
//   <Main
//     title="Blog"
//     // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
//   >
//     <header>
//       <div className="title">
//         <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
//       </div>
//     </header>
//     <Helmet>
//       <script src='https://strava-embeds.com/embed.js'></script>
//     </Helmet>
//     {/*Hello*/}
//     <ImageGallery items={images} />
//     {/*<div className='strava-embed-placeholder' data-embed-type='activity'*/}
//     {/*     data-embed-id='7282971555'></div>*/}
//   </Main>
// );

export default Blog;
