import React, {Component} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import BorderStyleSettings from '../components/BorderStyleSettings'
import ColorSettings from '../components/ColorSettings'
import { getFormCssSchema } from '../../../../../store/form/ui/reducer'
import {
  updateCss,
  toggleCssPropertyToWhichSide,
  toggleFieldBoxShadow
} from '../../../../../store'

class FieldSettings extends Component {
  static propTypes = {
    cssSchema: PropTypes.object.isRequired,
    updateCss: PropTypes.func.isRequired,
    toggleCssPropertyToWhichSide: PropTypes.func.isRequired,
    toggleFieldBoxShadow: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  // label - border
  handleFieldBorderWidthOnChange(e, side) {
    if (e.target.value !== this.props.cssSchema.fieldBorder[side].width.value) {
      this.props.updateCss(`FIELD_BORDER_WIDTH_${side.toUpperCase()}`, e.target.value)
    }
  }

  handleFieldBorderRadiusOnChange(e) {
    if (e.target.value !== this.props.cssSchema.fieldBorderRadius.value) {
      this.props.updateCss('FIELD_BORDER_RADIUS', e.target.value)
    }
  }

  handleFieldBorderStyleSelect(selectedOption) {
    if (selectedOption.value !== this.props.cssSchema.fieldBorderStyle.value) {
      this.props.updateCss('FIELD_BORDER_STYLE', selectedOption.value )
    }
  }

  // field - color
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

  handleFieldBorderColorInputOnChange = this.createInputHandlerForColorProperty({
    camelCase: 'fieldBorderColor',
    underscoreUppercase: 'FIELD_BORDER_COLOR'
  })

  handleFieldBorderColorPickerOnChange = this.createColorPickerHandlerForColorProperty({
    camelCase: 'fieldBorderColor',
    underscoreUppercase: 'FIELD_BORDER_COLOR'
  })

  handleFieldColorInputOnChange = this.createInputHandlerForColorProperty({
    camelCase: 'fieldColor',
    underscoreUppercase: 'FIELD_COLOR'
  })

  handleFieldColorPickerOnChange = this.createColorPickerHandlerForColorProperty({
    camelCase: 'fieldColor',
    underscoreUppercase: 'FIELD_COLOR'
  })

  handleFieldBackgroundColorInputOnChange = this.createInputHandlerForColorProperty({
    camelCase: 'fieldBackgroundColor',
    underscoreUppercase: 'FIELD_BACKGROUND_COLOR'
  })

  handleFieldBackgroundColorPickerOnChange = this.createColorPickerHandlerForColorProperty({
    camelCase: 'fieldBackgroundColor',
    underscoreUppercase: 'FIELD_BACKGROUND_COLOR'
  })

  render() {
    return (
      <div>
        <div className="field-setting__group-label">
            Field
        </div>
        <ColorSettings
          subsetting={false}
          label="text color"
          className="field-setting__item d-flex flex-row space-between"
          color={this.props.cssSchema.fieldColor.value}
          handleColorInputOnChange={this.handleFieldColorInputOnChange}
          handleColorPickerOnChange={this.handleFieldColorPickerOnChange}
        />
        <ColorSettings
          subsetting={false}
          label="background color"
          className="field-setting__item d-flex flex-row space-between"
          color={this.props.cssSchema.fieldBackgroundColor.value}
          handleColorInputOnChange={this.handleFieldBackgroundColorInputOnChange}
          handleColorPickerOnChange={this.handleFieldBackgroundColorPickerOnChange}
        />
        <BorderStyleSettings
          cssProperty="FIELD_BORDER"
          borderSchema={this.props.cssSchema.fieldBorder}
          borderStyle={this.props.cssSchema.fieldBorderStyle.value}
          borderRadius={this.props.cssSchema.fieldBorderRadius.value.replace('px', '')}
          borderColor={this.props.cssSchema.fieldBorderColor.value}
          fieldBoxShadow={this.props.cssSchema.fieldBoxShadow.value}
          handleBorderWidthOnChange={this.handleFieldBorderWidthOnChange}
          handleBorderStyleSelect={this.handleFieldBorderStyleSelect}
          handleBorderRadiusOnChange={this.handleFieldBorderRadiusOnChange}
          handleBorderColorInputOnChange={this.handleFieldBorderColorInputOnChange}
          handleBorderColorPickerOnChange={this.handleFieldBorderColorPickerOnChange}
          toggleCssPropertyToWhichSide={this.props.toggleCssPropertyToWhichSide}
          toggleFieldBoxShadow={this.props.toggleFieldBoxShadow}
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
  toggleCssPropertyToWhichSide,
  toggleFieldBoxShadow
}


export default connect(mapState, actions)(FieldSettings)



