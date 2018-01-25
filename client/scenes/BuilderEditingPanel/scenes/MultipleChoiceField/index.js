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
    addEnum: PropTypes.func.isRequired,
    updatePropertyInFocus: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired,
    fieldEnum: PropTypes.array.isRequired,
    currentFieldIdInFocus: PropTypes.string,
    currentPropertyInFocus: PropTypes.string,
    traverseArray: PropTypes.array.isRequired,
    fieldOrder: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleEnumUpdate(fieldId, newOptionValue, optionIndex) {
    var updatedFieldEnum = clone(this.props.fieldEnum)
    updatedFieldEnum[optionIndex] = newOptionValue.trim();
    this.props.updateFieldEnum(fieldId, updatedFieldEnum)
  }

  render() {
    return this.props.fieldEnum.map((option, index) =>
      <EditableDiv
        handleKeyDown={this.handleKeyDown}
        key={`${this.props.fieldId}-option-${index}`}
        index={index}
        property={index.toString()}
        className="draggable-field__description-input"
        propertyLabel="Type option here"
        propertyValue={option}
        changeToolbarTab={this.props.changeToolbarTab}
        updateFieldInFocus={this.props.updateFieldInFocus}
        updateProperty={this.handleEnumUpdate}
        updatePropertyInFocus={this.props.updatePropertyInFocus}
        addEnum={this.props.addEnum}
        fieldId={this.props.fieldId}
        currentFieldIdInFocus={this.props.currentFieldIdInFocus}
        currentPropertyInFocus={this.props.currentPropertyInFocus}
        optionIndex={index}
        traverseArray={this.props.traverseArray}
        fieldOrder={this.props.fieldOrder}
      />
    )
}

}
