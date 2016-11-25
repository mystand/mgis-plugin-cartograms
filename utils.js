const CARTOGRAM_LAYER_PREFIX = 'cartogram-layer'

export function buildCartogramLayerId(index) {
  return `${CARTOGRAM_LAYER_PREFIX}-${index}`
}

function buildStops(stopsConfig) {
  return stopsConfig.map(({ color, value }) => [value, color])
}

export function buildMapboxLayers(layers, config) {
  return config.items.map((item, index) => {
    const layer = layers[item.layer]

    switch (layer.geometry_type) {

    case 'point': {
      return {
        id: buildCartogramLayerId(index),
        source: item.layer,
        type: 'circle',
        interactive: true,
        layout: { visibility: 'none' },
        paint: {
          'circle-radius': 19,
          'circle-color': {
            property: item.property,
            stops: buildStops(item.colorStops),
            type: 'interval'
          }
        }
      }
    }

    case 'line': {
      return {
        id: buildCartogramLayerId(index),
        type: 'line',
        source: item.layer,
        layout: { visibility: 'none' },
        paint: {
          'line-width': 4,
          'line-color': {
            property: item.property,
            stops: buildStops(item.colorStops),
            type: 'interval'
          }
        }
      }
    }

    case 'polygon': {
      return {
        id: buildCartogramLayerId(index),
        type: 'fill',
        source: item.layer,
        interactive: true,
        layout: { visibility: 'none' },
        paint: {
          'fill-opacity': 0.5,
          'fill-color': {
            property: item.property,
            stops: buildStops(item.colorStops),
            type: 'interval'
          }
        }
      }
    }

    default:
      throw new Error(`Unexpected layer geometry type: ${layer.geometry_type}`)
    }
  })
}
