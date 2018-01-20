import './form-layout.scss'
import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {swapFields} from '../store/form/actions'
import {getForm} from '../store/form/reducer'
import {DraggableField, EmptyDropZone} from '../components'

class FormEditor extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  moveCard(dragIndexOrId, hoverIndex, fieldType) {
    if (!this.props.form) return
    var uiOrder = this.props.form.uiSchema['ui:order']
    const dragFieldId = fieldType === 'field' ? uiOrder[dragIndexOrId] : dragIndexOrId
    if (!dragFieldId) return
    const hoverFieldId = uiOrder[hoverIndex]
    this.props.swapFields(dragFieldId, hoverFieldId)
  }

  render() {

    const isEmptyFrom = _.isEmpty(this.props.form.schema.properties)

    const formFields = isEmptyFrom ?
      null : this.props.form.schema.properties

    return (
      <div>
        {
          isEmptyFrom ?
          <EmptyDropZone /> :
          this.props.form.uiSchema['ui:order']
            .map((fieldId, index) => (
              <DraggableField
                {...formFields[fieldId]}
                key={index}
                index={index}
                moveCard={this.moveCard} />
            ))
        }
      </div>
    )
  }
}

FormEditor.propTypes = {
  swapFields: PropTypes.func.isRequired

}


const mapState = (state) => ({
  form: getForm(state)
})


const actions = { swapFields }

export default connect(mapState, actions)(FormEditor)
