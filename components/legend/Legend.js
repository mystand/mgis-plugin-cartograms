import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import styles from './legend.styl'
import { currentCartogramSelector } from '../../selectors'

const Legend = (props) => {
  const { currentCartogram } = props
  if (currentCartogram === null) return null

  return (
    <div className={ styles.root }>
      <div> Legend: { currentCartogram.name } </div>
      <div> { currentCartogram.layer }  </div>
      <div> { currentCartogram.property }  </div>
      <div>
        {
          currentCartogram.colorStops.map(({ color, value }) => (
            <div key={ value }> {value} - {color} </div>
          ))
        }
      </div>
    </div>
  )
}

Legend.propTypes = {
  currentCartogram: PropTypes.shape({
    name: PropTypes.string
  })
}

export default connect(createSelector(
  currentCartogramSelector,
  currentCartogram => ({ currentCartogram })
))(Legend)
