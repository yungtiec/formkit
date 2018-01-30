import './index.scss'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'

export default class BuilderToolbar extends Component {

  static propTypes = {
    isEmptyForm: PropTypes.bool.isRequired,
    currentToolbarTab: PropTypes.string.isRequired,
    changeToolbarTab: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  componentDidUpdate() {
    if (this.props.isEmptyForm && this.props.currentToolbarTab !== 'fieldOptions') {
      ReactTooltip.show(this.refs.fieldOptions)
    }
  }

  getIconColor(tab) {
    return this.props.currentToolbarTab === tab ? {color: '#57AAED'} : {}
  }

  render() {
    var notInFieldOptions = this.props.isEmptyForm &&
      this.props.currentToolbarTab !== 'fieldOptions'

    var fieldOptionsTooltipMessage = notInFieldOptions ?
      'Select a field first' :
      'Select a field'

    return (
      <div className={this.props.className}>
        <div
          ref="fieldOptions"
          data-tip data-for="toolbar_field-options"
          onClick={() => this.props.changeToolbarTab('fieldOptions')}
          className="builder__toolbar-option">
          <FontAwesome
            style={this.getIconColor('fieldOptions')}
            className=""
            name="plus-square"
            size="lg"
          />
        </div>
        <ReactTooltip
          id="toolbar_field-options"
          type="info"
          effect="solid">
          <span>{fieldOptionsTooltipMessage}</span>
        </ReactTooltip>
        <div
          ref="fieldSettings"
          data-tip data-for="toolbar_field-settings"
          onClick={() => this.props.changeToolbarTab('fieldSettings')}
          className="builder__toolbar-option">
          <FontAwesome
            style={this.getIconColor('fieldSettings')}
            className=""
            name="cog"
            size="lg"
          />
        </div>
        <ReactTooltip id="toolbar_field-settings" type="info" effect="solid">
          <span>Modify field settings</span>
        </ReactTooltip>
        <div
          ref="fieldLayout"
          data-tip data-for="toolbar_field-layout"
          onClick={() => this.props.changeToolbarTab('fieldLayout')}
          className="builder__toolbar-option">
          <FontAwesome
            style={this.getIconColor('fieldLayout')}
            className=""
            name="th-list"
            size="lg"
          />
        </div>
        <ReactTooltip id="toolbar_field-layout" type="info" effect="solid">
          <span>Adjust form layout</span>
        </ReactTooltip>
        <div
          ref="fieldStyling"
          data-tip data-for="toolbar_field-styling"
          onClick={() => this.props.changeToolbarTab('fieldStyling')}
          className="builder__toolbar-option">
          <FontAwesome
            style={this.getIconColor('fieldStyling')}
            className=""
            name="italic"
            size="lg"
          />
        </div>
        <ReactTooltip id="toolbar_field-styling" type="info" effect="solid">
          <span>Styling</span>
        </ReactTooltip>
      </div>)
  }
}
