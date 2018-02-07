import React, {Component} from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import LabelBorderStyleSettings from './components/LabelBorderStyleSettings'
import LabelPaddingStyleSettings from './components/LabelPaddingStyleSettings'
import { getFormFieldSchema } from '../../../../store/form/field/reducer'
import { getCurrentFieldIdInFocus } from '../../../../store/sidebar/reducer'
import { getFieldUiSchema, getFormCssSchema } from '../../../../store/form/ui/reducer'
import {
  updateCss,
  toggleCssPropertyToWhichSide,
  updateSideSelect
} from '../../../../store'
import { keys, range } from 'lodash'

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

  handleLabelBorderSideSelect(selectedOptions) {
    this.props.updateSideSelect('LABEL_BORDER', selectedOptions.map(s => s.value))
  }

  getLabelBorderSelect(property) {
    return keys(this.props.cssSchema[property].applyTo)
      .filter(side =>
        this.props.cssSchema[property].applyTo[side] && side !== 'all')
      .map(side => ({value: side, label: side}))
  }

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

  handleLabelPaddingApplyToAll() {
    this.props.toggleCssPropertyToWhichSide('LABEL_PADDING', 'APPLY_TO_ALL')
  }

  handleLabelPaddingSizeOnChange(e, side) {
    if (e.target.value !== this.props.cssSchema.labelPadding[side].width.value) {
      this.props.updateCss(`LABEL_PADDING_SIZE_${side.toUpperCase()}`, e.target.value)
    }
  }

  handleLabelPaddingSideSelect(selectedOptions) {
    this.props.updateSideSelect('LABEL_PADDING', selectedOptions.map(s => s.value))
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
                Label
            </div>
            <div className="field-setting__item field-setting__item--select-container-inline">
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
            <div className="field-setting__item field-setting__item--select-container-inline">
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
            <LabelBorderStyleSettings
              labelBorderSchema={this.props.cssSchema.labelBorder}
              labelBorderStyle={this.props.cssSchema.labelBorderStyle.value}
              labelBorderRadius={this.props.cssSchema.labelBorderRadius.value.replace('px', '')}
              handleLabelBorderWidthOnChange={this.handleLabelBorderWidthOnChange}
              handleLabelBorderStyleSelect={this.handleLabelBorderStyleSelect}
              handleLabelBorderRadiusOnChange={this.handleLabelBorderRadiusOnChange}
              toggleCssPropertyToWhichSide={this.props.toggleCssPropertyToWhichSide}
            />
            <LabelPaddingStyleSettings
              labelPaddingSchema={this.props.cssSchema.labelPadding}
              toggleCssPropertyToWhichSide={this.props.toggleCssPropertyToWhichSide}
              handleLabelPaddingSizeOnChange={this.handleLabelPaddingSizeOnChange}
            />
            <div className="field-setting__group-label">
              font
            </div>
            <div className="field-setting__item field-setting__item--select-container-inline">
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
