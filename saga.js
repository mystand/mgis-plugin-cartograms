import R from 'ramda'
import { takeEvery } from 'redux-saga'
import { select, put } from 'redux-saga/effects'
import { getMap } from 'core/frontend/plugin/api'
import { MAP_LOADED } from 'core/frontend/client/map/map-actions'
import * as MapHelper from 'core/frontend/helpers/map-helper'

import { setCartogramDone, CARTOGRAM_SET_PREPARATION, CARTOGRAM_CLEAR } from './actions'
import { buildCartogramLayerId, buildMapboxLayers } from './utils'
import Popup from './components/popup/Popup'

const MAP_MODE_CARTOGRAMS = 'cartograms'
const MAP_MODE_DEFAULT = 'default'
const POPUP_KEY = 'cartograms'

function* cartogramSet(action) {
  const map = getMap()
  const { index } = action
  const currentCartogramIndex = yield select(state => state.plugins.cartograms.enabledCartogramIndex)
  map.pushMode(MAP_MODE_CARTOGRAMS)
  if (!R.isNil(currentCartogramIndex)) {
    map.setLayoutProperty(buildCartogramLayerId(currentCartogramIndex), 'visibility', 'none')
  }
  map.setLayoutProperty(buildCartogramLayerId(index), 'visibility', 'visible')
  yield put(setCartogramDone(index))
}

function* cartogramClear() {
  const map = getMap()
  const config = yield select(state => state.pluginConfigs.cartograms)

  map.popMode(MAP_MODE_CARTOGRAMS)
  map.removePopup(POPUP_KEY)
  for (let i = 0; i < config.items.length; i += 1) {
    map.setLayoutProperty(buildCartogramLayerId(i), 'visibility', 'none')
  }
  map.pushMode(MAP_MODE_DEFAULT)
}

function onMapClick(e) {
  const map = e.target
  if (map.getMode() !== MAP_MODE_CARTOGRAMS) return

  map.removePopup(POPUP_KEY)
  const featureIds = MapHelper.queryRenderedFeatureIds(map, e.point)
  if (featureIds.length > 0) map.addPopup(POPUP_KEY, e.lngLat, Popup, { featureIds })
}

function* initializeLayers() {
  const map = getMap()
  const { layers, config } = yield select(state => ({
    layers: state.layers,
    config: state.pluginConfigs.cartograms
  }))

  const firstPolygonLayer = map.getStyle().layers.find(x => x.type === 'fill') || {}
  buildMapboxLayers(layers, config).forEach(layer => map.addLayer(layer, firstPolygonLayer.id))
  map.on('click', onMapClick)
}

export default function* saga() {
  yield [
    takeEvery(CARTOGRAM_SET_PREPARATION, cartogramSet),
    takeEvery(CARTOGRAM_CLEAR, cartogramClear),
    takeEvery(MAP_LOADED, initializeLayers)
  ]
}
