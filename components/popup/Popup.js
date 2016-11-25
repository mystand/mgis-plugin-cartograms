import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import { createSelector } from 'reselect'
import { push as pushActionCreator } from 'react-router-redux-params'
import { bindActionCreators } from 'redux'

import { currentCartogramSelector } from '../../selectors'
import styles from './popup.styl'

const Popup = (props) => {
  const { features, currentCartogram, push } = props
  let sum = 0 // считаем внутри map вместо R.reduce чтобы не бегать по массиву 2 раза

  return (
    <ul className={ styles.root }>
      {
        features.map((feature) => {
          const value = feature.properties[currentCartogram.property]
          const onClick = () => push(`/${feature.properties.layer_key}/${feature.id}`)
          sum += value

          return (
            <li key={ feature.id } className={ styles.featureListItem } onClick={ onClick }>
              {feature.properties.name}: <b>{value}</b>
            </li>
          )
        })
      }
      { (features.length > 1) && <li>Всего: <b>{sum}</b></li> }
    </ul>
  )
}

Popup.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    properties: PropTypes.object
  })),
  currentCartogram: PropTypes.shape({
    name: PropTypes.string
  }),
  push: PropTypes.func.isRequired
}

export default connect(createSelector(
  currentCartogramSelector,
  (state, props) => R.props(props.featureIds, state.features),
  (currentCartogram, features) => ({
    currentCartogram,
    features
  })
), dispatch => ({
  push: bindActionCreators(pushActionCreator, dispatch)
}))(Popup)
