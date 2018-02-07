import React, {Component} from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import LabelSettings from './scenes/LabelSettings'
import FieldSettings from './scenes/FieldSettings'
import { getFormFieldSchema } from '../../../../store/form/field/reducer'
import { getCurrentFieldIdInFocus } from '../../../../store/sidebar/reducer'
import { getFieldUiSchema, getFormCssSchema } from '../../../../store/form/ui/reducer'
import {
  updateCss,
  toggleCssPropertyToWhichSide,
  updateSideSelect
} from '../../../../store'
import { range } from 'lodash'

class BuilderFieldStyling extends Component {
  static propTypes = {
    currentFieldIdInFocus: PropTypes.string,
    isEmptyForm: PropTypes.bool.isRequired,
    uiSchema: PropTypes.object.isRequired,
    cssSchema: PropTypes.object.isRequired,
    updateCss: PropTypes.func.isRequired,
    toggleCssPropertyToWhichSide: PropTypes.func.isRequired,
    updateSideSelect: PropTypes.func.isRequired,
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

  handleFontSizeSelectOnChange(selectedOption) {
    if (selectedOption.value !== this.props.cssSchema.fontSize.value) {
      this.props.updateCss('FONT_SIZE', selectedOption.value)
    }
  }

  handleMinWidthOnChange(e) {
    if (e.target.value !== this.props.cssSchema.labelMinWidth.value) {
      this.props.updateCss('LABEL_MIN_WIDTH', e.target.value)
    }
  }

  // field - color
  handleFieldBorderColorInputOnChange(e) {
    if (e.target.value !== this.props.cssSchema.fieldBorderColor.value) {
      this.props.updateCss('FIELD_BORDER_COLOR', e.target.value)
    }
  }

  handleFieldBorderColorPickerOnChange(color, e) {
    if (color.hex !== this.props.cssSchema.fieldBorderColor.value) {
      this.props.updateCss('FIELD_BORDER_COLOR', color.hex)
    }
  }

  handleFieldColorInputOnChange(e) {
    if (e.target.value !== this.props.cssSchema.fieldColor.value) {
      this.props.updateCss('FIELD_COLOR', e.target.value)
    }
  }

  handleFieldColorPickerOnChange(color, e) {
    if (color.hex !== this.props.cssSchema.fieldColor.value) {
      this.props.updateCss('FIELD_COLOR', color.hex)
    }
  }

  handleFieldBackgroundColorInputOnChange(e) {
    if (e.target.value !== this.props.cssSchema.fieldBackgroundColor.value) {
      this.props.updateCss('FIELD_BACKGROUND_COLOR', e.target.value)
    }
  }

  handleFieldBackgroundColorPickerOnChange(color, e) {
    if (color.hex !== this.props.cssSchema.fieldBackgroundColor.value) {
      this.props.updateCss('FIELD_BACKGROUND_COLOR', color.hex)
    }
  }

  render() {
    if (this.props.isEmptyForm || !this.props.currentFieldIdInFocus) {
      return (
        <div className="builder__field-settings--empty">
          Select a field first
        </div>
      )
    } else {

      return (
        <div className="builder__field-settings">
          <ul className="list-group">
            <div className="field-setting__group-label">
              font
            </div>
            <div className="field-setting__item d-flex flex-row space-between">
              <div className="field-setting__select-label">
                font size
              </div>
              <Select
                name="field-setting__label-alignment-select"
                value={this.props.cssSchema.fontSize.value.replace('px', '')}
                onChange={this.handleFontSizeSelectOnChange}
                clearable={false}
                options={range(21).map(num => ({value: num + 10, label: `${num + 10}px`}))}
              />
            </div>
            <LabelSettings />
            <FieldSettings />
          </ul>
        </div>
      )
    }

  }
}

const mapState = (state) => ({
  currentFieldIdInFocus: getCurrentFieldIdInFocus(state),
  isEmptyForm: isEmpty(getFormFieldSchema(state).properties),
  uiSchema: getFieldUiSchema(state),
  cssSchema: getFormCssSchema(state)
})

const actions = {
  updateCss,
  toggleCssPropertyToWhichSide,
  updateSideSelect
}


export default connect(mapState, actions)(BuilderFieldStyling)
