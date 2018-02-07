import './LabelBorderStyleSettings.scss'
import React, {Component} from 'react'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import SideStyleSettings from './SideStyleSettings'
import ColorSettings from './ColorSettings'
import { keys } from 'lodash'
import { ChromePicker } from 'react-color'

export default class BorderStyleSettings extends Component {
  static propTypes = {
    cssProperty: PropTypes.string.isRequired,
    borderSchema: PropTypes.object.isRequired,
    borderStyle: PropTypes.string,
    borderRadius: PropTypes.string,
    borderColor: PropTypes.string,
    handleBorderStyleSelect: PropTypes.func.isRequired,
    handleBorderWidthOnChange: PropTypes.func.isRequired,
    handleBorderRadiusOnChange: PropTypes.func.isRequired,
    handleBorderColorInputOnChange: PropTypes.func.isRequired,
    handleBorderColorPickerOnChange: PropTypes.func.isRequired,
    toggleCssPropertyToWhichSide: PropTypes.func.isRequired,
  }

  state = {
    showColorPicker: false
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleBorderApplyToAll() {
    this.props.toggleCssPropertyToWhichSide(this.props.cssProperty, 'APPLY_TO_ALL')
  }

  handleBorderApplyToTop() {
    this.props.toggleCssPropertyToWhichSide(this.props.cssProperty, 'APPLY_TO_TOP')
  }

  handleBorderApplyToBottom() {
    this.props.toggleCssPropertyToWhichSide(this.props.cssProperty, 'APPLY_TO_BOTTOM')
  }

  handleBorderApplyToLeft() {
    this.props.toggleCssPropertyToWhichSide(this.props.cssProperty, 'APPLY_TO_LEFT')
  }

  handleBorderApplyToRight() {
    this.props.toggleCssPropertyToWhichSide(this.props.cssProperty, 'APPLY_TO_RIGHT')
  }

  handleAllBorderWidthOnChange(e) {
    this.props.handleBorderWidthOnChange(e, 'all')
  }

  handleTopBorderWidthOnChange(e) {
    this.props.handleBorderWidthOnChange(e, 'top')
  }

  handleBottomBorderWidthOnChange(e) {
    this.props.handleBorderWidthOnChange(e, 'bottom')
  }

  handleLeftBorderWidthOnChange(e) {
    this.props.handleBorderWidthOnChange(e, 'left')
  }

  handleRightBorderWidthOnChange(e) {
    this.props.handleBorderWidthOnChange(e, 'right')
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
      cssProperty,
      borderSchema,
      borderStyle,
      borderRadius,
      borderColor,
      handleBorderWidthOnChange,
      handleBorderStyleSelect,
      handleBorderRadiusOnChange,
      handleBorderColorInputOnChange,
      handleBorderColorPickerOnChange
    } = this.props

    const sideFuncs = {
      top: {
        handleSideChecked: this.handleBorderApplyToTop,
        handleInputOnChanged: this.handleTopBorderWidthOnChange,
      },
      bottom: {
        handleSideChecked: this.handleBorderApplyToBottom,
        handleInputOnChanged: this.handleBottomBorderWidthOnChange,
      },
      left: {
        handleSideChecked: this.handleBorderApplyToLeft,
        handleInputOnChanged: this.handleLeftBorderWidthOnChange,
      },
      right: {
        handleSideChecked: this.handleBorderApplyToRight,
        handleInputOnChanged: this.handleRightBorderWidthOnChange,
      }
    }

    return (
      <div className="field-setting__item d-flex flex-column align-flex-end">
        <div className="field-setting__item-apply-to-all d-flex space-between">
          <p>border</p>
          <div>
            <input
              onChange={this.handleBorderApplyToAll}
              type="checkbox"
              name="border-apply-to-all"
              value="border-apply-to-all"
              checked={borderSchema.applyTo.all ? 'checked' : ''}
            />
            apply to all sides
          </div>
        </div>
        {
          borderSchema.applyTo.all && (
            <div className="field-subsetting__item d-flex flex-row align-baseline space-between">
              <p><i className="fa fa-caret-right"></i>
              width</p>
              <div className="field-setting__width-input-container d-flex flex-row space-between">
                <input
                  type="number"
                  className="field-setting__width-input"
                  value={borderSchema.all.width.value.replace('px', '')}
                  onChange={this.handleAllBorderWidthOnChange}
                />
                <p>px</p>
              </div>
            </div>
          )
        }
        {
          !borderSchema.applyTo.all && keys(sideFuncs).map(side => {
            return (
              <SideStyleSettings
                key={`label-border-${side}__checkbox`}
                side={side}
                handleSideChecked={sideFuncs[side].handleSideChecked}
                handleInputOnChanged={sideFuncs[side].handleInputOnChanged}
                checked={borderSchema.applyTo[side]}
                inputValue={borderSchema[side].width.value.replace('px', '')}
              />
            )
          })
        }
        <div className="field-subsetting__item d-flex flex-row align-baseline space-between">
          <p><i className="fa fa-caret-right"></i>
          radius</p>
          <div className="field-setting__width-input-container d-flex flex-row space-between">
            <input
              type="number"
              className="field-setting__width-input"
              value={borderRadius}
              onChange={handleBorderRadiusOnChange}
            />
            <p>px</p>
          </div>
        </div>
        <div className="field-subsetting__item d-flex flex-row align-baseline space-between">
          <p><i className="fa fa-caret-right"></i>
          style</p>
          <Select
            name="field-setting__label-border-select"
            value={borderStyle}
            onChange={handleBorderStyleSelect}
            clearable={false}
            options={[
              {value: 'dotted', label: 'dotted'},
              {value: 'dashed', label: 'dashed'},
              {value: 'solid', label: 'solid'},
              {value: 'double', label: 'double'},
              {value: 'groove', label: 'groove'},
              {value: 'ridge', label: 'ridge'},
              {value: 'inset', label: 'inset'},
              {value: 'outset', label: 'outset'},
            ]}
          />
        </div>
        <ColorSettings
          subsetting={true}
          label="color"
          className="field-subsetting__item d-flex flex-row align-baseline space-between"
          color={borderColor}
          handleColorInputOnChange={handleBorderColorInputOnChange}
          handleColorPickerOnChange={handleBorderColorPickerOnChange}
        />
      </div>
    )
  }
}
