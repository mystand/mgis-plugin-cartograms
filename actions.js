export const CARTOGRAM_SET = 'CARTOGRAM_SET'
export const CARTOGRAM_CLEAR = 'CARTOGRAM_CLEAR'

export const setCartogram = index => ({
  type: CARTOGRAM_SET,
  index
})

export const clearCartogram = () => ({
  type: CARTOGRAM_CLEAR
})
