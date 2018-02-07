import './LabelBorderStyleSettings.scss'
import React, {Component} from 'react'
import Select from 'react-select';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import SideStyleSettings from './SideStyleSettings'
import { keys } from 'lodash'

export default class LabelBorderStyleSettings extends Component {
  static propTypes = {
    labelBorderSchema: PropTypes.object.isRequired,
    labelBorderStyle: PropTypes.string,
    labelBorderRadius: PropTypes.string,
    handleLabelBorderStyleSelect: PropTypes.func.isRequired,
    handleLabelBorderWidthOnChange: PropTypes.func.isRequired,
    handleLabelBorderRadiusOnChange: PropTypes.func.isRequired,
    toggleCssPropertyToWhichSide: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleLabelBorderApplyToAll() {
    this.props.toggleCssPropertyToWhichSide('LABEL_BORDER', 'APPLY_TO_ALL')
  }

  handleLabelBorderApplyToTop() {
    this.props.toggleCssPropertyToWhichSide('LABEL_BORDER', 'APPLY_TO_TOP')
  }

  handleLabelBorderApplyToBottom() {
    this.props.toggleCssPropertyToWhichSide('LABEL_BORDER', 'APPLY_TO_BOTTOM')
  }

  handleLabelBorderApplyToLeft() {
    this.props.toggleCssPropertyToWhichSide('LABEL_BORDER', 'APPLY_TO_LEFT')
  }

  handleLabelBorderApplyToRight() {
    this.props.toggleCssPropertyToWhichSide('LABEL_BORDER', 'APPLY_TO_RIGHT')
  }

  handleAllLabelBorderWidthOnChange(e) {
    this.props.handleLabelBorderWidthOnChange(e, 'all')
  }

  handleTopLabelBorderWidthOnChange(e) {
    this.props.handleLabelBorderWidthOnChange(e, 'top')
  }

  handleBottomLabelBorderWidthOnChange(e) {
    this.props.handleLabelBorderWidthOnChange(e, 'bottom')
  }

  handleLeftLabelBorderWidthOnChange(e) {
    this.props.handleLabelBorderWidthOnChange(e, 'left')
  }

  handleRightLabelBorderWidthOnChange(e) {
    this.props.handleLabelBorderWidthOnChange(e, 'right')
  }

  render() {
    const {
      labelBorderSchema,
      labelBorderStyle,
      labelBorderRadius,
      handleLabelBorderWidthOnChange,
      handleLabelBorderStyleSelect,
      handleLabelBorderRadiusOnChange
    } = this.props

    const sideFuncs = {
      top: {
        handleSideChecked: this.handleLabelBorderApplyToTop,
        handleInputOnChanged: this.handleTopLabelBorderWidthOnChange,
      },
      bottom: {
        handleSideChecked: this.handleLabelBorderApplyToBottom,
        handleInputOnChanged: this.handleBottomLabelBorderWidthOnChange,
      },
      left: {
        handleSideChecked: this.handleLabelBorderApplyToLeft,
        handleInputOnChanged: this.handleLeftLabelBorderWidthOnChange,
      },
      right: {
        handleSideChecked: this.handleLabelBorderApplyToRight,
        handleInputOnChanged: this.handleRightLabelBorderWidthOnChange,
      }
    }

    return (
      <div className="field-setting__item field-setting__item--group-input">
        <div className="field-setting__item--border-apply-to-all">
          <p>border</p>
          <div>
            <input
              onChange={this.handleLabelBorderApplyToAll}
              type="checkbox"
              name="border-apply-to-all"
              value="border-apply-to-all"
              checked={labelBorderSchema.applyTo.all ? 'checked' : ''}
            />
            apply to all sides
          </div>
        </div>
        {
          labelBorderSchema.applyTo.all && (
            <div className="field-subsetting__item">
              <p><i className="fa fa-caret-right"></i>
              width</p>
              <div className="field-setting__width-input-container">
                <input
                  type="number"
                  className="field-setting__width-input"
                  value={labelBorderSchema.all.width.value.replace('px', '')}
                  onChange={this.handleAllLabelBorderWidthOnChange}
                />
                <p>px</p>
              </div>
            </div>
          )
        }
        {
          !labelBorderSchema.applyTo.all && keys(sideFuncs).map(side => {
            return (
              <SideStyleSettings
                key={`label-border-${side}__checkbox`}
                side={side}
                handleSideChecked={sideFuncs[side].handleSideChecked}
                handleInputOnChanged={sideFuncs[side].handleInputOnChanged}
                checked={labelBorderSchema.applyTo[side]}
                inputValue={labelBorderSchema[side].width.value.replace('px', '')}
              />
            )
          })
        }
        <div className="field-subsetting__item">
          <p><i className="fa fa-caret-right"></i>
          radius</p>
          <div className="field-setting__width-input-container">
            <input
              type="number"
              className="field-setting__width-input"
              value={labelBorderRadius}
              onChange={handleLabelBorderRadiusOnChange}
            />
            <p>px</p>
          </div>
        </div>
        <div className="field-setting__label-border-select-container field-subsetting__item">
          <p><i className="fa fa-caret-right"></i>
          style</p>
          <Select
            name="field-setting__label-border-select"
            value={labelBorderStyle}
            onChange={handleLabelBorderStyleSelect}
            clearable={false}
            options={[
              {value: 'dotted', label: 'dotted'},
              {value: 'dashed', label: 'dashed'},
              {value: 'solid', label: 'solid'},
              {value: 'double', label: 'double'},
              {value: 'groove', label: 'groove'},
              {value: 'ridge', label: 'ridge'},
              {value: 'inset', label: 'inset'},
              {value: 'outset', label: 'outset'},
            ]}
          />
        </div>
      </div>
    )
  }
}

// const actions = {
//   toggleCssPropertyToWhichSide
// }

// {
//   applyToAll ?
//   '' :
//   <div className="field-setting__label-border-select-container field-subsetting__item">
//     <p><i className="fa fa-caret-right"></i>
//     sides</p>
//     <Select
//       name="field-setting__label-border-select"
//       multi={true}
//       value={borderSides}
//       onChange={handleLabelBorderSideSelect}
//       options={[
//         {value: 'top', label: 'top'},
//         {value: 'bottom', label: 'bottom'},
//         {value: 'left', label: 'left'},
//         {value: 'right', label: 'right'},
//       ]}
//     />
//   </div>
// }

