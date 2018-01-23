import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import EditableDiv from '../../components/EditableDiv'
import {clone} from 'lodash'

export default class TextInputField extends Component {
  static propTypes = {
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updateFieldEnum: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired,
    fieldEnum: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleEnumUpdate(fieldId, newOptionValue, optionIndex) {
    var updatedFieldEnum = clone(this.props.fieldEnum)
    updatedFieldEnum[optionIndex] = newOptionValue.trim().replace(/[<div><br><\/div>]+/g,'');
    this.props.updateFieldEnum(fieldId, updatedFieldEnum)
  }

  render() {
    return this.props.fieldEnum.map((option, index) =>
      <EditableDiv
        key={`${this.props.fieldId}-option-${index}`}
        className="draggable-field__description-input"
        propertyLabel="Type option here"
        propertyValue={option}
        changeToolbarTab={this.props.changeToolbarTab}
        updateFieldInFocus={this.props.updateFieldInFocus}
        updateProperty={this.handleEnumUpdate}
        fieldId={this.props.fieldId}
        optionIndex={index}
      />
    )
}

}
