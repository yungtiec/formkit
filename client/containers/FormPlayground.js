import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Form from "react-jsonschema-form";

import {FieldListOptionsContainer, FormEditor} from '../containers'
import {getForm} from '../store/form/reducer'

@DragDropContext(HTML5Backend)
class FormPlayground extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <FieldListOptionsContainer />
          </div>
          <div className="col-md-6">
            <FormEditor />
          </div>

        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  form: getForm(state)
})


FormPlayground.propTypes = {
}

export default connect(mapState)(FormPlayground)
