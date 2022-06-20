/* eslint-disable */

import React from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ReactHlsPlayer from 'react-hls-player';

import 'react-image-gallery/styles/css/image-gallery.css';


import '../blog.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContactIcons from '../components/Contact/ContactIcons';


const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

function getStravaCode(activityId) {
  console.log(activityId);
  var s = `https://strava-embeds.com/activity/${activityId}`
  return (
    <>
      <iframe className="strava-iframe" frameBorder="0" allowTransparency="true" scrolling="no"
  src={s}/>
    </>
  )
}

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: null,
      activity_num: -1,
      activity_count: null,
    };

    this.getThumbs = this.getThumbs.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  getActivity(activityNum) {
    fetch(`/strava?request_type=activity_by_num&activity_num=${activityNum}`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
          this.setState({activity: jsonOutput})
        }
      )
  }

  getActivityCount() {
    fetch(`/strava?request_type=activity_count`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
          this.setState({activity_count: jsonOutput.activity_count})
        }
      )
  }

  componentDidMount() {
    this.getActivity(0);
    this.getActivityCount();
  }

  getThumbs() {
    return this.state.activity.media.map((mediaDict) => {
        if (mediaDict.is_video) {
          return (
            <div>
              <img alt="" src={mediaDict.small_image_url}/>
            </div>
          )
        }
      }
    ).concat(
      this.state.activity.media.map((mediaDict) => {
          if (!mediaDict.is_video) {
            return (
              <div>
                <img alt="" src={mediaDict.small_image_url}/>
              </div>
            )
          }
        }
      )
    ).filter(x => x !== undefined);
  }

  getMedia() {
    return this.state.activity.media.map((mediaDict) => {
        if (mediaDict.is_video) {
          return (
            <div>
              <ReactHlsPlayer
                src={mediaDict.video_url}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
              />
            </div>
          )
        }
      }
    )
      .concat(
        this.state.activity.media.map((mediaDict) => {
            if (!mediaDict.is_video) {
              return (
                <div>
                  <img alt="" src={mediaDict.large_image_url}/>
                </div>
              )
            }
          }
        ))
      .filter(x => x !== undefined)
  }

  updatePage(e) {
    this.getActivity(parseInt(e.target.value));
  }

  render() {
    return (
      <Main
        title='Blog'
      >
        <article className="post" id="blog">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
            </div>
          </header>
          {this.state.activity &&
            <>
              <h3 data-testid="heading">{this.state.activity.name} ({(this.state.activity.distance / 1609).toFixed(1)} miles)</h3>
              <div>
                <Carousel
                  dynamicHeight={true}
                  renderThumbs={this.getThumbs}
                  infiniteLoop={true}
                  showArrows={false}
                  showStatus={false}
                >
                  {this.getMedia()}
                </Carousel>
              </div>
              <p>{this.state.activity.description}</p>
              {getStravaCode(this.state.activity.id)}
            </>
          }
          {this.state.activity_count &&
            <>
              <p>Select a day to view:</p>
              <select id="mySelect" onChange={this.updatePage} defaultValue={this.state.activity_count}>
                {Array.from({length: this.state.activity_count}, (_, i) => i + 1).map(
                  (value => <option value={value}>{value}</option>)
                )}
              </select>
            </>
          }
          <ContactIcons />
        </article>
      </Main>
    );
  }
}

export default Blog;
