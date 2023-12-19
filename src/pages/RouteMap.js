/* eslint-disable */

import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { FullScreen, Zoom } from 'ol/control';

import Main from '../layouts/Main';
import { Vector as SourceVector, XYZ } from 'ol/source';
import { KML, Polyline } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Vector } from 'ol/layer';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import { Link } from 'react-router-dom';
import { fetchBackend } from '../FetchConfig';
import { defaults, DragRotateAndZoom, PinchRotate } from 'ol/interaction';

import '../main.css';
import {
  ToggleBikeOverlayControl,
  ToggleFullscreenControl,
  ToggleSatelliteControl
} from '../components/Map/controls';
import { iOS } from '../App';
import { extend } from 'ol/extent';
import VectorImageLayer from 'ol/layer/VectorImage';
import DblClickDragZoom from '../DblClickDragZoom';


const OSMSource = new XYZ({
  url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga',
  maxZoom: 22
});

const satelliteSource = new XYZ({
  url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
  maxZoom: 19
});

function getTimedelta(recordedTime) {
  var msec = (new Date().getTime()) - recordedTime;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return [hh, mm, ss, msec]
}

async function getKMLStartCoordinates(kmlFilename) {
  const response = await fetchBackend(`/static/kmls/${kmlFilename}`);
  const kmlData = await response.text();

  const parser = new DOMParser();
  const kmlDocument = parser.parseFromString(kmlData, 'text/xml');

  const placemarkElement = kmlDocument.querySelector('Placemark');
  if (!placemarkElement) {
    console.log('Returning 1')
    return null;
  }

  const coordinatesElement = placemarkElement.querySelector('coordinates');
  if (!coordinatesElement) {
    console.log('Returning 3')
    return null;
  }

  const coordinatesString = coordinatesElement.textContent;
  // console.log(coordinatesString)
  let coordinatesArray = coordinatesString.split('\n');
  if (coordinatesArray.length === 1) {
    coordinatesArray = coordinatesString.split(' ');
  }
  coordinatesArray = coordinatesArray.map(e => e.trim());
  const start_coordinates = coordinatesArray[1].split(',').slice(0, 2);
  let end_coordinates = coordinatesArray[coordinatesArray.length - 2].split(',').slice(0, 2);
  if (start_coordinates[0] === end_coordinates[0] && start_coordinates[1] === end_coordinates[1]) {
    console.log('same')
    end_coordinates = coordinatesArray[coordinatesArray.length - 10].split(',').slice(0, 2);
  }

  // console.log([start_coordinates, end_coordinates])

  return [start_coordinates, end_coordinates];
}


class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // console.log(props.match.params.ride_name)
    this.state = {
      locationUrl: null,
      isGoogle: true,
      activities: null,
      total_distance: 0.0,
      total_elevation_gain: 0.0,
      total_moving_time: Infinity,
      isSatellite: false,
      isFullscreen: false
    };

    this.route = new VectorImageLayer({
      source: new VectorSource({
        url: process.env.REACT_APP_BACKEND_API_BASE_URL + `/static/kmls/${this.props.ride.codename}.kml`,
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

    this.currentLocation = new Vector({
      source: new SourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([-81.797505, 24.546543]))
          })
        ]
      }),
      zIndex: 999
    });

    this.iconStyle = new Style({
      image: new Icon({
        src: '/images/profile_pin.png',
        scale: 0.4
      }),
    });

    this.campingIconStyle = new Style({
      image: new Icon({
        src: 'https://cdn1.iconfinder.com/data/icons/set-4/76/tent-512.png',
        scale: 0.1,
      }),
    });
    const campingIconStyleReference = this.campingIconStyle;

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

    this.startLayer =  new Vector({
      source: new SourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([0., 0.]))
          })
        ]
      }),
      style: this.startIconStyle,
      zIndex: 3,
      opacity: 0
    });
    this.endLayer =  new Vector({
      source: new SourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([0., 0.]))
          })
        ]
      }),
      style: this.endIconStyle,
      zIndex: 3,
      opacity: 0
    });

    const p = this.props
    const startLayer = this.startLayer;
    const endLayer = this.endLayer;
    async function addStartEnd() {
      const start_end = await getKMLStartCoordinates(`${p.ride.codename}.kml`);
      console.log(startLayer.getSource().getFeatures()[0])
      startLayer.getSource().getFeatures()[0].setGeometry(new Point(fromLonLat(start_end[0])));
      startLayer.setOpacity(1);
      endLayer.getSource().getFeatures()[0].setGeometry(new Point(fromLonLat(start_end[1])));
      endLayer.setOpacity(1);
    }
    addStartEnd();

    this.riddenRouteVector = new VectorLayer({
      name: "riddenRouteVector",
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
    this.endPointVector = new Vector({
      source: new SourceVector({
        features: []
      }),
      style: this.campingIconStyle,
      zIndex: 2
    });

    this.backgroundLayer = new TileLayer({
      source: OSMSource,
      zIndex: 0
    })

    this.toggleSatellite = this.toggleSatellite.bind(this);
    this.toggleBikeOverlay = this.toggleBikeOverlay.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);

    this.map = new Map({
      layers: [
        this.backgroundLayer,
        this.route,
        this.currentLocation,
        this.startLayer,
        this.endLayer,
        this.riddenRouteVector,
        this.endPointVector
      ],
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
      ]),
      // moveTolerance: 10
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

    // console.log(p)
    this.map.addEventListener("click", function(e) {
      this.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (feature.get("activity") === undefined) {
          return;
        }

        p.history.push({
          pathname: `blog`,
          state: {activity_num: feature.get("activity_num")}
        });
      });
    });

    let map = this.map;
    this.map.addEventListener("pointermove", function(e) {
      map.getLayers().forEach(layer => {
        if (layer.get("name") === "riddenRouteVector") {
          layer.getSource().getFeatures().forEach(feature => feature.setStyle())
        }
      });

      let foundOne = false;
      this.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (feature.get("activity") === undefined || foundOne) {
          return;
        }

        foundOne = true;
        const style = new Style({
          stroke: new Stroke({
            width: 8,
            color: 'blue',
          }),
        });
        feature.setStyle(style);
      });
    });

    this.map.addEventListener("postrender", function () {
      const zoom = this.getView().getZoom();
      campingIconStyleReference.getImage().setScale(Math.min(0.1, (zoom / 20) ** 2.5));
    });
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

  updateLocation(jsonOutput, refreshingLocation) {
    this.setState(
      {
        "locationUrl": jsonOutput.url,
        "isGoogle": jsonOutput.is_google,
      });
    const refreshingLocationStr = refreshingLocation ? '\nAttempting to refresh location...' : '';

    var timedelta = getTimedelta(jsonOutput.recorded_time);
    this.iconStyle.setText(
      new Text({
        backgroundFill: new Fill({ color: "white" }),
        offsetY: -70,
        // padding: [0, 0, 0, 1000],
        text: `${timedelta[0]}h, ${timedelta[1]}m, ${timedelta[2]}s ago${refreshingLocationStr}`}));

    var pointFeature = new Feature({
      geometry: new Point(fromLonLat([jsonOutput.lon, jsonOutput.lat]))
    })
    pointFeature.setStyle(this.iconStyle);

    this.currentLocation.getSource().clear();
    this.currentLocation.getSource().addFeature(
      pointFeature
    );

    // TODO uncomment if during trip
    // this.map.setView(
    //   new View({
    //     center: fromLonLat([jsonOutput.lon, jsonOutput.lat]),
    //     zoom: 10
    //   })
    // );
  }

  getLocationFeature() {
    fetchBackend('/location?do_refresh=False')
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
        this.updateLocation(jsonOutput, true);
        console.log('Location got');
        fetchBackend('/location?do_refresh=True')
          .then(
            response => {
              if (response.status !== 200) {
                return null;
              }
              return response.json()
            }
          )
          .then(jsonOutput1 => {
            if (jsonOutput1 !== null) {
              this.updateLocation(jsonOutput1, false);
              console.log('Location refreshed');
            } else {
              this.updateLocation(jsonOutput, false);
              console.log('Location kept same');
            }
            // this.toggleFullscreen();
          });
      })
  }

  componentDidMount() {
    this.map.setTarget("map");
    this.getLocationFeature();
    this.getActivities();

  }

  putRiddenRoute() {
    const riddenRouteFeatures = [];
    const endPointFeatures = [];

    var extent = null;

    this.state.activities.map((activity, index) => {
      const riddenRoute = new Polyline({
        factor: 1e5,
      }).readGeometry(activity.summary_polyline, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      });
      const routeFeature = new Feature({
        type: 'route',
        geometry: riddenRoute,
        activity: activity,
        activity_num: index
      });

      if (extent) {
        extend(extent, riddenRoute.getExtent());
      } else {
        extent = riddenRoute.getExtent();
      }

      if (activity.name.startsWith("Day ")) {
        const endPoint = new Feature({
          geometry: new Point(fromLonLat(JSON.parse(activity.end_latlng)
            .reverse()))
        });
        endPointFeatures.push(endPoint);
      }

      riddenRouteFeatures.push(routeFeature);
    });

    this.riddenRouteVector.getSource().addFeatures(riddenRouteFeatures);
    this.endPointVector.getSource().addFeatures(endPointFeatures);

    this.map.getView().fit(extent);
    this.map.getView().setZoom(this.map.getView().getZoom() - 0.5);
  }

  getActivities() {
    fetchBackend(`/strava?get_all=True&get_summary_polyline=True&ride_codename=${this.props.ride.codename}`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
        this.setState(
          {
            activities: jsonOutput,
            total_distance: jsonOutput.reduce((acc, activity) => {
                if (!activity.name.includes("Hike")) {
                  return acc + activity.distance;
                }
                return acc;
            }, 0),
            total_elevation_gain: jsonOutput.reduce((acc, activity) => {
              if (!activity.name.includes("Hike")) {
                return acc + activity.total_elevation_gain;
              }
              return acc;
            }, 0),
            total_moving_time: jsonOutput.reduce((acc, activity) => {
              if (!activity.name.includes("Hike")) {
                return acc + activity.moving_time.split(':').reduce((acc,time) => (60 * acc) + +time);
              }
              return acc;
            }, 0)
          });
          this.putRiddenRoute()
        }
      )
  }

  render() {
    return (
      <Main
        title={`Route Map | ${this.props.ride.title}`}
      >
        <article className="post" id="routeMap">
          <header style={{flexDirection: 'column', paddingTop: '0.75em'}}>
            <div className='rides-back-link'>
              <a
                href={'/rides'}
              >
                <div>&#x25C0; Rides</div>
              </a>
            </div>
            <div className="title" style={{paddingBottom: 0}}>
              <div>
                <Link to={`/rides/${this.props.ride.codename}/route-map`}>
                  <p data-testid="heading">Route Map</p>
                  <h2 style={{textTransform: 'unset'}}>{this.props.ride.title}</h2>
                </Link>
              </div>
            </div>
          </header>

          {/* <header> */}
          {/*   <div className="title" style={{paddingBottom: 0}}> */}
          {/*     <Link to={`/rides/${this.props.ride.codename}/route-map`}> */}
          {/*       <p data-testid="heading">Route Map</p> */}
          {/*       <h2 style={{textTransform: 'unset'}}>{this.props.ride.title}</h2> */}
          {/*     </Link> */}
          {/*   </div> */}
          {/* </header> */}

          <p>Rode {parseFloat((this.state.total_distance / 1609.344).toFixed(1)).toLocaleString()}mi | Total Elevation Gain: {parseFloat((this.state.total_elevation_gain * 3.28084).toFixed(0)).toLocaleString()}ft | Average Speed: {parseFloat((this.state.total_distance / 1609.344 * 3600 / this.state.total_moving_time).toFixed(1)).toLocaleString()}mph</p>

          {this.props.ride.codename === 'florida-to-alaska' &&
            <Link to="/fundraiser" className="button" style={{marginLeft: 0}}>
            <div style={{ color: '#FF0000'}}>fundraiser</div>
          </Link>}
          {this.props.ride.codename === 'florida-to-alaska' && '\u00A0'}
          <Link to={`/rides/${this.props.ride.codename}/blog`} className="button"
                style={{marginLeft: this.props.ride.codename !== 'florida-to-alaska'? 0: 'inherit'}}>
            Trip Blog
          </Link>
          {/*&nbsp;*/}
          {/*<Link to="/instagram" className="button">Instagram updates</Link>*/}

          <div>
            <div className="planned-line"/> Planned Route<br/>
            <div className="ridden-line"/> Ridden Route (click on a section to go to the blog for that day)
          </div>
          {/*<button onClick={this.toggleSatellite}>{this.state.isSatellite ? "Toggle OSM Map" : "Toggle Satellite Map"}</button>*/}
          <link href="https://openlayers.org/en/v6.14.1/css/ol.css" rel="stylesheet"/>
          <p/>
          <div id="map" className={this.state.isFullscreen ? "divFixedClass" : ""} style={
            {
              width: "100%",
              height: this.state.isFullscreen? "100vh" : "70vh"
            }
          }/>

          {/* {this.state.locationUrl && <a href={this.state.locationUrl} style={{marginRight: "5px", marginBottom: "5px"}} className="button" target="_blank">{this.state.isGoogle ? "Link to Google Location Share": "Open location in Google"}</a>} */}
          {/* <a href="https://www.google.com/maps/d/u/0/edit?mid=1CedznJnm9DqhWFhgzZhqAGDnS25jWjE&usp=sharing" style={{marginRight: "5px", marginBottom: "5px"}} className="button" target="_blank">Link to Google Maps Route</a> */}
        </article>
      </Main>
    )
  }
}

export default RouteMap;
