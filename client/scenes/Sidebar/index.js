import './index.scss'
import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Logo} from '../../components'
import BuilderFieldOptions from './scenes/BuilderFieldOptions'
import BuilderToolbar from './scenes/BuilderToolbar'
import {getCurrentToolbarTab} from '../../store/sidebar/reducer'


class Sidebar extends Component {
  static propTypes = {
    currentToolbarTab: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  getToolbarTabDisplay() {
    switch (this.props.currentToolbarTab) {
      case 'fieldOptions':
        return <BuilderFieldOptions className="builder__field-options" />
      case 'fieldSettings':
        return (<div></div>)
      case 'fieldLayout':
        return (<div></div>)
      case 'fieldStyling':
        return (<div></div>)
      default:
        return (<div></div>)
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <Logo />
        <div className="builder__control-panel">
          <BuilderToolbar className="builder__toolbar"/>
          {this.getToolbarTabDisplay()}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  currentToolbarTab: getCurrentToolbarTab(state)
})

const actions = {}

export default connect(mapState, actions)(Sidebar)
