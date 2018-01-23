import './FieldSelectValue.scss'
import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind';


export default class FieldSelectValue extends Component {
  static propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.object
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  render() {

    return (
     <div className="Select-value" title={this.props.value.label}>
        <span className="Select-value-label">
          <FontAwesome
            className="fa-md"
            name={this.props.value.icon}
          />
          <p>{this.props.value.label}</p>
        </span>


    </div>
    )
  }
}
