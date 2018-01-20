import './index.scss'
import FontAwesome from 'react-fontawesome'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import {connect} from 'react-redux'
import {getCurrentToolbarTab} from '../../../../store/sidebar/reducer'
import {changeToolbarTab} from '../../../../store'

class BuilderToolbar extends Component {

  static propTypes = {
    currentToolbarTab: PropTypes.string.isRequired,
    changeToolbarTab: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  getIconColor(tab) {
    return this.props.currentToolbarTab === tab ? {color: '#57AAED'} : {}
  }

  render() {
    return (<div className={this.props.className}>
      <div
        onClick={() => this.props.changeToolbarTab('fieldOptions')}
        className="builder__toolbar-option">
        <FontAwesome
          style={this.getIconColor('fieldOptions')}
          className=""
          name="plus-square"
          size="lg"
        />
      </div>
      <div
        onClick={() => this.props.changeToolbarTab('fieldSettings')}
        className="builder__toolbar-option">
        <FontAwesome
          style={this.getIconColor('fieldSettings')}
          className=""
          name="cog"
          size="lg"
        />
      </div>
      <div
        onClick={() => this.props.changeToolbarTab('fieldLayout')}
        className="builder__toolbar-option">
        <FontAwesome
          style={this.getIconColor('fieldLayout')}
          className=""
          name="th-list"
          size="lg"
        />
      </div>
      <div
        onClick={() => this.props.changeToolbarTab('fieldStyling')}
        className="builder__toolbar-option">
        <FontAwesome
          style={this.getIconColor('fieldStyling')}
          className=""
          name="italic"
          size="lg"
        />
      </div>
    </div>)
  }
}

const mapState = (state) => ({
  currentToolbarTab: getCurrentToolbarTab(state)
})

const actions = { changeToolbarTab }

export default connect(mapState, actions)(BuilderToolbar)
