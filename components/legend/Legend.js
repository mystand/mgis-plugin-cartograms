import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import R from 'ramda'

import styles from './legend.styl'
import { currentCartogramSelector } from '../../selectors'

const Legend = (props) => {
  const { currentCartogram, layer } = props
  if (currentCartogram === null) return null

  const propertyDefinition = layer.attributes[currentCartogram.property]
  const units = propertyDefinition.units
  const colorStops = R.sortBy(({ value }) => value, currentCartogram.colorStops)

  return (
    <div className={ styles.root }>
      <div className={ styles.name }>
        { R.isNil(propertyDefinition) ? 'Поле не найдено' : propertyDefinition.label }
        { units && <span className={ styles.units }> ({ propertyDefinition.units })</span> }
      </div>
      <ul className={ styles.colors }>
        {
          colorStops.map(({ color, value }, index) => {
            let label
            if (index === 0) {
              label = `< ${colorStops[index + 1].value}`
            } else if (index === colorStops.length - 1) {
              label = `> ${colorStops[index].value}`
            } else {
              label = `${colorStops[index].value} — ${colorStops[index + 1].value}`
            }

            return (
              <li key={ value }>
                <div className={ styles.color } style={ { backgroundColor: color } } />
                { label }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

Legend.propTypes = {
  currentCartogram: PropTypes.shape({
    name: PropTypes.string
  }),
  layer: PropTypes.shape({
    key: PropTypes.string
  })
}

export default connect(createSelector(
  currentCartogramSelector,
  state => state.layers,
  (currentCartogram, layers) => ({
    currentCartogram,
    layer: R.isNil(currentCartogram) ? null : layers[currentCartogram.layer]
  })
))(Legend)
