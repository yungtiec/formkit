import React, {Component} from 'react'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import { ChromePicker } from 'react-color'

export default class ColorSettings extends Component {
  static propTypes = {
    subsetting: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    handleColorInputOnChange: PropTypes.func.isRequired,
    handleColorPickerOnChange: PropTypes.func.isRequired,
  }

  state = {
    showColorPicker: false
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleColorInputOnClick(e) {
    this.setState({
      showColorPicker: true
    })
  }

  handleColorInputOnBlur(e) {
    this.setState({
      showColorPicker: false
    })
  }

  render() {
    const {
      subsetting,
      className,
      label,
      color,
      handleColorInputOnChange,
      handleColorPickerOnChange
    } = this.props

    return (
      <div className={className}>
        <p>
        { subsetting && <i className="fa fa-caret-right"></i> }
        { label }</p>
        <div className="field-setting__color-input-container d-flex flex-row space-between">
          <div
            className="field-setting__color-box"
            style={{backgroundColor: color}}
          >
            <input
              type="text"
              className="field-setting__color-hidden-input"
              onClick={this.handleColorInputOnClick}
              onBlur={this.handleColorInputOnBlur}
            />
          </div>
          <input
            type="text"
            className="field-setting__color-input"
            value={color}
            onChange={handleColorInputOnChange}
          />
          { this.state.showColorPicker &&
            <ChromePicker
              color={color}
              onChange={handleColorPickerOnChange}/>}
        </div>
      </div>
    )
  }
}
