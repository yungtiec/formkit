import './FieldSelectOption.scss'
import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind';

export default class FieldSelectOption extends Component {
  static propTypes = {
    children: PropTypes.node,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }

  handleMouseEnter (event) {
    this.props.onFocus(this.props.option, event);
  }

  handleMouseMove (event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  }


  render() {
    return (
      <div className="field-setting__item--select-option"
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}>
        <span>
          <FontAwesome
            className="fa-md"
            name={this.props.option.icon}
          />
        </span>
        <p>{this.props.option.label}</p>
      </div>
    )
  }
}
