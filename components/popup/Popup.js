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
  const { cartogramFeatures, otherFeatures } = R.groupBy((feature) => {
    return feature.properties.layer_key === currentCartogram.layer ? 'cartogramFeatures' : 'otherFeatures'
  }, features)

  return (
    <div className={ styles.root }>
      <div className={ styles.header }> Объекты картограммы </div>
      <ul>
        {
          cartogramFeatures.map((feature) => {
            const value = feature.properties[currentCartogram.property]
            const onClick = () => push(`/${feature.properties.layer_key}/${feature.id}`)
            sum += value

            return (
              <li key={ feature.id } className={ styles.featureListItem } onClick={ onClick }>
                {feature.properties.name}: <b>{R.isNil(value) ? 'Нет данных' : value}</b>
              </li>
            )
          })
        }
        { (features.length > 1) && <li>Всего: <b>{sum}</b></li> }
      </ul>

      <div className={ styles.header }> Остальные объекты </div>
      <ul>
        {
          otherFeatures.map((feature) => {
            const onClick = () => push(`/${feature.properties.layer_key}/${feature.id}`)
            return (
              <li key={ feature.id } className={ styles.featureListItem } onClick={ onClick }>
                {feature.properties.name}
              </li>
            )
          })
        }
      </ul>
    </div>
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
