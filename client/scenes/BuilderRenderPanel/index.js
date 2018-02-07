import './form-bootstrap.scss'
import './index.scss'
import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import EmptyRenderPanel from './components/EmptyRenderPanel'
import FormStylist from './components/FormStylist'
import {
  getFormJsonSchema,
  getFormUiSchema
} from '../../store/form/reducer'
import { getFormCssSchema } from '../../store/form/ui/reducer'

import Form from 'react-jsonschema-form';
import { isEmpty } from 'lodash'

const log = (type) => console.log.bind(console, type);

class BuilderRenderPanel extends Component {
  static propTypes = {
    jsonSchema: PropTypes.object,
    uiSchema: PropTypes.object,
  }

  constructor(props) {
    super(props)
    autoBind(this)

  }

  render () {
    const {jsonSchema, uiSchema, cssSchema} = this.props

    if (isEmpty(jsonSchema.properties)) return <EmptyRenderPanel />

    return (
      <div className="builder__render-panel">
        <FormStylist cssSchema={cssSchema}>
          <Form schema={jsonSchema}
            uiSchema={uiSchema}
            className="form form__default-bootstrap"
            onChange={log('changed')}
            onSubmit={log('submitted')}
            onError={log('errors')} />
        </FormStylist>

      </div>)
  }
}


const mapState = (state) => ({
  jsonSchema: getFormJsonSchema(state),
  uiSchema: getFormUiSchema(state),
  cssSchema: getFormCssSchema(state)
})

const actions = {}


export default connect(mapState, actions)(BuilderRenderPanel)
