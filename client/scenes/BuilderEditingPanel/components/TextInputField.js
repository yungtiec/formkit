import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'


export default class TextInputField extends Component {
  static propTypes = {
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleOnClick() {
    this.props.changeToolbarTab('fieldSettings')
    this.props.updateFieldInFocus(this.props.fieldId)
  }

  render() {
    return (
      <div>
        <input
          className="draggable-field__title-input"
          type="text"
          placeholder="Enter your question..."
          onClick={this.handleOnClick} />
        <span className="draggable-field__title-input-bar"></span>
      </div>
    )
  }
}
