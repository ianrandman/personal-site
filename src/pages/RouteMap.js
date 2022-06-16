/* eslint-disable */

import React from 'react';
import { Map, Controls, loadDataLayer } from '@bayer/ol-kit'


import Main from '../layouts/Main';

window.onresize = function()
{
  setTimeout( function() { map.updateSize();}, 200);
}

const onMapInit = async map => {
  // nice to have map set on the window while debugging
  window.map = map
  // find a geojson or kml dataset (url or file) to load on the map
  const data = {
    url: 'http://localhost:5000/route',
    id: 'route_kml',
    name: 'Route KML'
  }
  const dataLayer = await loadDataLayer(map, data.url)

  // set the title and id on the layer to show in LayerPanel
  dataLayer.set('title', data.name)
  dataLayer.set('id', data.name)
}

const RouteMap = () => (
  <Main
    title="RouteMap"
    // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
  >
    <Map onMapInit={onMapInit}>
      <Controls />
    </Map>
  </Main>
);

export default RouteMap;
