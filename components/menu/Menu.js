import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { autobind } from 'core-decorators'
import classnames from 'classnames'

import Checkbox from 'core/frontend/client/layers-panel/Checkbox'

import styles from './menu.styl'
import * as actions from '../../actions'
import dropdownImage from './dropdown.svg'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      opened: false
    }
  }

  @autobind
  onClick() {
    this.toggleOpened()
  }

  toggleOpened(value = !this.state.opened) {
    this.setState({ opened: value })
  }

  render() {
    const { items, currentItemIndex, setCartogram, clearCartogram } = this.props
    const { opened } = this.state
    const classNames = classnames(styles.root, { opened })

    if (items.length === 0) return null

    return (
      <div className={ classNames }>
        <div className={ styles.button } onClick={ this.onClick }>
          Картограммы
          <img alt='Drowdown' src={ dropdownImage } className={ styles.dropdown } />
        </div>
        {
          opened &&
          <ul className={ styles.list }>
            {
              items.map((item, index) => {
                const isActive = index === currentItemIndex
                const onClick = isActive ? () => clearCartogram(index) : () => setCartogram(index)
                // key={index} можно использовать, потому что items - это константа
                return (
                  <li key={ index } onClick={ onClick }>
                    <Checkbox checked={ isActive } className={ styles.checkbox } color='#a7a7a7' />
                    <span className={ styles.itemName }>{ item.name }</span>
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
    )
  }
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
