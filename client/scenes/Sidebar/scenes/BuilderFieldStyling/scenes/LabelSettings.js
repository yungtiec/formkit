import React, {Component} from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import BorderStyleSettings from '../components/BorderStyleSettings'
import LabelPaddingStyleSettings from '../components/LabelPaddingStyleSettings'
import ColorSettings from '../components/ColorSettings'
import { getFormCssSchema } from '../../../../../store/form/ui/reducer'
import {
  updateCss,
  toggleCssPropertyToWhichSide
} from '../../../../../store'
import { keys, range } from 'lodash'

class LabelSettings extends Component {
  static propTypes = {
    cssSchema: PropTypes.object.isRequired,
    updateCss: PropTypes.func.isRequired,
    toggleCssPropertyToWhichSide: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleLabelSelectOnChange(selectedOption) {
    if (selectedOption.value !== this.props.cssSchema.labelAlignment.value) {
      this.props.updateCss('LABEL_ALIGNMENT', selectedOption.value)
    }
  }

  handleMinWidthOnChange(e) {
    if (e.target.value !== this.props.cssSchema.labelMinWidth.value) {
      this.props.updateCss('LABEL_MIN_WIDTH', e.target.value)
    }
  }

  // label - border
  handleLabelBorderWidthOnChange(e, side) {
    if (e.target.value !== this.props.cssSchema.labelBorder[side].width.value) {
      this.props.updateCss(`LABEL_BORDER_WIDTH_${side.toUpperCase()}`, e.target.value)
    }
  }

  handleLabelBorderRadiusOnChange(e) {
    if (e.target.value !== this.props.cssSchema.labelBorderRadius.value) {
      this.props.updateCss('LABEL_BORDER_RADIUS', e.target.value)
    }
  }

  handleLabelBorderStyleSelect(selectedOption) {
    if (selectedOption.value !== this.props.cssSchema.labelBorderStyle.value) {
      this.props.updateCss('LABEL_BORDER_STYLE', selectedOption.value )
    }
  }

  // label - color
  createInputHandlerForColorProperty({camelCase, underscoreUppercase}) {
    return event => {
      if (event.target.value !== this.props.cssSchema[camelCase].value) {
        this.props.updateCss(underscoreUppercase, event.target.value)
      }
    }
  }

  createColorPickerHandlerForColorProperty({camelCase, underscoreUppercase}) {
    return (color, event) => {
      if (color.hex !== this.props.cssSchema[camelCase].value) {
        this.props.updateCss(underscoreUppercase, color.hex)
      }
    }
  }

  handleLabelBorderColorInputOnChange = this.createInputHandlerForColorProperty({
    camelCase: 'labelBorderColor',
    underscoreUppercase: 'LABEL_BORDER_COLOR'
  })

  handleLabelBorderColorPickerOnChange = this.createColorPickerHandlerForColorProperty({
    camelCase: 'labelBorderColor',
    underscoreUppercase: 'LABEL_BORDER_COLOR'
  })

  handleLabelColorInputOnChange = this.createInputHandlerForColorProperty({
    camelCase: 'labelColor',
    underscoreUppercase: 'LABEL_COLOR'
  })

  handleLabelColorPickerOnChange = this.createColorPickerHandlerForColorProperty({
    camelCase: 'labelColor',
    underscoreUppercase: 'LABEL_COLOR'
  })

  handleLabelBackgroundColorInputOnChange = this.createInputHandlerForColorProperty({
    camelCase: 'labelBackgroundColor',
    underscoreUppercase: 'LABEL_BACKGROUND_COLOR'
  })

  handleLabelBackgroundColorPickerOnChange = this.createColorPickerHandlerForColorProperty({
    camelCase: 'labelBackgroundColor',
    underscoreUppercase: 'LABEL_BACKGROUND_COLOR'
  })

  handleLabelPaddingApplyToAll() {
    this.props.toggleCssPropertyToWhichSide('LABEL_PADDING', 'APPLY_TO_ALL')
  }

  handleLabelPaddingSizeOnChange(e, side) {
    if (e.target.value !== this.props.cssSchema.labelPadding[side].width.value) {
      this.props.updateCss(`LABEL_PADDING_SIZE_${side.toUpperCase()}`, e.target.value)
    }
  }

  render() {
    return (
      <div>
        <div className="field-setting__group-label">
            Label
        </div>
        <div className="field-setting__item d-flex flex-row space-between">
          <div className="field-setting__select-label">
            alignment
          </div>
          <Select
            name="field-setting__label-alignment-select"
            value={this.props.cssSchema.labelAlignment.value}
            onChange={this.handleLabelSelectOnChange}
            clearable={false}
            options={[
              { value: 'top', label: 'top' },
              { value: 'left', label: 'left' },
              { value: 'right', label: 'right' }
            ]}
          />
        </div>
        <div className="field-setting__item d-flex flex-row space-between">
          <div className="field-setting__select-label">
            width
          </div>
          <div className="field-setting__label-width-input-container">
            <input
              type="number"
              className="field-setting__label-width-input"
              value={this.props.cssSchema.labelMinWidth.value.replace('px', '')}
              onChange={this.handleMinWidthOnChange}
            />
            <p>px</p>
          </div>
        </div>
        <ColorSettings
          subsetting={false}
          label="text color"
          className="field-setting__item d-flex flex-row space-between"
          color={this.props.cssSchema.labelColor.value}
          handleColorInputOnChange={this.handleLabelColorInputOnChange}
          handleColorPickerOnChange={this.handleLabelColorPickerOnChange}
        />
        <ColorSettings
          subsetting={false}
          label="background color"
          className="field-setting__item d-flex flex-row space-between"
          color={this.props.cssSchema.labelBackgroundColor.value}
          handleColorInputOnChange={this.handleLabelBackgroundColorInputOnChange}
          handleColorPickerOnChange={this.handleLabelBackgroundColorPickerOnChange}
        />
        <BorderStyleSettings
          cssProperty="LABEL_BORDER"
          borderSchema={this.props.cssSchema.labelBorder}
          borderStyle={this.props.cssSchema.labelBorderStyle.value}
          borderRadius={this.props.cssSchema.labelBorderRadius.value.replace('px', '')}
          borderColor={this.props.cssSchema.labelBorderColor.value}
          handleBorderWidthOnChange={this.handleLabelBorderWidthOnChange}
          handleBorderStyleSelect={this.handleLabelBorderStyleSelect}
          handleBorderRadiusOnChange={this.handleLabelBorderRadiusOnChange}
          handleBorderColorInputOnChange={this.handleLabelBorderColorInputOnChange}
          handleBorderColorPickerOnChange={this.handleLabelBorderColorPickerOnChange}
          toggleCssPropertyToWhichSide={this.props.toggleCssPropertyToWhichSide}
        />
        <LabelPaddingStyleSettings
          labelPaddingSchema={this.props.cssSchema.labelPadding}
          toggleCssPropertyToWhichSide={this.props.toggleCssPropertyToWhichSide}
          handleLabelPaddingSizeOnChange={this.handleLabelPaddingSizeOnChange}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  cssSchema: getFormCssSchema(state)
})

const actions = {
  updateCss,
  toggleCssPropertyToWhichSide
}


export default connect(mapState, actions)(LabelSettings)
