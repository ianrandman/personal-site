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
import { PinchRotate } from 'ol/interaction';

import '../main.css';
import {
  ToggleFullscreenControl,
  ToggleSatelliteControl
} from '../components/Map/controls';
import { iOS } from '../App';

const route = new VectorLayer({
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
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
});

const satelliteSource = new XYZ({
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  maxZoom: 20
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


class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationUrl: null,
      isGoogle: true,
      activities: null,
      isSatellite: false,
      isFullscreen: false
    };

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

    this.startLayer = new Vector({
      source: new SourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([-81.75524527287685, 24.553091926438324]))
          })
        ]
      }),
      style: this.startIconStyle,
      zIndex: 2
    })

    this.endLayer = new Vector({
      source: new SourceVector({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([-148.392288, 70.242893]))
          })
        ]
      }),
      style: this.endIconStyle,
      zIndex: 2
    })

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
    this.toggleFullscreen = this.toggleFullscreen.bind(this);

    this.map = new Map({
      layers: [
        this.backgroundLayer,
        route,
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
      }),
      controls: [
        new Zoom(),
        new ToggleSatelliteControl({"parentFn": this.toggleSatellite}),
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

    const p = this.props;
    this.map.addEventListener("click", function(e) {
      this.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (feature.get("activity") === undefined) {
          return;
        }

        p.history.push({
          pathname: '/blog',
          state: {activity_num: feature.get("activity_num")}
        });
      });
    });

    let selected = null;
    this.map.addEventListener("pointermove", function(e) {
      if (selected !== null) {
        selected.setStyle(undefined);
        selected = null;
      }

      this.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (feature.get("activity") === undefined) {
          return;
        }

        selected = feature;
        const style = new Style({
          stroke: new Stroke({
            width: 8,
            color: 'blue',
          }),
        });
        feature.setStyle(style);
      });
    });

    this.map.addEventListener("moveend", function () {
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

    this.map.setView(
      new View({
        center: fromLonLat([jsonOutput.lon, jsonOutput.lat]),
        zoom: 10
      })
    )
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
              console.log(response.status)
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
  }

  getActivities() {
    fetchBackend(`/strava?get_all=True&get_summary_polyline=True`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
          this.setState({activities: jsonOutput});
          this.putRiddenRoute()
        }
      )
  }

  render() {
    return (
      <Main
        title="RouteMap"
      >
        <article className="post" id="routeMap">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/routeMap">Route Map</Link></h2>
            </div>
          </header>
          <Link to="/fundraiser" className="button"><div style={{ color: '#FF0000' }}>fundraiser</div></Link>
          &nbsp;
          <Link to="/blog" className="button">blog</Link>
          &nbsp;
          <Link to="/instagram" className="button">Instagram updates</Link>

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

          {this.state.locationUrl && <a href={this.state.locationUrl} style={{marginRight: "5px", marginBottom: "5px"}} className="button" target="_blank">{this.state.isGoogle ? "Link to Google Location Share": "Open location in Google"}</a>}
          <a href="https://www.google.com/maps/d/u/0/edit?mid=1CedznJnm9DqhWFhgzZhqAGDnS25jWjE&usp=sharing" style={{marginRight: "5px", marginBottom: "5px"}} className="button" target="_blank">Link to Google Maps Route</a>
        </article>
      </Main>
    )
  }
}

export default RouteMap;
