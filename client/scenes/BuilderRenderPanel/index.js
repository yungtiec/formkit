import React from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getFormJsonSchema } from '../../store/form/reducer'
import { getFormUiSchema } from '../../store/form/ui/reducer'
import Form from "react-jsonschema-form";
import { isEmpty } from 'lodash'

const log = (type) => console.log.bind(console, type);

const BuilderRenderPanel = props => {
  return (
    <div className="builder__render-panel">
      <Form schema={props.jsonSchema}
        uiSchema={props.uiSchema}
        onChange={log('changed')}
        onSubmit={log('submitted')}
        onError={log('errors')} />
    </div>)
}

const mapState = (state) => ({
  jsonSchema: getFormJsonSchema(state),
  uiSchema: getFormUiSchema(state)
})

const actions = {}


export default connect(mapState, actions)(BuilderRenderPanel)
