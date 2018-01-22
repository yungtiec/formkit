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
  updateFieldDescription
} from '../../store'
import {
  getFormFieldSchema,
  getLatestAddedFieldId
} from '../../store/form/field/reducer'
import DraggableField from './scenes/DraggableField'
import EmptyDropZone from './components/EmptyDropZone'
import TextInputField from './components/TextInputField'
import FIELD_OPTION_CONFIG from '../../constants/fieldOptionConfig'


class BuilderEditingPanel extends Component {
  static propTypes = {
    swapFields: PropTypes.func.isRequired,
    insertField: PropTypes.func.isRequired,
    removeField: PropTypes.func.isRequired,
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updateFieldTitle: PropTypes.func.isRequired,
    updateFieldDescription: PropTypes.func.isRequired,
    fieldSchema: PropTypes.object,
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
                FIELD_OPTION_CONFIG={FIELD_OPTION_CONFIG}
                fieldOrder={this.props.fieldSchema.order}
                handleFieldOnClick={this.handleFieldOnClick}>
                <TextInputField
                  title={formFields[fieldId].title}
                  description={formFields[fieldId].description}
                  changeToolbarTab={this.props.changeToolbarTab}
                  updateFieldInFocus={this.props.updateFieldInFocus}
                  updateFieldTitle={this.props.updateFieldTitle}
                  updateFieldDescription={this.props.updateFieldDescription}
                  fieldId={fieldId} />
              </DraggableField>
            ))
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  fieldSchema: getFormFieldSchema(state),
  latestAddedFieldId: getLatestAddedFieldId(state),
})

const actions = {
  swapFields,
  insertField,
  removeField,
  changeToolbarTab,
  updateFieldInFocus,
  updateFieldTitle,
  updateFieldDescription
}


export default connect(mapState, actions)(BuilderEditingPanel)
