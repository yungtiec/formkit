import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import ContentEditable from '../../../components/react-contenteditable'
import { clone } from 'lodash'

const createKeyDownHandler = ({
    property,
    traverseArray,
    updatePropertyInFocus,
    updateFieldInFocus,
    currentFieldIdInFocus,
    fieldOrder}) => e => {
  var nextTraverseIndex, nextFieldIdOrderIndex


  if (e.key === 'ArrowUp' || e.shiftKey && e.key === 'Tab') {
    e.preventDefault()
    nextTraverseIndex = traverseArray.indexOf(property) + -1
    if (nextTraverseIndex < 0) {
      nextFieldIdOrderIndex = fieldOrder.indexOf(currentFieldIdInFocus) - 1
      if (nextFieldIdOrderIndex < 0) {
        updatePropertyInFocus(null, fieldOrder[fieldOrder.length - 1])
        updateFieldInFocus(fieldOrder[fieldOrder.length - 1])
      } else {
        updatePropertyInFocus(null, fieldOrder[nextFieldIdOrderIndex])
        updateFieldInFocus(fieldOrder[nextFieldIdOrderIndex])
      }
    } else {
      updatePropertyInFocus(traverseArray[nextTraverseIndex])
    }
  } else if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'Tab') {
    e.preventDefault()
    nextTraverseIndex = traverseArray.indexOf(property) + 1
    if (nextTraverseIndex >= traverseArray.length) {
      nextFieldIdOrderIndex = fieldOrder.indexOf(currentFieldIdInFocus) + 1

      if (nextFieldIdOrderIndex >= fieldOrder.length) {
        updatePropertyInFocus('title')
        updateFieldInFocus(fieldOrder[0])
      } else {
        updatePropertyInFocus('title')
        updateFieldInFocus(fieldOrder[nextFieldIdOrderIndex])
      }
    } else {
      updatePropertyInFocus(traverseArray[nextTraverseIndex])
    }
  }
}

export default class EditableDiv extends Component {
  static propTypes = {
    property: PropTypes.string.isRequired,
    propertyLabel:  PropTypes.string.isRequired,
    propertyValue: PropTypes.string,
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updateProperty: PropTypes.func.isRequired,
    updatePropertyInFocus: PropTypes.func.isRequired,
    fieldId: PropTypes.string.isRequired,
    currentFieldIdInFocus: PropTypes.string.isRequired,
    currentPropertyInFocus: PropTypes.string.isRequired,
    traverseArray: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired,
    optionIndex: PropTypes.number,
    handleKeyDown: PropTypes.func,
    fieldOrder: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {}
  }

  componentDidMount() {
    if (this.props.currentFieldIdInFocus === this.props.fieldId &&
        this.props.currentPropertyInFocus === this.props.property) {
      this.refs.input.htmlEl.focus()
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.currentPropertyInFocus === this.props.currentPropertyInFocus &&
        prevProps.currentFieldIdInFocus === this.props.currentFieldIdInFocus) return
    if (this.props.currentFieldIdInFocus === this.props.fieldId &&
        this.props.currentPropertyInFocus === this.props.property) {
      this.refs.input.htmlEl.focus()
    }

  }

  handlePlaceholderOnclick() {
    // because of its z-index, probably never invoke
    // placeholder is always beneath input
    this.setState({
      focus: true
    })
    this.refs.input.htmlEl.focus()
    this.props.changeToolbarTab('fieldSettings')
    this.props.updateFieldInFocus(this.props.fieldId)
  }

  handleOnClick() {
    this.setState({
      focus: true
    })
    this.refs.input.htmlEl.focus()
    this.props.changeToolbarTab('fieldSettings')
    this.props.updateFieldInFocus(this.props.fieldId)
    this.props.updatePropertyInFocus(this.props.property)
  }

  handleOnBlur(e){
    this.setState({
      focus: false
    })
  }

  handleOnChange(e) {
    if (e.target.value !== this.props.propertyValue) {
      this.props.updateProperty(
        this.props.fieldId,
        e.target.value,
        this.props.optionIndex)
      this.setState({
        property: e.target.value
      })
    }

  }

  handleOptionKeyDown(e) {
    const {
      fieldId,
      property,
      optionIndex,
      traverseArray,
      currentPropertyInFocus,
      currentFieldIdInFocus,
      fieldOrder,
      updatePropertyInFocus,
      updateFieldInFocus,
      updateProperty,
      addEnum
    } = this.props

    const shiftTab = clone(e.shiftKey && e.key === 'Tab')
    var nextTraverseIndex, nextFieldIdOrderIndex
    if (shiftTab || (e.key === 'ArrowUp')) {
      e.preventDefault()
      if (this.state.property) {
        updateProperty(
          fieldId,
          this.state.property,
          optionIndex)
      }
      nextTraverseIndex = traverseArray
        .indexOf(property) - 1
      if (nextTraverseIndex < 0) {
        nextFieldIdOrderIndex = fieldOrder.indexOf(currentFieldIdInFocus) - 1
        if (nextFieldIdOrderIndex < 0) {
          updatePropertyInFocus(null, fieldOrder[fieldOrder.length - 1])
          updateFieldInFocus(fieldOrder[fieldOrder.length - 1])
        } else {
          updatePropertyInFocus(null, fieldOrder[nextFieldIdOrderIndex])
          updateFieldInFocus(fieldOrder[nextFieldIdOrderIndex])
        }
      } else {
        updatePropertyInFocus(traverseArray[nextTraverseIndex])
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      var nextPropertyInFocus = Number(currentPropertyInFocus) + 1
      if (this.state.property) {
        updateProperty(
          fieldId,
          this.state.property,
          optionIndex)
      }
      addEnum(fieldId, currentPropertyInFocus)
      updatePropertyInFocus(nextPropertyInFocus.toString())
    } else if (e.key === 'ArrowDown' || e.key === 'Tab') {
      e.preventDefault()
      if (this.state.property) {
        updateProperty(
          fieldId,
          this.state.property,
          optionIndex)
      }
      nextTraverseIndex = traverseArray
        .indexOf(property) + 1
      if (nextTraverseIndex >= traverseArray.length) {
      nextFieldIdOrderIndex = fieldOrder.indexOf(currentFieldIdInFocus) + 1

      if (nextFieldIdOrderIndex >= fieldOrder.length) {
          updatePropertyInFocus('title')
          updateFieldInFocus(fieldOrder[0])
        } else {
          updatePropertyInFocus('title')
          updateFieldInFocus(fieldOrder[nextFieldIdOrderIndex])
        }
      } else {
        updatePropertyInFocus(traverseArray[nextTraverseIndex])
      }
    }
  }


  handleKeyDown(e) {

    var handleTitleKeyDown = createKeyDownHandler({
      property: 'title',
      traverseArray: this.props.traverseArray,
      updatePropertyInFocus: this.props.updatePropertyInFocus,
      updateFieldInFocus: this.props.updateFieldInFocus,
      currentFieldIdInFocus: this.props.currentFieldIdInFocus,
      fieldOrder: this.props.fieldOrder
    })


    var handleDescriptionKeyDown = createKeyDownHandler({
      property: 'description',
      traverseArray: this.props.traverseArray,
      updatePropertyInFocus: this.props.updatePropertyInFocus,
      updateFieldInFocus: this.props.updateFieldInFocus,
      currentFieldIdInFocus: this.props.currentFieldIdInFocus,
      fieldOrder: this.props.fieldOrder
    })

    switch (this.props.property) {
      case 'title':
        handleTitleKeyDown(e)
        break
      case 'description':
        handleDescriptionKeyDown(e)
        break
      default:
        this.handleOptionKeyDown(e)
    }

  }

  render() {
    const hasProperty = !!this.props.propertyValue

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
            html={this.props.propertyValue}
            disabled={false}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div
          className={`${this.props.className}--hidden`}>
          <ContentEditable
            disabled={false}
            html={this.props.propertyValue}
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
