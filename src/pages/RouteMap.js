/* eslint-disable */

import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Zoom } from 'ol/control';

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
import { decodeDeltas } from 'ol/format/Polyline';

var route = new VectorLayer({
  source: new VectorSource({
    url: '/Florida_to_Alaska.kml',
    format: new KML(),
  }),
});

const currentLocation = new Vector({
  source: new SourceVector({
    features: [
      new Feature({
        geometry: new Point(fromLonLat([-81.797505, 24.546543]))
      })
    ]
  }),
  zIndex: 999
});

const iconStyle = new Style({
  image: new Icon({
    src: '/images/me_small.jpg',
  }),
});

const campingIconStyle = new Style({
  image: new Icon({
    src: 'https://cdn1.iconfinder.com/data/icons/set-4/76/tent-512.png',
    scale: 0.1,
  }),
});

const startIconStyle = new Style({
  image: new Icon({
    src: 'https://cdn1.iconfinder.com/data/icons/flat-design-basic-set-5/24/flag-green-rally-512.png',
    scale: 0.08,
  }),
});

const endIconStyle = new Style({
  image: new Icon({
    src: 'https://cdn1.iconfinder.com/data/icons/flat-design-basic-set-5/24/flag-red-rally-512.png',
    scale: 0.08,
  }),
});

const startLayer = new Vector({
  source: new SourceVector({
    features: [
      new Feature({
        geometry: new Point(fromLonLat([-81.75524527287685, 24.553091926438324]))
      })
    ]
  }),
  style: startIconStyle,
  zIndex: 2
})

const endLayer = new Vector({
  source: new SourceVector({
    features: [
      new Feature({
        geometry: new Point(fromLonLat([-148.392288, 70.242893]))
      })
    ]
  }),
  style: endIconStyle,
  zIndex: 2
})

const riddenRouteVector = new VectorLayer({
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
const endPointVector = new Vector({
  source: new SourceVector({
    features: []
  }),
  style: campingIconStyle,
  zIndex: 2
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
    console.log("hi");
    this.state = {
      locationUrl: null,
      activities: null
    };

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          },
            ),
          zIndex: 0
        }),
        route,
        currentLocation,
        startLayer,
        endLayer,
        riddenRouteVector,
        endPointVector
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      controls: [
        new Zoom()
      ],
    });

    console.log(this)
    const p = this.props;
    // const router = this.context.router;
    this.map.addEventListener("click", function(e) {
      // console.log(this)
      this.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (feature.get("activity") === undefined) {
          return;
        }

        // const activity = feature.get("activity");
        // router.push({
        //   pathname: '/blog',
        //   state: {activity_num: 2}
        // })
        p.history.push({
          pathname: '/blog',
          state: {activity_num: feature.get("activity_num")}
        });

        // console.log(layer);
        //do something
      });
    });

    let selected = null;
    this.map.addEventListener("pointermove", function(e) {
      if (selected !== null) {
        console.log(selected)
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
      console.log(this.getView().getZoom())
      const zoom = this.getView().getZoom();
      if (zoom >= 7) {
        endPointVector.setVisible(true);
      }
      else {
        endPointVector.setVisible(false);
      }
    });
  }

  updateLocation(jsonOutput, refreshingLocation) {
    console.log(jsonOutput.lat);
    console.log(jsonOutput.lon);
    console.log(jsonOutput.recorded_time);
    this.setState(
      {
        "locationUrl": jsonOutput.url,
      });
    const refreshingLocationStr = refreshingLocation ? '\nAttempting to refresh location...' : '';

    var timedelta = getTimedelta(jsonOutput.recorded_time);
    iconStyle.setText(
      new Text({
        backgroundFill: new Fill({ color: "white" }),
        offsetY: 20,
        // padding: [0, 0, 0, 1000],
        text: `${timedelta[0]}h, ${timedelta[1]}m, ${timedelta[2]}s ago${refreshingLocationStr}`}));

    var pointFeature = new Feature({
      geometry: new Point(fromLonLat([jsonOutput.lon, jsonOutput.lat]))
    })
    pointFeature.setStyle(iconStyle);

    currentLocation.getSource().clear();
    currentLocation.getSource().addFeature(
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
      console.log('gonna decode')

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

      console.log(JSON.parse(activity.end_latlng))

      const endPoint = new Feature({
        geometry: new Point(fromLonLat(JSON.parse(activity.end_latlng).reverse()))
      });

      // routeFeature.on('click', function (e) {
      //   console.log('hello');
      // });

      riddenRouteFeatures.push(routeFeature);
      endPointFeatures.push(endPoint);
    });

    riddenRouteVector.getSource().addFeatures(riddenRouteFeatures);
    endPointVector.getSource().addFeatures(endPointFeatures);

    // this.map.addLayer(vectorLayer);
    // this.map.addLayer(endPointVector);

    // console.log(allPolylines)
  }

  getActivities() {
    fetchBackend(`/strava`)
      .then(
        response => response.json()
      )
      .then(jsonOutput => {
          this.setState({activities: jsonOutput});
          this.putRiddenRoute()
          console.log(this.state.activities);
        }
      )
  }

  render() {
    return (
      <Main
        title="RouteMap"
      >
        <header>
          <div className="title">
            <h2 data-testid="heading"><Link to="/routeMap">Route Map</Link></h2>
          </div>
        </header>
        {this.state.locationUrl && <a href={this.state.locationUrl} className="button" target="_blank">Link to Google Location Share</a>}
        <p>Red is the planned route. Blue is the ridden route. Click on a blue section to see the blog for that day.</p>
        <link href="https://openlayers.org/en/v6.14.1/css/ol.css" rel="stylesheet"/>
        <div id="map" style={{width: "100%", height: "500px"}}/>
      </Main>
    )
  }
}

export default RouteMap;
