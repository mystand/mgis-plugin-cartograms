export const CARTOGRAM_SET_PREPARATION = 'CARTOGRAM_SET_PREPARATION'
export const CARTOGRAM_SET_DONE = 'CARTOGRAM_SET_DONE'
export const CARTOGRAM_CLEAR = 'CARTOGRAM_CLEAR'

export const setCartogramPreparation = index => ({
  type: CARTOGRAM_SET_PREPARATION,
  index
})

export const setCartogramDone = index => ({
  type: CARTOGRAM_SET_DONE,
  index
})

export const clearCartogram = () => ({
  type: CARTOGRAM_CLEAR
})
