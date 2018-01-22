import './TextInputField.scss'
import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

export default class TextInputField extends Component {
  static propTypes = {
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updateFieldTitle: PropTypes.func.isRequired,
    updateFieldDescription: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

  }

  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      title: '',
      description: '',
    }
  }

  componentWillMount() {
    this.setState({
      title: this.props.title,
      description: this.props.description,
    })
  }

  handlePlaceholderOnclick() {
    this.setState({
      focus: true
    })
    this.refs.input.htmlEl.focus()
  }

  handleOnClick() {
    this.props.changeToolbarTab('fieldSettings')
    this.props.updateFieldInFocus(this.props.fieldId)
  }

  handleTitleOnBlur(e){
    this.props.updateFieldTitle(this.props.fieldId, this.state.title)
    this.setState({
      focus: false
    })
  }

  handleTitleOnChange(e) {
    this.setState({
      title: e.target.value
    })

  }

  render() {
    const hasInput = !!this.state.title

    const hidden = {
      opacity: 0,
      margin: 0,
      padding: 0,
      height: 0,
      border: 'none'
    }

    return (
      <div>
        <div className="draggable-field__title-input-container">
          <div
            className="draggable-field__title-input">
            <ContentEditable
              ref="input"
              html={this.state.title} // innerHTML of the editable div
              disabled={false}       // use true to disable edition
              onChange={this.handleTitleOnChange}
              onBlur={this.handleTitleOnBlur}
              onClick={this.handleOnClick}// handle innerHTML change
            />
          </div>
          <div
            className="draggable-field__title-input draggable-field__title-input--placeholder"
            style={!hasInput && !this.state.focus ? {} : hidden}
            onClick={this.handlePlaceholderOnclick} >
            Enter your question here
          </div>
        </div>
      </div>
    )
  }
}
