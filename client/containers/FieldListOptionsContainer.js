import React, {Component} from 'react'
import autoBind from 'react-autobind';
import FIELD_OPTION_CONFIG from '../constants/fieldOptionConfig'
import {DraggableFieldOption} from '../components'
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
              (<DraggableFieldOption key={index} optionId={fieldOption.id} optionLabel={fieldOption.label} />))
          }
        </ul>
      </div>
    )
  }
}

export default FieldListOptionsContainer
