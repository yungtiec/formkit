import React, {Component} from 'react'
import autoBind from 'react-autobind';
import {connect} from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import {
  BuilderEditingPanel,
  BuilderRenderPanel,
  Sidebar
}
from '../scenes'
import {getForm} from '../store/form/reducer'

@DragDropContext(HTML5Backend)
class FormPlayground extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }


  render() {
    return (
      <div className="form-builder">
        <Sidebar className="form-builder__sidebar" />
        <div className="form-builder__container">
          <div className="form-builder__nav">
          </div>
          <div className="form-builder__content">
            <BuilderEditingPanel className="builder__editing-panel"/>
            <BuilderRenderPanel className="builder__render-panel"/>
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
