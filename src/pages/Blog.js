/* eslint-disable */

import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { FullScreen, Zoom } from 'ol/control';
import {extend} from 'ol/extent';

import { OSM, Vector as SourceVector, XYZ } from 'ol/source';
import { KML, Polyline } from 'ol/format';
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
import { fetchBackend } from '../FetchConfig';
import { defaults, PinchRotate } from 'ol/interaction';
import {
  ToggleBikeOverlayControl,
  ToggleFullscreenControl,
  ToggleSatelliteControl
} from '../components/Map/controls';
import { iOS } from '../App';

import ReactMarkdown from 'react-markdown'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import VectorImageLayer from 'ol/layer/VectorImage';
import DblClickDragZoom from '../DblClickDragZoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStrava } from '@fortawesome/free-brands-svg-icons/faStrava';

function LinkRenderer(props) {
  console.log(props.href);
  return <a href={props.href} target="_blank" rel="noreferrer" >{props.children}</a>
}

const route = new VectorImageLayer({
  source: new VectorSource({
    url: process.env.REACT_APP_BACKEND_API_BASE_URL + '/static/Florida_to_Alaska.kml',
    format: new KML({
      extractStyles: false
    }),
  }),
  style: new Style({
    stroke: new Stroke({
      width: 3,
      color: 'red',
      lineDash: [5, 5]
    })
  }),
});

const OSMSource = new XYZ({
  url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga',
  maxZoom: 22
});

const satelliteSource = new XYZ({
  url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
  maxZoom: 19
});


class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      activities: null,
      activity_num: null,
      activity_count: null,
      isSatellite: false,
      bikeOverlay: false,
      isFullscreen: false,
      media: null,
      showVideo: {},
      showPlayButton: true,
      showGalleryPlayButton: true,
      scrollId: null,
      scrollOffset: 0
    };

    if (props.location.state) {
      this.state.activity_num = props.location.state.activity_num;
    } else {
      if (props.match.params.id !== undefined) {
        this.state.id = parseInt(props.match.params.id);
      }
    }

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

    this.currentRouteVector = new VectorLayer({
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

    this.backgroundLayer = new TileLayer({
      source: OSMSource,
      zIndex: 0
    });

    this.getThumbs = this.getThumbs.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.getPreviousActivity = this.getPreviousActivity.bind(this);
    this.getNextActivity = this.getNextActivity.bind(this);
    this.changeActivity = this.changeActivity.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.toggleSatellite = this.toggleSatellite.bind(this);
    this.toggleBikeOverlay = this.toggleBikeOverlay.bind(this);

    this.map = new Map({
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 2,
        enableRotation: false,
        smoothResolutionConstraint: false
      }),
      controls: [
        new Zoom(),
        new ToggleSatelliteControl({"parentFn": this.toggleSatellite}),
        new ToggleBikeOverlayControl({"parentFn": this.toggleBikeOverlay})
      ],
      interactions: defaults().extend([
        new DblClickDragZoom()
      ])
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
      this.backgroundLayer.setSource(satelliteSource);
    } else {
      this.backgroundLayer.setSource(OSMSource);
    }
  }

  toggleBikeOverlay() {
    this.setState({bikeOverlay: !this.state.bikeOverlay});

    if (this.state.bikeOverlay) {
      OSMSource.setUrl('http://mt0.google.com/vt/lyrs=m,bike&hl=en&x={x}&y={y}&z={z}&s=Ga')
      satelliteSource.setUrl('http://mt0.google.com/vt/lyrs=y,bike&hl=en&x={x}&y={y}&z={z}&s=Ga')
    } else {
      OSMSource.setUrl('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga')
      satelliteSource.setUrl('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga')
    }
  }

  toggleFullscreen() {
    this.setState({isFullscreen: !this.state.isFullscreen});
    this.map.updateSize();
  }

  getPrevNextActivityCommon(e) {
    // do not follow hyperlink; use javascript only
    e.preventDefault();

    // maintain position of button on screen
    this.setState({
      scrollId: e.target.id,
      scrollOffset: document.getElementById(e.target.id).offsetTop - window.scrollY
    })
  }

  getNextActivity(e) {
    this.getActivity(this.state.activity_num + 1);
    this.getPrevNextActivityCommon(e);
    return false;
  }

  getPreviousActivity(e) {
    this.getActivity(this.state.activity_num - 1);
    this.getPrevNextActivityCommon(e);
    return false;
  }

  changeActivity(activityNum, activity) {
    let frame = document.getElementById("strava-iframe");
    frame.contentWindow.location.replace(`https://strava-embeds.com/activity/${activity.id}`);

    if (!this.state.activities[activityNum].hasOwnProperty('media')) {
      this.fetchActivity(activityNum);
    } else {
      this.setState({
        activity_num: activityNum,
        media: null
      });
      this.changeMap(activity);
    }
  }

  changeMap(activity) {
    console.log(document.referrer)
    this.setState({media: this.getMedia(activity)})

    this.map.removeLayer(this.backgroundLayer);
    this.map.setLayers([
      this.backgroundLayer,
      this.currentRouteVector,
      this.startLayer,
      this.endLayer,
      route
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
    this.currentRouteVector.setSource(new VectorSource({
      features: [
        new Feature({
          type: 'route',
          geometry: riddenRoute,
        })
      ]
    }));

    var extent = riddenRoute.getExtent();
    activity.media.map((mediaObj) => {
      if (mediaObj.location === "None" || mediaObj.location === "[0.0, 0.0]") {
        return;
      }

      const layerToAdd = new VectorLayer({
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

      this.map.addLayer(
        layerToAdd
      );

      extend(extent, layerToAdd.getSource().getExtent());
    });


    this.map.getView().fit(extent);
    this.map.getView().setZoom(this.map.getView().getZoom() - 0.5);

    // window.scrollTo(0, 0);
  }

  getActivity(activityNum, doReplace) {
    console.log(activityNum)
    /////////////////////////////////////
    if (doReplace) {
      console.log('here 1')
      console.log(document.referrer)
      // window.location.replace(`/blog/${this.state.activities[activityNum].id}`)
      window.history.replaceState({}, "", `/blog/${this.state.activities[activityNum].id}`)
    } else {
      console.log('here 2')
      console.log(document.referrer)
      // window.history.push(`/blog/${this.state.activities[activityNum].id}`)
      window.history.pushState({}, "", `/blog/${this.state.activities[activityNum].id}`)
    }

    this.fetchActivity(activityNum);
  }

  fetchActivity(activityNum) {
    this.setState({
      activity_num: activityNum,
      media: null
    });

    if (this.state.activities[activityNum].hasOwnProperty('media')) {
      this.changeActivity(activityNum, this.state.activities[activityNum]);
      return;
    }

    fetchBackend(`/strava?id=${this.state.activities[activityNum].id}&get_polyline=True&get_media=True`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
          this.state.activities[activityNum] = jsonOutput;
          console.log(this.state.activities[activityNum] )

          this.changeActivity(activityNum, jsonOutput);
          console.log(this.state)
          this.changeMap(jsonOutput);
        }
      )
  }

  getActivities() {
    fetchBackend(`/strava?get_all=True`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
        console.log(this.state)
        let num;
        if (this.state.id !== null) {
          num = jsonOutput.findIndex(activity => activity.id === this.state.id);
        } else {
          num = this.state.activity_num !== null ? this.state.activity_num : jsonOutput.length - 1
        }

        this.setState({
          activities: jsonOutput,
          activity_num: num

          // activity_num:
        });
        console.log(jsonOutput)
        window.scrollTo(0, 0);
        //
        // if (this.state.id !== null) {
        //   // this.setState({
        //   //   activity_num: this.state.activity_num !== null ? this.state.activity_num : jsonOutput.length - 1
        //   // });
        // }

        this.getActivity(this.state.activity_num, this.state.id === null);
        }
      )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevState)

    console.log(this.props)
    if (this.props.location.state) {
      return;
    }

    let id = this.props.match.params.id;
    console.log(prevProps)
    console.log(window.location.href)
    if (window.location.href.split("/").pop() === "blog") {
      if (this.state.activities !== null) {
        let activityNum = this.state.activities.length - 1;
        window.history.replaceState({}, "", `/blog/${this.state.activities[activityNum].id}`)
        this.changeActivity(activityNum, this.state.activities[activityNum]);
      }

      return;
    }

    console.log(id)
    console.log(this.state.activity_num)
    console.log(this.state.activities[this.state.activity_num])
    if (id !== undefined) {
      id = window.location.href.split("/").pop();
      if (parseInt(id) !== this.state.activities[this.state.activity_num].id) {
        console.log('gonna change')
        let activity_num = this.state.activities.findIndex(activity => activity.id === parseInt(id));
        this.changeActivity(activity_num, this.state.activities[activity_num])

        // this.setState({
        //   activity_num: )
        // })
      }
    }

    // maintain position of button on screen
    if (this.state.scrollId) {
      console.log('need to scroll')
      window.scrollTo(0,
        document.getElementById(this.state.scrollId).offsetTop -
        this.state.scrollOffset
      )

      this.setState({
        scrollId: null,
        scrollOffset: 0
      })
    }

    console.log('did update')
  }

  componentDidMount() {
    this.map.setTarget("map");
    this.getActivities();
  }

  getThumbs() {
    this.state.activities[this.state.activity_num].media.sort((a, b) => {
      return a.order_num - b.order_num;
    });

    return this.state.activities[this.state.activity_num].media.map((mediaDict) => {
      return (
        <div>
          <img alt="" src={mediaDict.small_image_url}/>
        </div>
      )}
    );
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
    console.log("TOGGLESHOWVIDEO")
    const showVideo = this.state;
    this.setState({
      showVideo: {
        ...showVideo,
        [url]: !showVideo[url]
      }
    });

    if (!showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    console.log("RENDERING");
    let width = -1;
    let gallery = document.getElementsByClassName('image-gallery-slides')[0];
    if (gallery) {
      width = gallery.offsetWidth;
    }
    return (
      <div>
        <div className='video-wrapper' style={{height: 0.75 * width}}>
          {/*<a*/}
          {/*  className='close-video'*/}
          {/*  onClick={this._toggleShowVideo.bind(this, item.embedUrl)}*/}
          {/*>*/}
          {/*</a>*/}
          <ReactHlsPlayer
            src={item.embedUrl}
            autoPlay={false}
            controls={true}
            style={{height: 0.75 * width}}
            // height="auto"
          />
        </div>
      </div>
    );
  }

  getMedia(activity) {
    // while (this.state.activities[this.state.activity_num].media === undefined);

    activity.media.sort((a, b) => {
      return a.order_num - b.order_num;
    });

    // console.log(this.state.activities[this.state.activity_num].media)


    // return activity.media.map((mediaDict) => {
    //   if (mediaDict.is_video) {
    //     return (
    //       <div>
    //         <ReactHlsPlayer
    //           src={mediaDict.video_url}
    //           autoPlay={false}
    //           controls={true}
    //           width="100%"
    //           height="auto"
    //         />
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <div>
    //         <img alt="" src={mediaDict.large_image_url}/>
    //       </div>
    //     )
    //   }
    // });
    let gallery = document.getElementsByClassName('image-gallery-slides')[0];
    let width = -1;
    if (gallery) {
      width = gallery.offsetWidth;
    }

    return activity.media.map((mediaDict) => {
      if (mediaDict.is_video) {
        return (
          {
            "original": mediaDict.large_image_url,
            "originalHeight": width === -1 ? '' : 0.75 * width,
            // "originalWidth": 2000,
            "embedUrl": mediaDict.video_url,
            "thumbnail": mediaDict.small_image_url,
            "renderItem": this._renderVideo.bind(this),
          }
        )
      } else {
        return (
          {
            "original": mediaDict.large_image_url,
            "originalHeight": width === -1 ? '' : 0.75 * width,
            // "originalWidth": '2048',
            "thumbnail": mediaDict.small_image_url
          }
        )
      }
    });
  }

  updatePage(e) {
    this.getActivity(parseInt(e.target.value), false);
  }

  // ensureActivityNum(id) {
  //   if (id !== undefined) {
  //     if (parseInt(id) !== this.state.activities[this.state.activity_num].id) {
  //       this.setState({
  //         activity_num: this.state.activities.findIndex(activity => activity.id === parseInt(id))
  //       })
  //     }
  //   }
  // }

  renderPrevNextButtons(id) {
    return (
      <div>
        <a
          style={{'all': 'initial'}}
          {...((this.state.activities && this.state.activity_num > 0) && {href:`/blog/${this.state.activities[this.state.activity_num - 1].id}`})}
          {...((this.state.activities && this.state.activity_num > 0) && {onClick:this.getPreviousActivity})}
        >
          <button id={id}
            type="button" disabled={!(this.state.activities && this.state.activity_num > 0)} style={{width: "auto", alignSelf: "inherit"}}>Previous</button>
        </a>
        <a
          style={{'all': 'initial'}}
          {...((this.state.activities && this.state.activity_num < this.state.activities.length - 1) && {href:`/blog/${this.state.activities[this.state.activity_num + 1].id}`})}
          {...((this.state.activities && this.state.activity_num < this.state.activities.length - 1) && {onClick:this.getNextActivity})}
        >
          <button id={id}
            type="button" disabled={!(this.state.activities && this.state.activity_num < this.state.activities.length - 1)} style={{width: "auto", alignSelf: "inherit"}}>Next</button>
        </a>
      </div>
    )
  }

  render() {
    console.log(this.props)
    // this.ensureActivityNum(this.props.match.params.id)

    return (
      <Main
        title={this.state.activities ? `Blog | ${this.state.activities[this.state.activity_num].name}` : 'Blog'}

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
          {this.state.activities &&
            <>
              <h3 data-testid="heading">{this.state.activities[this.state.activity_num].name} ({(this.state.activities[this.state.activity_num].distance / 1609.344).toFixed(1)} miles)</h3>
              <h4>{new Date(this.state.activities[this.state.activity_num].start_date * 1000).toDateString()}</h4>

              {this.renderPrevNextButtons('0')}

              <hr/>
              <div>
                {!this.state.media && <h3>Loading media...</h3>}
                {this.state.media && (
                  <ImageGallery
                    lazyLoad={true}
                    items={this.state.media}
                    showPlayButton={this.state.showPlayButton}
                    showGalleryPlayButton={this.state.showGalleryPlayButton}
                  />)}
              </div>
              <p style={{whiteSpace: "pre-wrap"}} >
                {<ReactMarkdown children={this.state.activities[this.state.activity_num].description}
                                // remarkPlugins={[remarkGfm]}
                                renderers={{link: LinkRenderer}}
                />}</p>
              <hr/>
            </>
          }

          {this.renderPrevNextButtons('1')}

          <p/>

          <div>
            <div className="planned-line"/> Planned Route<br/>
            <div className="ridden-line"/> Current Activity Route<br/>
          </div>

          <link href="https://openlayers.org/en/v6.14.1/css/ol.css" rel="stylesheet"/>
          <p/>
          <div id="map" className={this.state.isFullscreen ? "divFixedClass" : ""} style={
            {
              width: "100%",
              height: this.state.isFullscreen? "100vh" : "70vh"
            }
          }/>
          <hr/>
          {/*{this.state.activities && getStravaCode(this.state.activities[this.state.activity_num].id)}*/}
          <>
            <iframe id="strava-iframe" className="strava-iframe" frameBorder="0" allowTransparency="true" scrolling="no" />
            {this.state.activities &&
              <a target="_blank" rel="noopener noreferrer" class="button strava"
                 href={`https://www.strava.com/activities/${this.state.activities[this.state.activity_num].id}`}
              >
                <FontAwesomeIcon icon={faStrava} />
              </a>
            }
          </>

          {this.renderPrevNextButtons('2')}

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
        </article>
      </Main>
    );
  }
}

export default Blog;
