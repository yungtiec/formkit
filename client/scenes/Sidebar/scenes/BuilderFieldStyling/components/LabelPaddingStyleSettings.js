import React, {Component} from 'react'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import SideStyleSettings from './SideStyleSettings'
import { keys } from 'lodash'

export default class LabelPaddingStyleSettings extends Component {
  static propTypes = {
    labelPaddingSchema: PropTypes.object.isRequired,
    toggleCssPropertyToWhichSide: PropTypes.func.isRequired,
    handleLabelPaddingSizeOnChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleLabelPaddingApplyToAll() {
    this.props.toggleCssPropertyToWhichSide('LABEL_PADDING', 'APPLY_TO_ALL')
  }

  handleLabelPaddingApplyToTop() {
    this.props.toggleCssPropertyToWhichSide('LABEL_PADDING', 'APPLY_TO_TOP')
  }

  handleLabelPaddingApplyToBottom() {
    this.props.toggleCssPropertyToWhichSide('LABEL_PADDING', 'APPLY_TO_BOTTOM')
  }

  handleLabelPaddingApplyToLeft() {
    this.props.toggleCssPropertyToWhichSide('LABEL_PADDING', 'APPLY_TO_LEFT')
  }

  handleLabelPaddingApplyToRight() {
    this.props.toggleCssPropertyToWhichSide('LABEL_PADDING', 'APPLY_TO_RIGHT')
  }

  handleAllLabelPaddingSizeOnChange(e) {
    this.props.handleLabelPaddingSizeOnChange(e, 'all')
  }

  handleTopLabelPaddingSizeOnChange(e) {
    this.props.handleLabelPaddingSizeOnChange(e, 'top')
  }

  handleBottomLabelPaddingSizeOnChange(e) {
    this.props.handleLabelPaddingSizeOnChange(e, 'bottom')
  }

  handleLeftLabelPaddingSizeOnChange(e) {
    this.props.handleLabelPaddingSizeOnChange(e, 'left')
  }

  handleRightLabelPaddingSizeOnChange(e) {
    this.props.handleLabelPaddingSizeOnChange(e, 'right')
  }

  render() {
    const {
      labelPaddingSchema,
      toggleCssPropertyToWhichSide,
      handleLabelPaddingSizeOnChange,
    } = this.props

    const sideFuncs = {
      top: {
        handleSideChecked: this.handleLabelPaddingApplyToTop,
        handleInputOnChanged: this.handleTopLabelPaddingSizeOnChange,
      },
      bottom: {
        handleSideChecked: this.handleLabelPaddingApplyToBottom,
        handleInputOnChanged: this.handleBottomLabelPaddingSizeOnChange,
      },
      left: {
        handleSideChecked: this.handleLabelPaddingApplyToLeft,
        handleInputOnChanged: this.handleLeftLabelPaddingSizeOnChange,
      },
      right: {
        handleSideChecked: this.handleLabelPaddingApplyToRight,
        handleInputOnChanged: this.handleRightLabelPaddingSizeOnChange,
      }
    }

    return (
      <div className="field-setting__item field-setting__item--group-input">
        <div className="field-setting__item--border-apply-to-all">
          <p>padding</p>
          <div>
            <input
              onChange={this.handleLabelPaddingApplyToAll}
              type="checkbox"
              name="padding-apply-to-all"
              value="padding-apply-to-all"
              checked={labelPaddingSchema.applyTo.all ? 'checked' : ''}
            />
            apply to all sides
          </div>
        </div>
        {
          labelPaddingSchema.applyTo.all && (
            <div className="field-subsetting__item">
              <p><i className="fa fa-caret-right"></i>
              width</p>
              <div className="field-setting__width-input-container">
                <input
                  type="number"
                  className="field-setting__width-input"
                  value={labelPaddingSchema.all.width.value.replace('px', '')}
                  onChange={this.handleAllLabelPaddingSizeOnChange}
                />
                <p>px</p>
              </div>
            </div>
          )
        }
        {
          !labelPaddingSchema.applyTo.all && keys(sideFuncs).map(side => {
            return (
              <SideStyleSettings
                key={`label-padding-${side}__checkbox`}
                side={side}
                handleSideChecked={sideFuncs[side].handleSideChecked}
                handleInputOnChanged={sideFuncs[side].handleInputOnChanged}
                checked={labelPaddingSchema.applyTo[side]}
                inputValue={labelPaddingSchema[side].width.value.replace('px', '')}
              />
            )
          })
        }
      </div>
    )
  }
}
