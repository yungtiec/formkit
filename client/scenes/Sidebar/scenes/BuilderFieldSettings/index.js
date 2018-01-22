import './index.scss'
import './react-toggle.scss'
import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import Toggle from 'react-toggle'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import {isEmpty} from 'lodash'
import FIELD_OPTION_CONFIG from '../../../../constants/fieldOptionConfig'

export default class BuilderFieldSettings extends Component {
  static propTypes = {
    currentFieldIdInFocus: PropTypes.string,
    fieldSchema: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleRequiredOnChange() {
    this.props.toggleRequiredField(this.props.currentFieldIdInFocus)
  }

  handleDescriptionOnChange() {
    this.props.toggleShowDescription(this.props.currentFieldIdInFocus)
  }

  render() {
    const isEmptyForm = isEmpty(this.props.fieldSchema.properties)

    var field, fieldOrder
    if (isEmptyForm || !this.props.currentFieldIdInFocus) {
      return (
        <div className={this.props.className}>
          add a field first
        </div>
      )
    } else {
      field = this.props.fieldSchema.properties[this.props.currentFieldIdInFocus]
      fieldOrder = this.props.fieldSchema.order.indexOf(field.id) + 1

      return (
        <div className={this.props.className}>
          <ul className="list-group">
            <div className="field-setting__item field-setting__item--current-question">
              <span>
                <FontAwesome
                  className="fa-md"
                  name={FIELD_OPTION_CONFIG[field.fieldOptionId].icon}
                />
                {`Q${fieldOrder}`}
              </span>
              <p>{FIELD_OPTION_CONFIG[field.fieldOptionId].label}</p>
            </div>
            <div className="field-setting__item field-setting__item--toggle">
              <p>required</p>
              <Toggle
                onChange={this.handleRequiredOnChange}
                checked={this.props.requiredFields.indexOf(this.props.currentFieldIdInFocus) !== -1}
                icons={false} />
            </div>
            <div className="field-setting__item field-setting__item--toggle">
              <p>description</p>
              <Toggle
                onChange={this.handleDescriptionOnChange}
                checked={this.props.fieldSchema.properties[this.props.currentFieldIdInFocus].showDescription}
                icons={false} />
            </div>
          </ul>
        </div>
      )
    }

  }
}
