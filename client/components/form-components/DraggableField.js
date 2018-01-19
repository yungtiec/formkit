import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { swapFields, insertField } from '../../store/form/actions'
import { getLatestAddedFieldId } from '../../store/form/reducer'
import FIELD_OPTION_CONFIG from '../../constants/fieldOptionConfig'


const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      type: 'field'
    }
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    if (monitor.getItem().type === 'field') {
      props.moveCard(dragIndex, hoverIndex, 'field')
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    } else {
      const item = monitor.getItem()
      const dropFieldId = props.id
      if (dropFieldId && !item['inserted']) {
        props.insertField(FIELD_OPTION_CONFIG[item.optionId], dropFieldId)
        monitor.getItem().inserted = true
      } else {
        props.moveCard(props.latestAddedFieldId, hoverIndex, 'option')
        monitor.getItem().index = hoverIndex
      }
    }


  },
  drop(props, monitor) {
    monitor.getItem().dropped = true
    return { fieldId: props.id }
  }
}

@DropTarget(['fieldOption', 'draggableField'], cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: !monitor.getItem(),
  draggingType: monitor.getItemType(),
}))
@DragSource('draggableField', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class DraggableField extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    draggingType: PropTypes.string,
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    moveCard: PropTypes.func.isRequired,
    swapFields: PropTypes.func.isRequired,
    insertField: PropTypes.func.isRequired,
    latestAddedFieldId: PropTypes.string.isRequired,
  }

  render() {
    const {
      title,
      description,
      isDragging,
      connectDragSource,
      connectDropTarget,
      id,
      latestAddedFieldId,
      isOver,
      isOverCurrent,
      draggingType,
    } = this.props
    const opacity = isDragging ? 0 : 1

    const displayTitle = (latestAddedFieldId === id &&
        draggingType === 'fieldOption' && !isOver) ?
      'Your new field goes here' : title

    return connectDragSource(
      connectDropTarget(<div style={{ ...style, opacity }}>{displayTitle}</div>),
    )
  }
}


const mapState = (state) => ({
  latestAddedFieldId: getLatestAddedFieldId(state)
})


const actions = { swapFields, insertField }

export default connect(mapState, actions)(DraggableField)
