import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import {connect} from 'react-redux'
import FIELD_OPTION_CONFIG from '../../../../constants/fieldOptionConfig'
import DraggableFieldOption from './components/DraggableFieldOption'
import _ from 'lodash'
import {addField} from '../../../../store'

class FieldOptionsContainer extends Component {
  static propTypes = {
    addField: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }


  render() {

    return (
      <div className={this.props.className}>
        <ul className="list-group">
          {
            _.values(FIELD_OPTION_CONFIG).map((fieldOption, index) =>
              (<DraggableFieldOption
                key={index}
                optionId={fieldOption.id}
                optionLabel={fieldOption.label}
                addField={this.props.addField}
                FIELD_OPTION_CONFIG={FIELD_OPTION_CONFIG} />))
          }
        </ul>
      </div>
    )
  }
}

const actions = { addField }

export default connect(() => ({}), actions)(FieldOptionsContainer)