import React, {Component} from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'

export default class SideStyleSettings extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    side: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    handleSideChecked: PropTypes.func.isRequired,
    handleInputOnChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  render() {
    const {
      inputValue,
      checked,
      side,
      handleSideChecked,
      handleInputOnChanged
    } = this.props

    return (
      <div className="field-subsetting__item">
        <p>
          <input
            onChange={handleSideChecked}
            type="checkbox"
            name={`border-apply-to-${side}`}
            value={`border-apply-to-${side}`}
            checked={checked ? 'checked' : ''}
          />
          {side}
        </p>
        <div className="field-setting__width-input-container">
          <input
            type="number"
            className="field-setting__width-input"
            value={inputValue}
            onChange={handleInputOnChanged}
          />
          <p>px</p>
        </div>
      </div>
    )
  }
}
