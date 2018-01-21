import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'


export default class TextInputField extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  render() {
    return (
      <div>
        <input className="draggable-field__title-input" type="text" placeholder="Enter your question..." />
        <span className="draggable-field__title-input-bar"></span>
      </div>
    )
  }
}
