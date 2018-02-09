import './index.scss'
import './react-toggle.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import Toggle from 'react-toggle'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import { isEmpty, values } from 'lodash'
import FIELD_OPTION_CONFIG from '../../../../constants/fieldOptionConfig'
import FieldSelectOption from './components/FieldSelectOption'
import FieldSelectValue from './components/FieldSelectValue'
import { getFormFieldSchema } from '../../../../store/form/field/reducer'
import { getRequiredFields } from '../../../../store/form/validation/reducer'
import { getCurrentFieldIdInFocus } from '../../../../store/sidebar/reducer'
import { getFieldUiSchema } from '../../../../store/form/ui/reducer'
import {
  toggleRequiredField,
  toggleShowDescription,
  updatePropertyInFocus,
  toggleIsInteger,
  toggleAllowMultiple,
  updateColumn,
  toggleShowPlaceholder,
  toggleInlineCheckboxes
} from '../../../../store'

class BuilderFieldSettings extends Component {
  static propTypes = {
    currentFieldIdInFocus: PropTypes.string,
    fieldSchema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object.isRequired,
    toggleRequiredField: PropTypes.func.isRequired,
    toggleShowDescription: PropTypes.func.isRequired,
    toggleShowPlaceholder: PropTypes.func.isRequired,
    updatePropertyInFocus: PropTypes.func.isRequired,
    toggleIsInteger: PropTypes.func.isRequired,
    updateColumn: PropTypes.func.isRequired,
    toggleAllowMultiple: PropTypes.func.isRequired,
    toggleInlineCheckboxes: PropTypes.func.isRequired,
    requiredFields: PropTypes.array,
  }

  state = {
    selectedOption: '12',
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleRequiredOnChange() {
    this.props.toggleRequiredField(this.props.currentFieldIdInFocus)
  }

  handleDescriptionOnChange() {
    this.props.toggleShowDescription(this.props.currentFieldIdInFocus)
    this.props.updatePropertyInFocus('description')
  }

  handlePlaceholderOnChange() {
    this.props.toggleShowPlaceholder(this.props.currentFieldIdInFocus)
    this.props.updatePropertyInFocus('placeholder')
  }

  handleIntegerOnChange() {
    this.props.toggleIsInteger(this.props.currentFieldIdInFocus)
  }

  handleAllowMultipleOnChange() {
    this.props.toggleAllowMultiple(this.props.currentFieldIdInFocus)
  }

  handleSpacingSelectOnChange(selectedOption) {
    if (selectedOption.value !==
      this.props.uiSchema[this.props.currentFieldIdInFocus].column) {
      this.props.updateColumn(
        this.props.currentFieldIdInFocus, selectedOption.value)
    }
  }

  handleLabelSelectOnChange(selectedOption) {
    if (selectedOption.value !==
      this.props.uiSchema[this.props.currentFieldIdInFocus].labelAlignment) {
      this.props.updateLabelAlignment(
        this.props.currentFieldIdInFocus, selectedOption.value)
    }
  }

  handleInlineCheckboxesOnChange() {
    this.props.toggleInlineCheckboxes(this.props.currentFieldIdInFocus)
  }

  renderSettingsBaseOnFieldOption(field, uiSchema) {
    switch (field.fieldOptionId) {
      case 'integer':
      case 'double':
        return (
          <div className="field-setting__item field-setting__item--toggle">
            <p>integer</p>
            <Toggle
              onChange={this.handleIntegerOnChange}
              checked={field.isInteger}
              icons={false} />
          </div>
        )
      case 'multiple-checkbox':
      case 'radiobuttonlist':
        return (
          <div>
            <div className="field-setting__item field-setting__item--toggle">
              <p>inline options</p>
              <Toggle
                onChange={this.handleInlineCheckboxesOnChange}
                checked={uiSchema.inlineCheckboxes}
                icons={false} />
            </div>
            <div className="field-setting__item field-setting__item--toggle">
              <p>allow multiple answers</p>
              <Toggle
                onChange={this.handleAllowMultipleOnChange}
                checked={field.allowMultiple}
                icons={false} />
            </div>
          </div>
        )
      default:
        return ''
    }
  }

  renderPlaceholderSetting(field) {
    switch (field.fieldOptionId) {
      case 'integer':
      case 'double':
      case 'text':
      case 'multilinetext':
      case 'select':
        return (
          <div className="field-setting__item field-setting__item--toggle">
            <p>placeholder</p>
            <Toggle
              onChange={this.handlePlaceholderOnChange}
              checked={field.showPlaceholder}
              icons={false} />
          </div>
        )
      default:
        return ''
    }
  }

  render() {
    const isEmptyForm = isEmpty(this.props.fieldSchema.properties)

    var field, fieldOrder, uiSchema

    if (isEmptyForm || !this.props.currentFieldIdInFocus) {
      return (
        <div className="builder__field-settings--empty">
          Select a field first
        </div>
      )
    } else {
      field = this.props.fieldSchema.properties[this.props.currentFieldIdInFocus]
      fieldOrder = this.props.fieldSchema.order.indexOf(field.id) + 1
      uiSchema = this.props.uiSchema[this.props.currentFieldIdInFocus]

      return (
        <div className="builder__field-settings">
          <ul className="list-group">
            <div className="field-setting__item field-setting__item--select-container">
              <div className="field-setting__select-label">
                field options
              </div>
              <Select
                optionComponent={FieldSelectOption}
                options={values(FIELD_OPTION_CONFIG)
                  .filter(fieldOption => fieldOption.default)}
                placeholder={`Q${fieldOrder} ${FIELD_OPTION_CONFIG[field.fieldOptionId].label}`}
                value={FIELD_OPTION_CONFIG[field.fieldOptionId]}
                valueComponent={FieldSelectValue}
                clearable={false}
                />
            </div>
            <div className="field-setting__item field-setting__item--toggle">
              <p>required</p>
              <Toggle
                onChange={this.handleRequiredOnChange}
                checked={this.props.requiredFields
                  .indexOf(this.props.currentFieldIdInFocus) !== -1}
                icons={false} />
            </div>
            {
              (field.fieldOptionId !== 'multiple-checkbox' &&
               field.fieldOptionId !== 'radiobuttonlist') &&
              <div className="field-setting__item field-setting__item--toggle">
                <p>description</p>
                <Toggle
                  onChange={this.handleDescriptionOnChange}
                  checked={this.props.fieldSchema
                    .properties[this.props.currentFieldIdInFocus].showDescription}
                  icons={false} />
              </div>
            }

            { this.renderPlaceholderSetting(field) }
            { this.renderSettingsBaseOnFieldOption(field, uiSchema) }

            <div className="field-setting__item field-setting__item--select-container">
              <div className="field-setting__select-label">
                Width in one line
              </div>
              <Select
                name="field-setting__width-percentage-select"
                value={uiSchema.column}
                onChange={this.handleSpacingSelectOnChange}
                clearable={false}
                options={[
                  { value: '12', label: '100%' },
                  { value: '9', label: '75%' },
                  { value: '8', label: '66%' },
                  { value: '6', label: '50%' },
                  { value: '4', label: '33%' },
                  { value: '3', label: '25%' },
                ]}
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
  fieldSchema: getFormFieldSchema(state),
  requiredFields: getRequiredFields(state),
  uiSchema: getFieldUiSchema(state)
})

const actions = {
  updatePropertyInFocus,
  toggleRequiredField,
  toggleShowDescription,
  toggleIsInteger,
  toggleAllowMultiple,
  updateColumn,
  toggleShowPlaceholder,
  toggleInlineCheckboxes
}


export default connect(mapState, actions)(BuilderFieldSettings)
