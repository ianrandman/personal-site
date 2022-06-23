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
import { fetchBackend } from '../FetchConfig';


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
      activity_num: 0,
      activity_count: null,
    };

    this.getThumbs = this.getThumbs.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.getPreviousActivity = this.getPreviousActivity.bind(this);
    this.getNextActivity = this.getNextActivity.bind(this);
  }

  getNextActivity() {
    if (this.state.activity_num === (this.state.activity_count - 1)) {
      this.getActivity(0);
    } else {
      this.getActivity(this.state.activity_num + 1);
    }
  }

  getPreviousActivity() {
    if (this.state.activity_num === 0) {
      this.getActivity(this.state.activity_count - 1);
    } else {
      this.getActivity(this.state.activity_num - 1);
    }
  }

  getActivity(activityNum) {
    fetchBackend(`/strava?request_type=activity_by_num&activity_num=${activityNum}`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
          this.setState({activity: jsonOutput, activity_num: activityNum});
          window.scrollTo(0, 0);
        }
      )
  }

  getActivityCount() {
    fetchBackend(`/strava?request_type=activity_count`)
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
          {((this.state.activity_num > 1 || this.state.activity_num === 0) && this.state.activity_count > 1) &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getPreviousActivity}>Previous Day</button>}
          {(this.state.activity_num !== 0 &&
            this.state.activity_num < this.state.activity_count) &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getNextActivity}>Next Day</button>}
          {this.state.activity &&
            <>
              <h3 data-testid="heading">{this.state.activity.name} ({(this.state.activity.distance / 1609).toFixed(1)} miles)</h3>
              <h4>{new Date(this.state.activity.start_date * 1000).toDateString()}</h4>
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
          {((this.state.activity_num > 1 || this.state.activity_num === 0) && this.state.activity_count > 1) &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getPreviousActivity}>Previous Day</button>}
          {(this.state.activity_num !== 0 &&
            this.state.activity_num < this.state.activity_count) &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getNextActivity}>Next Day</button>}
          {this.state.activity_count &&
            <>
              <h3>Select a day to view:</h3>
              <select id="mySelect" onChange={this.updatePage}
                      value={this.state.activity_num === 0 ? this.state.activity_count : this.state.activity_num}>
                {Array.from({length: this.state.activity_count}, (_, i) => i + 1).map(
                  (value => <option value={value}>Day {value}</option>)
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
