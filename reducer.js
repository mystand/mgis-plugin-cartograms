import { MAP_REMOVED } from 'core/frontend/client/map/map-actions'

import { CARTOGRAM_SET_DONE, CARTOGRAM_CLEAR } from './actions'

const defaultState = {
  enabledCartogramIndex: null
}

function clearCartogram(state) {
  return { ...state, enabledCartogramIndex: null }
}

export default function (state = defaultState, action) {
  switch (action.type) {
  case CARTOGRAM_SET_DONE: {
    const { index } = action
    return { ...state, enabledCartogramIndex: index }
  }

  case CARTOGRAM_CLEAR: {
    return clearCartogram(state)
  }

  case MAP_REMOVED: {
    return clearCartogram(state)
  }

  default:
    return state
  }
}
