import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  swapFields,
  insertField,
  removeField,
  changeToolbarTab,
  updateFieldInFocus,
  updateFieldTitle,
  updateFieldDescription,
  updateFieldPlaceholder,
  updateFieldEnum,
  addEnum,
  updatePropertyInFocus
} from '../../store'
import {
  getFieldUiSchema
} from '../../store/form/ui/reducer'
import {
  getFormFieldSchema,
  getLatestAddedFieldId
} from '../../store/form/field/reducer'
import {
  getCurrentFieldIdInFocus
} from '../../store/sidebar/reducer'
import {
  getCurrentPropertyInFocus
} from '../../store/keyNavigation/reducer'
import DraggableField from './scenes/DraggableField'
import TextInputField from './scenes/TextInputField'
import MultipleChoiceField from './scenes/MultipleChoiceField'
import EmptyDropZone from './components/EmptyDropZone'
import FIELD_OPTION_CONFIG from '../../constants/fieldOptionConfig'


class BuilderEditingPanel extends Component {
  static propTypes = {
    swapFields: PropTypes.func.isRequired,
    insertField: PropTypes.func.isRequired,
    removeField: PropTypes.func.isRequired,
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updatePropertyInFocus: PropTypes.func.isRequired,
    updateFieldTitle: PropTypes.func.isRequired,
    updateFieldDescription: PropTypes.func.isRequired,
    updateFieldPlaceholder: PropTypes.func.isRequired,
    updateFieldEnum: PropTypes.func.isRequired,
    addEnum: PropTypes.func.isRequired,
    fieldSchema: PropTypes.object,
    formUiSchema: PropTypes.object,
    latestAddedFieldId: PropTypes.string
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  moveCard(dragIndexOrId, hoverIndex, fieldType) {
    if (!this.props.fieldSchema) return
    const uiOrder = this.props.fieldSchema.order
    const dragFieldId = fieldType === 'field' ? uiOrder[dragIndexOrId] : dragIndexOrId
    if (!dragFieldId) return
    const hoverFieldId = uiOrder[hoverIndex]
    this.props.swapFields(dragFieldId, hoverFieldId)
  }


  handleFieldOnClick() {
    this.inputElement.focus();
  }

  render() {

    const isEmptyFrom = _.isEmpty(this.props.fieldSchema.properties)

    const formFields = isEmptyFrom ?
      null : this.props.fieldSchema.properties

    return (
      <div className={this.props.className}>
        {
          isEmptyFrom ?
          <EmptyDropZone
            changeToolbarTab={this.props.changeToolbarTab}
            updateFieldInFocus={this.props.updateFieldInFocus} /> :
          this.props.fieldSchema.order
            .map((fieldId, index) => (
              <DraggableField
                {...formFields[fieldId]}
                key={index}
                index={index}
                moveCard={this.moveCard}
                swapFields={this.props.swapFields}
                insertField={this.props.insertField}
                removeField={this.props.removeField}
                latestAddedFieldId={this.props.latestAddedFieldId}
                changeToolbarTab={this.props.changeToolbarTab}
                updateFieldInFocus={this.props.updateFieldInFocus}
                updatePropertyInFocus={this.props.updatePropertyInFocus}
                FIELD_OPTION_CONFIG={FIELD_OPTION_CONFIG}
                fieldOrder={this.props.fieldSchema.order}
                handleFieldOnClick={this.handleFieldOnClick}>

                <TextInputField
                  title={formFields[fieldId].htmlEncodedTitle}
                  description={this.props.formUiSchema[fieldId].htmlEncodedDescription}
                  showDescription={formFields[fieldId].showDescription}
                  placeholder={this.props.formUiSchema[fieldId].htmlEncodedPlaceholder}
                  showPlaceholder={formFields[fieldId].showPlaceholder}
                  changeToolbarTab={this.props.changeToolbarTab}
                  updateFieldInFocus={this.props.updateFieldInFocus}
                  updateFieldTitle={this.props.updateFieldTitle}
                  updateFieldDescription={this.props.updateFieldDescription}
                  updateFieldPlaceholder={this.props.updateFieldPlaceholder}
                  fieldId={fieldId}
                  currentFieldIdInFocus={this.props.currentFieldIdInFocus}
                  currentPropertyInFocus={this.props.currentPropertyInFocus}
                  updatePropertyInFocus={this.props.updatePropertyInFocus}
                  traverseArray={formFields[fieldId].traverseArray}
                  fieldOrder={this.props.fieldSchema.order} />
                {

                  (formFields[fieldId].fieldOptionId === 'multiple-checkbox' ||
                  formFields[fieldId].fieldOptionId === 'select' ||
                  formFields[fieldId].fieldOptionId === 'radiobuttonlist') ?
                    <MultipleChoiceField
                      changeToolbarTab={this.props.changeToolbarTab}
                      updateFieldInFocus={this.props.updateFieldInFocus}
                      updateFieldEnum={this.props.updateFieldEnum}
                      fieldId={fieldId}
                      fieldEnum={formFields[fieldId].htmlEncodedEnum || formFields[fieldId].items.htmlEncodedEnum}
                      addEnum={this.props.addEnum}
                      currentFieldIdInFocus={this.props.currentFieldIdInFocus}
                      currentPropertyInFocus={this.props.currentPropertyInFocus}
                      updatePropertyInFocus={this.props.updatePropertyInFocus}
                      traverseArray={formFields[fieldId].traverseArray}
                      fieldOrder={this.props.fieldSchema.order} /> :
                    ''
                }

              </DraggableField>
            ))
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  fieldSchema: getFormFieldSchema(state),
  formUiSchema: getFieldUiSchema(state),
  latestAddedFieldId: getLatestAddedFieldId(state),
  currentFieldIdInFocus: getCurrentFieldIdInFocus(state),
  currentPropertyInFocus: getCurrentPropertyInFocus(state)
})

const actions = {
  swapFields,
  insertField,
  removeField,
  changeToolbarTab,
  updateFieldInFocus,
  updatePropertyInFocus,
  updateFieldTitle,
  updateFieldDescription,
  updateFieldPlaceholder,
  updateFieldEnum,
  addEnum
}


export default connect(mapState, actions)(BuilderEditingPanel)
