import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  swapFields,
  insertField,
  changeToolbarTab,
  updateFieldInFocus
} from '../../store'
import {getForm, getLatestAddedFieldId} from '../../store/form/reducer'
import DraggableField from './scenes/DraggableField'
import EmptyDropZone from './components/EmptyDropZone'
import TextInputField from './components/TextInputField'
import FIELD_OPTION_CONFIG from '../../constants/fieldOptionConfig'


class BuilderEditingPanel extends Component {
  static propTypes = {
    swapFields: PropTypes.func.isRequired,
    insertField: PropTypes.func.isRequired,
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    form: PropTypes.object,
    latestAddedFieldId: PropTypes.string
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  moveCard(dragIndexOrId, hoverIndex, fieldType) {
    if (!this.props.form) return
    const uiOrder = this.props.form.uiSchema['ui:order']
    const dragFieldId = fieldType === 'field' ? uiOrder[dragIndexOrId] : dragIndexOrId
    if (!dragFieldId) return
    const hoverFieldId = uiOrder[hoverIndex]
    this.props.swapFields(dragFieldId, hoverFieldId)
  }

  render() {

    const isEmptyFrom = _.isEmpty(this.props.form.schema.properties)

    const formFields = isEmptyFrom ?
      null : this.props.form.schema.properties

    const formUiSchema = isEmptyFrom ?
      null : this.props.form.uiSchema

    return (
      <div className={this.props.className}>
        {
          isEmptyFrom ?
          <EmptyDropZone
            changeToolbarTab={this.props.changeToolbarTab}
            updateFieldInFocus={this.props.updateFieldInFocus} /> :
          this.props.form.uiSchema['ui:order']
            .map((fieldId, index) => (
              <DraggableField
                {...formFields[fieldId]}
                key={index}
                index={index}
                moveCard={this.moveCard}
                swapFields={this.props.swapFields}
                insertField={this.props.insertField}
                latestAddedFieldId={this.props.latestAddedFieldId}
                changeToolbarTab={this.props.changeToolbarTab}
                updateFieldInFocus={this.props.updateFieldInFocus}
                FIELD_OPTION_CONFIG={FIELD_OPTION_CONFIG}>
                <TextInputField />
              </DraggableField>
            ))
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  form: getForm(state),
  latestAddedFieldId: getLatestAddedFieldId(state),
})

const actions = {
  swapFields,
  insertField,
  changeToolbarTab,
  updateFieldInFocus
}


export default connect(mapState, actions)(BuilderEditingPanel)
