import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import FIELD_OPTION_CONFIG from '../constants/fieldOptionConfig'
import {FieldOption} from '../components'
import _ from 'lodash'

class FieldListOptionsContainer extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }


  render() {

    return (
      <div>
        <ul className="list-group">
          {
            _.values(FIELD_OPTION_CONFIG).map((fieldOption, index) =>
              (<FieldOption key={index} optionId={fieldOption.id} optionLabel={fieldOption.label} />))
          }
        </ul>
      </div>
    )
  }
}

FieldListOptionsContainer.propTypes = {
}

export default FieldListOptionsContainer
