import './index.scss'
import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {isEmpty} from 'lodash'
import {Logo} from '../../components'
import BuilderFieldOptions from './scenes/BuilderFieldOptions'
import BuilderFieldSettings from './scenes/BuilderFieldSettings'
import BuilderFieldStyling from './scenes/BuilderFieldStyling'
import BuilderToolbar from './scenes/BuilderToolbar'
import {getFormFieldSchema} from '../../store/form/field/reducer'
import {getRequiredFields} from '../../store/form/validation/reducer'
import {
  getCurrentToolbarTab,
  getCurrentFieldIdInFocus
} from '../../store/sidebar/reducer'
import {
  addField,
  changeToolbarTab,
  updateFieldInFocus,
  toggleRequiredField,
  toggleShowDescription,
  updatePropertyInFocus,
} from '../../store'

class Sidebar extends Component {
  static propTypes = {
    currentToolbarTab: PropTypes.string.isRequired,
    currentFieldIdInFocus: PropTypes.string,
    addField: PropTypes.func.isRequired,
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updatePropertyInFocus: PropTypes.func.isRequired,
    toggleRequiredField: PropTypes.func.isRequired,
    toggleShowDescription: PropTypes.func.isRequired,
    requiredFields: PropTypes.array,
    fieldSchema: PropTypes.object,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  getToolbarTabDisplay() {

    switch (this.props.currentToolbarTab) {
      case 'fieldOptions':
        return <BuilderFieldOptions
          className="builder__field-options"
          addField={this.props.addField}
          updatePropertyInFocus={this.props.updatePropertyInFocus}
          changeToolbarTab={this.props.changeToolbarTab}
          updateFieldInFocus={this.props.updateFieldInFocus} />
      case 'fieldSettings':
        return <BuilderFieldSettings />
      case 'fieldStyling':
        return <BuilderFieldStyling />
      default:
        return (<div></div>)
    }
  }

  render() {
    var isEmptyForm = isEmpty(this.props.fieldSchema.properties)

    return (
      <div className={this.props.className}>
        <Logo />
        <div className="builder__control-panel">
          <BuilderToolbar
            className="builder__toolbar"
            isEmptyForm={isEmptyForm}
            changeToolbarTab={this.props.changeToolbarTab}
            currentToolbarTab={this.props.currentToolbarTab} />
          {this.getToolbarTabDisplay()}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  currentToolbarTab: getCurrentToolbarTab(state),
  currentFieldIdInFocus: getCurrentFieldIdInFocus(state),
  fieldSchema: getFormFieldSchema(state),
  requiredFields: getRequiredFields(state),
})

const actions = {
  addField,
  changeToolbarTab,
  updateFieldInFocus,
  updatePropertyInFocus,
  toggleRequiredField,
  toggleShowDescription,
}


export default connect(mapState, actions)(Sidebar)
