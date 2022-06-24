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
    console.log(props)

    this.state = {
      activities: null,
      activity_num: null,
      activity_count: null,
    };

    if (props.location.state) {
      this.state.activity_num = props.location.state.activity_num;
    }

    this._carousel = React.createRef();

    this.getThumbs = this.getThumbs.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.getPreviousActivity = this.getPreviousActivity.bind(this);
    this.getNextActivity = this.getNextActivity.bind(this);
    this.getActivity = this.getActivity.bind(this);
  }

  getNextActivity() {
    this.getActivity(this.state.activity_num + 1)
  }

  getPreviousActivity() {
    this.getActivity(this.state.activity_num - 1)
  }

  getActivity(activityNum) {
    this.setState({ activity_num: activityNum });
    window.scrollTo(0, 0);
    this._carousel.current.moveTo(0);
  }

  getActivities() {
    fetchBackend(`/strava`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
        this.setState({
          activities: jsonOutput,
          activity_num: this.state.activity_num ? this.state.activity_num : jsonOutput.length - 1});
        }
      )
  }

  componentDidMount() {
    this.getActivities();
  }

  getThumbs() {
    return this.state.activities[this.state.activity_num].media.map((mediaDict) => {
        if (mediaDict.is_video) {
          return (
            <div>
              <img alt="" src={mediaDict.small_image_url}/>
            </div>
          )
        }
      }
    ).concat(
      this.state.activities[this.state.activity_num].media.map((mediaDict) => {
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
    return this.state.activities[this.state.activity_num].media.map((mediaDict) => {
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
        this.state.activities[this.state.activity_num].media.map((mediaDict) => {
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
          {!this.state.activities && <h3>Loading blog...</h3>}
          {this.state.activities && this.state.activity_num > 0 &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getPreviousActivity}>Previous Day</button>}
          {this.state.activities && this.state.activity_num < this.state.activities.length - 1 &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getNextActivity}>Next Day</button>}
          {this.state.activities &&
            <>
              <h3 data-testid="heading">{this.state.activities[this.state.activity_num].name} ({(this.state.activities[this.state.activity_num].distance / 1609).toFixed(1)} miles)</h3>
              <h4>{new Date(this.state.activities[this.state.activity_num].start_date * 1000).toDateString()}</h4>
              <div>
                <Carousel
                  dynamicHeight={true}
                  renderThumbs={this.getThumbs}
                  infiniteLoop={true}
                  showArrows={false}
                  showStatus={false}
                  ref={this._carousel}
                >
                  {this.getMedia()}
                </Carousel>
              </div>
              <p>{this.state.activities[this.state.activity_num].description}</p>
              {getStravaCode(this.state.activities[this.state.activity_num].id)}
            </>
          }
          {this.state.activities && this.state.activity_num > 0 &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getPreviousActivity}>Previous Day</button>}
          {this.state.activities && this.state.activity_num < this.state.activities.length - 1 &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getNextActivity}>Next Day</button>}
          {this.state.activities &&
            <>
              <h3>Select a day to view:</h3>
              <select id="mySelect" onChange={this.updatePage}
                      value={this.state.activity_num}>
                {Array.from(Array(this.state.activities.length).keys()).reverse().map(
                  (value => <option value={value}>{this.state.activities[value].name}</option>)
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
