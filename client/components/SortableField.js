import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Droppable } from 'react-drag-and-drop';

import FIELD_OPTION_CONFIG from '../constants/fieldOptionConfig'
import { swapFields, insertField } from '../store/form/actions'
import {getForm} from '../store/form/reducer'

class SortableField extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  onDrop(data) {
    var field, sourceId
    if (data['sidebar-field']) {
      field = FIELD_OPTION_CONFIG[data['sidebar-field']]
      this.props.insertField(field, this.props.dropTargetName)
    } else if (data['sortable-field']) {
      sourceId = this.props.form.schema.properties[data['sortable-field']].id
      this.props.swapFields(sourceId, this.props.dropTargetName)
    }
  }

  render() {
    console.log(this.props)
    const { id, label, help, required, description, errors, children } = this.props;
    return (
      <Droppable
        types={['sidebar-field', 'sortable-field']}
        onDrop={this.onDrop}>
        <div className="form__group">
          <label htmlFor={id}>{label}{required ? '*' : null}</label>
          {description}
          {children}
          {errors}
          {help}
        </div>
      </Droppable>
    )
  }
}

SortableField.propTypes = {
  swapFields: PropTypes.func.isRequired,
  insertField: PropTypes.func.isRequired,
  form: PropTypes.object
}

const mapState = (state) => ({
  form: getForm(state)
})

const actions = { swapFields, insertField }

export default connect(mapState, actions)(SortableField)
