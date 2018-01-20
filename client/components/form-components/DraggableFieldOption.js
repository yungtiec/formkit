import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import {addField} from '../../store/form/actions'
import FIELD_OPTION_CONFIG from '../../constants/fieldOptionConfig'

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

const fieldOptionSource = {
  beginDrag(props) {
    return {
      optionLabel: props.optionLabel,
      optionId: props.optionId,
      inserted: false
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    if (!monitor.getDropResult()) return
    const dropFieldId = monitor.getDropResult().fieldId
    if (dropFieldId === 'emptyDropZone') {
      props.addField(FIELD_OPTION_CONFIG[item.optionId])
    }
  },
  isDragging(props, monitor) {
    const item = monitor.getItem()
    return item.optionId === props.optionId
  },
}

@DragSource('fieldOption', fieldOptionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class DraggableFieldOption extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    optionLabel: PropTypes.string.isRequired,
  }

  render() {
    const { isDragging, connectDragSource } = this.props
    const { optionLabel } = this.props
    const opacity = isDragging ? 0.4 : 1

    return connectDragSource(
      <div style={{ ...style, opacity }}>
        {optionLabel}
      </div>
    )
  }
}


const actions = { addField }

export default connect(() => ({}), actions)(DraggableFieldOption)
