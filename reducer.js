import { CARTOGRAM_SET_DONE, CARTOGRAM_CLEAR } from './actions'

const defaultState = {
  enabledCartogramIndex: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
  case CARTOGRAM_SET_DONE: {
    const { index } = action
    return { ...state, enabledCartogramIndex: index }
  }

  case CARTOGRAM_CLEAR: {
    return { ...state, enabledCartogramIndex: null }
  }

  default:
    return state
  }
}
