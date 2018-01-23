import './index.scss'
import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import EditableDiv from '../../components/EditableDiv'

export default class TextInputField extends Component {
  static propTypes = {
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updateFieldTitle: PropTypes.func.isRequired,
    updateFieldDescription: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    showDescription: PropTypes.bool.isRequired
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
    this.props.changeToolbarTab('fieldSettings')
    this.props.updateFieldInFocus(this.props.fieldId)
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
    const hasTitleInput = !!this.state.title
    const hasDescriptionInput = !!this.state.description
    const hidden = {
      opacity: 0,
      margin: 0,
      padding: 0,
      height: 0,
      border: 'none'
    }

    return (
      <div>
        <EditableDiv
          className="draggable-field__title-input"
          propertyLabel="Enter your question here"
          propertyValue={this.props.title}
          changeToolbarTab={this.props.changeToolbarTab}
          updateFieldInFocus={this.props.updateFieldInFocus}
          updateProperty={this.props.updateFieldTitle}
          fieldId={this.props.fieldId}
        />
        {
          this.props.showDescription ?
          <EditableDiv
            className="draggable-field__description-input"
            propertyLabel="Type the description here"
            propertyValue={this.props.description}
            changeToolbarTab={this.props.changeToolbarTab}
            updateFieldInFocus={this.props.updateFieldInFocus}
            updateProperty={this.props.updateFieldDescription}
            fieldId={this.props.fieldId}
          /> : ''
        }

      </div>
    )
  }
}
