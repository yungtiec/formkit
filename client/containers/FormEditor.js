import './form-layout.scss'
import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import { Draggable, Droppable } from "react-drag-and-drop";
import PropTypes from 'prop-types'
import Form from "react-jsonschema-form";
import _ from 'lodash'
import update from 'immutability-helper'

import FIELD_OPTION_CONFIG from '../constants/fieldOptionConfig'
import {addField, swapFields} from '../store/form/actions'
import {getForm} from '../store/form/reducer'
import {SortableField, TextInputField, EditableField, EditingPanel} from '../components'

class FormEditor extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      'ui:order': []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.form) {
      this.setState({
        'ui:order': nextProps.form.uiSchema['ui:order']
      })
    }

  }


  droppableWrapper(props) {
    const name = props.id.slice(5)
    return props.id !== 'root' ? (
      <Draggable type="sortable-field" data={name}>
        <SortableField {...props} dropTargetName={name}/>
      </Draggable>
    ) : (
      <div className="form__inner">
        {props.children}
      </div>
    )
  }

  onDropEmptyForm(data) {
    const field = FIELD_OPTION_CONFIG[data['sidebar-field']]
    this.props.addField(field)
  }

  moveCard(dragIndex, hoverIndex) {
    if (!this.props.form) return
    var uiOrder = this.props.form.uiSchema['ui:order']
    const dragFieldId = uiOrder[dragIndex]
    if (!dragFieldId) return
    const hoverFieldId = uiOrder[hoverIndex]
    console.log(dragFieldId, hoverFieldId)
    this.props.swapFields(dragFieldId, hoverFieldId)
  }

  render() {

    const dropAreaContainerStyle = {
      height: '800px',
      background: 'grey'
    }

    const dropAreaStyle = {
      height: '100%'
    }

    const isEmptyFrom = _.isEmpty(this.props.form.schema.properties)

    const fields = {textinput: TextInputField};

    const formFields = isEmptyFrom ? null : this.props.form.schema.properties
    console.log(this.props.form.uiSchema['ui:order'])
    return (
      <div>
        {
          isEmptyFrom ?
          <EditingPanel /> :
          this.props.form.uiSchema['ui:order'].map((fieldId, i) => (
            <EditableField {...formFields[fieldId]} key={i} index={i} moveCard={this.moveCard} dropTargetName={formFields[fieldId].id}/>

          ))
        }
      </div>
    )
  }
}

FormEditor.propTypes = {
  addField: PropTypes.func.isRequired

}


const mapState = (state) => ({
  form: getForm(state)
})


const actions = { addField, swapFields }

export default connect(mapState, actions)(FormEditor)
