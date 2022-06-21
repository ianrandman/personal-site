/* eslint-disable */

import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Zoom } from 'ol/control';

import Main from '../layouts/Main';
import { Vector as SourceVector, XYZ } from 'ol/source';
import { KML } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Vector } from 'ol/layer';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Style, Text } from 'ol/style';
import { Link } from 'react-router-dom';
import { fetchBackend } from '../FetchConfig';

// var mapp = new Map({
//   view: new View({
//     center: [0, 0],
//     zoom: 1
//   }),
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   target: 'mapp'
// });

var route = new VectorLayer({
  source: new VectorSource({
    url: '/Florida_to_Alaska.kml',
    format: new KML(),
  }),
});

var currentLocation = new Vector({
  source: new SourceVector({
    features: [
      new Feature({
        geometry: new Point(fromLonLat([-81.797505, 24.546543]))
      })
    ]
  })
});

const iconStyle = new Style({
  image: new Icon({
    // anchor: [0.5, 46],
    // anchorXUnits: 'fraction',
    // anchorYUnits: 'pixels',
    src: '/images/me_small.jpg',
  }),
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
    };

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        route,
        currentLocation
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      controls: [
        new Zoom()
      ],
    });
    // map.addLayer(route);
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
            response => response.json()
          )
          .then(jsonOutput => {
            this.updateLocation(jsonOutput, false);
            console.log('Location refreshed');
          })
      })
  }

  componentDidMount() {
    this.map.setTarget("map");
    this.getLocationFeature();
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
        {this.state.locationUrl && <a href={this.state.locationUrl} target="_blank">Link to Location Share</a>}
        <link href="https://openlayers.org/en/v6.14.1/css/ol.css" rel="stylesheet"/>
        <div id="map" style={{width: "100%", height: "500px"}}/>
      </Main>
    )
  }
}

// const RouteMap = () => (
//   <Main
//     title="RouteMap"
//     // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
//   >
//     { mapp }
//   </Main>
// );

// const RouteMap = ({ children }) => {
//   const mapRef = useRef();
//   const [map, setMap] = useState(null);
//   const [mapReady, setMapReady] = useState(false);
//
//   useEffect(() => {
//     const zoom = 7;
//     const center = [0, 0];
//     const options = {
//       view: new View({ zoom, center }),
//       layers: [],
//       controls: [],
//       overlays: [],
//     };
//     const mapObject = new Map(options);
//
//     mapObject.setTarget(mapRef.current);
//     setMap(mapObject);
//     mapObject.on('rendercomplete', () => setMapReady(true));
//
//     return () => mapObject.setTarget(undefined);
//   }, []);
//
//   return (
//     <Main>
//       <StyledDiv innerRef={mapRef}>
//         {mapReady && children}
//       </StyledDiv>
//     </Main>
//   );
// };

export default RouteMap;
