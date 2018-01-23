import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'


export default class EditableDiv extends Component {
  static propTypes = {
    propertyLabel: PropTypes.string.isRequired,
    propertyValue: PropTypes.string,
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updateProperty: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    optionIndex: PropTypes.number
  }

  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      property: ''
    }
  }

  componentDidMount(){
    this.refs.input.htmlEl.focus()
  }

  componentWillMount() {
    this.setState({
      property: this.props.propertyValue
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
    this.refs.input.htmlEl.focus()
    this.props.changeToolbarTab('fieldSettings')
    this.props.updateFieldInFocus(this.props.fieldId)
  }

  handleOnBlur(e){
    this.props.updateProperty(this.props.fieldId, this.state.property, this.props.optionIndex)
    this.setState({
      focus: false
    })
  }

  handleOnChange(e) {
    this.setState({
      property: e.target.value
    })
  }

  render() {
    const hasProperty = !!this.state.property

    const hidden = {
      opacity: 0,
      margin: 0,
      padding: 0,
      height: 0,
      border: 'none'
    }

    return (
      <div
        className={`${this.props.className}-container`}
        onClick={this.handleOnClick}>
        <div
          className={this.props.className}>
          <ContentEditable
            ref="input"
            html={this.state.property}
            disabled={false}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
          />
        </div>
        <div
          className={`${this.props.className}--hidden`}>
          <ContentEditable
            disabled={false}
            html={this.state.property}
          />
        </div>
        <div
          className={`${this.props.className} ${this.props.className}--placeholder`}
          style={!hasProperty && !this.state.focus ? {} : hidden}
          onClick={this.handlePlaceholderOnclick} >
          {this.props.propertyLabel}
        </div>
      </div>
    )
  }

}
