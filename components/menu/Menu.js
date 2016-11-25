import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './menu.styl'
import * as actions from '../../actions'

const Menu = (props) => {
  const { items, currentItemIndex, setCartogram, clearCartogram } = props

  return (
    <div className={ styles.root }>
      {
        items.map((item, index) => {
          const onClick = index === currentItemIndex ? () => clearCartogram(index) : () => setCartogram(index)
          // key={index} можно использовать, потому что items - это константа
          return (
            <button key={ index } onClick={ onClick }>{ item.name }</button>
          )
        })
      }
    </div>
  )
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string
  })),
  currentItemIndex: PropTypes.number,
  setCartogram: PropTypes.func.isRequired,
  clearCartogram: PropTypes.func.isRequired
}

export default connect(state => ({
  items: state.pluginConfigs.cartograms.items,
  currentItemIndex: state.plugins.cartograms.enabledCartogramIndex
}), dispatch => bindActionCreators(actions, dispatch))(Menu)
