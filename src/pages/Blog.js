/* eslint-disable */

import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { FullScreen, Zoom } from 'ol/control';

import { Vector as SourceVector, XYZ } from 'ol/source';
import { Polyline } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Vector } from 'ol/layer';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Icon, Stroke, Style } from 'ol/style';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ReactHlsPlayer from 'react-hls-player';

import 'react-image-gallery/styles/css/image-gallery.css';

import '../main.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContactIcons from '../components/Contact/ContactIcons';
import { fetchBackend } from '../FetchConfig';
import { PinchRotate } from 'ol/interaction';
import { ToggleFullscreenControl, ToggleSatelliteControl } from '../components/Map/controls';
import { iOS } from '../App';


function getStravaCode(activityId) {
  const s = `https://strava-embeds.com/activity/${activityId}`
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
      activities: null,
      activity_num: null,
      activity_count: null,
      isSatellite: false,
      isFullscreen: false
    };

    if (props.location.state) {
      this.state.activity_num = props.location.state.activity_num;
    }

    this._carousel = React.createRef();

    this.startIconStyle = new Style({
      image: new Icon({
        src: 'https://img.icons8.com/emoji/344/green-circle-emoji.png',
        scale: 0.08,
      }),
    });

    this.endIconStyle = new Style({
      image: new Icon({
        src: 'https://img.icons8.com/emoji/344/red-circle-emoji.png',
        scale: 0.08,
      }),
    });

    this.startLayer = new Vector({
      style: this.startIconStyle,
      zIndex: 3
    });

    this.endLayer = new Vector({
      style: this.endIconStyle,
      zIndex: 3
    });

    this.riddenRouteVector = new VectorLayer({
      source: new VectorSource({
        features: [],
      }),
      style: new Style({
        stroke: new Stroke({
          width: 4,
          color: 'blue',
        }),
      }),
      zIndex: 1
    });

    this.OSMSource = new XYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    });

    this.satelliteSource = new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 20
    });

    this.backgroundLayer = new TileLayer({
      source: this.OSMSource,
      zIndex: 0
    });

    this.getThumbs = this.getThumbs.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.getPreviousActivity = this.getPreviousActivity.bind(this);
    this.getNextActivity = this.getNextActivity.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.toggleSatellite = this.toggleSatellite.bind(this);

    this.map = new Map({
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 2,
        enableRotation: false
      }),
      controls: [
        new Zoom(),
        new ToggleSatelliteControl({"parentFn": this.toggleSatellite})
      ],
    });
    if (iOS()) {
      this.map.addControl(
        new ToggleFullscreenControl({"parentFn": this.toggleFullscreen})
      );
    } else {
      this.map.addControl(new FullScreen());
    }
    this.map.getInteractions().getArray().filter((interaction) => (
      interaction instanceof PinchRotate
    ))[0].setActive(false);
  }

  toggleSatellite() {
    this.setState({isSatellite: !this.state.isSatellite});

    if (this.state.isSatellite) {
      backgroundLayer.setSource(satelliteSource);
    } else {
      backgroundLayer.setSource(OSMSource);
    }
  }

  toggleFullscreen() {
    this.setState({isFullscreen: !this.state.isFullscreen});
    this.map.updateSize();
  }

  getNextActivity() {
    this.getActivity(this.state.activity_num + 1)
  }

  getPreviousActivity() {
    this.getActivity(this.state.activity_num - 1)
  }

  getActivity(activityNum) {
    this.setState({ activity_num: activityNum });

    const activity = this.state.activities[activityNum];
    this.map.removeLayer(this.backgroundLayer);
    this.map.setLayers([
      this.backgroundLayer,
      this.riddenRouteVector,
      this.startLayer,
      this.endLayer
    ]);
    this.startLayer.setSource(
      new SourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat(JSON.parse(activity.start_latlng).reverse()))
          })
        ]
      })
    );
    this.endLayer.setSource(
      new SourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat(JSON.parse(activity.end_latlng).reverse()))
          })
        ]
      })
    );
    const riddenRoute = new Polyline({
      factor: 1e5,
    }).readGeometry(activity.polyline, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
    this.riddenRouteVector.setSource(new VectorSource({
      features: [
        new Feature({
          type: 'route',
          geometry: riddenRoute,
        })
      ]
    }));
    this.map.getView().fit(riddenRoute.getExtent());
    this.map.getView().setZoom(this.map.getView().getZoom() - 0.5);
    activity.media.map((mediaObj) => {
      if (mediaObj.location === "None") {
        return;
      }

      this.map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(fromLonLat(JSON.parse(mediaObj.location).reverse()))
              })
            ]
          }),
          style: new Style({
            image: new Icon({
              src: mediaObj.small_image_url,
              scale: 0.5,
            })
          }),
          zIndex: 2
        })
      )
    });

    // window.scrollTo(0, 0);
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
          activity_num: this.state.activity_num !== null ? this.state.activity_num : jsonOutput.length - 1});

          this.getActivity(this.state.activity_num);
        }
      )
  }

  componentDidMount() {
    this.map.setTarget("map");
    this.getActivities();
  }

  getThumbs() {
    return this.state.activities[this.state.activity_num].media.map((mediaDict) => {
      return (
        <div>
          <img alt="" src={mediaDict.small_image_url}/>
        </div>
      )}
    );
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
      } else {
        return (
          <div>
            <img alt="" src={mediaDict.large_image_url}/>
          </div>
        )
      }
    });
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
              {this.state.activities &&
              <>
                {/*<h3>Select a day to view:</h3>*/}
                <div className="dropdown">
                  <select id="mySelect" onChange={this.updatePage}
                          value={this.state.activity_num}>
                    {Array.from(Array(this.state.activities.length).keys()).reverse().map(
                      (value => <option value={value}>{this.state.activities[value].name}</option>)
                    )}
                  </select>
                </div>
                <p/>
              </>
              }
            </div>
          </header>
          {!this.state.activities && <h3>Loading blog...</h3>}
          <p/>
          {this.state.activities &&
            <>
              <h3 data-testid="heading">{this.state.activities[this.state.activity_num].name} ({(this.state.activities[this.state.activity_num].distance / 1609).toFixed(1)} miles)</h3>
              <h4>{new Date(this.state.activities[this.state.activity_num].start_date * 1000).toDateString()}</h4>

              <div>
                {this.state.activities && this.state.activity_num > 0 &&
                <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getPreviousActivity}>Previous Day</button>}
                {this.state.activities && this.state.activity_num < this.state.activities.length - 1 &&
                <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getNextActivity}>Next Day</button>}

              </div>
              <hr/>
              <div>
                <Carousel
                  dynamicHeight={true}
                  renderThumbs={this.getThumbs}
                  infiniteLoop={true}
                  showArrows={false}
                  showStatus={false}
                  ref={this._carousel}
                  preventMovementUntilSwipeScrollTolerance={true}
                  swipeScrollTolerance={100}
                >
                  {this.getMedia()}
                </Carousel>
              </div>
              <p>{this.state.activities[this.state.activity_num].description}</p>
              <hr/>
            </>
          }

          <div>
            <div style={{marginRight: "5px", marginBottom: "5px", display: "inline-block"}}>
              {this.state.activities && this.state.activity_num > 0 &&
              <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getPreviousActivity}>Previous Day</button>}
              {this.state.activities && this.state.activity_num < this.state.activities.length - 1 &&
              <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getNextActivity}>Next Day</button>}
            </div>
            {/*<button style={{display: "inline-block"}} onClick={this.toggleSatellite}>{this.state.isSatellite ? "Toggle OSM Map" : "Toggle Satellite Map"}</button>*/}
          </div>

          <p/>
          <link href="https://openlayers.org/en/v6.14.1/css/ol.css" rel="stylesheet"/>
          <div id="map" className={this.state.isFullscreen ? "divFixedClass" : ""} style={
            {
              width: "100%",
              height: this.state.isFullscreen? "100vh" : "70vh"
            }
          }/>
          <hr/>
          {this.state.activities && getStravaCode(this.state.activities[this.state.activity_num].id)}

          {this.state.activities && this.state.activity_num > 0 &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getPreviousActivity}>Previous Day</button>}
          {this.state.activities && this.state.activity_num < this.state.activities.length - 1 &&
          <button type="button" style={{width: "auto", alignSelf: "inherit"}} onClick={this.getNextActivity}>Next Day</button>}
          {this.state.activities &&
            <>
              <hr/>
              <h3>Select a day to view:</h3>
              <div className="dropdown">
                <select id="mySelect" onChange={this.updatePage}
                        value={this.state.activity_num}>
                  {Array.from(Array(this.state.activities.length).keys()).reverse().map(
                    (value => <option key={value} value={value}>{this.state.activities[value].name}</option>)
                  )}
                </select>
              </div>
              <p/>
            </>
          }
          <ContactIcons />
        </article>
      </Main>
    );
  }
}

export default Blog;
