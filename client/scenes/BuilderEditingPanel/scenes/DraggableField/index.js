import './index.scss'
import React, { Component } from 'react'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import FontAwesome from 'react-fontawesome'

const fieldSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id
  }
}

const fieldTarget = {
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
    if (monitor.getItemType() === 'draggableField') {
      props.moveCard(dragIndex, hoverIndex, 'field')
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    } else if (monitor.getItemType() === 'fieldOption') {
      const item = monitor.getItem()
      const dropFieldId = props.id
      if (dropFieldId && !item['inserted']) {
        props.insertField(props.FIELD_OPTION_CONFIG[item.optionId], dropFieldId)
        props.changeToolbarTab('fieldSettings')
        props.updateFieldInFocus()
        props.updatePropertyInFocus('title')
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

@DropTarget(['fieldOption', 'draggableField'], fieldTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: !monitor.getItem(),
  draggingType: monitor.getItemType(),
}))
@DragSource('draggableField', fieldSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class DraggableField extends Component {
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
    latestAddedFieldId: PropTypes.string.isRequired,
    fieldIcon: PropTypes.string.isRequired,
    swapFields: PropTypes.func.isRequired,
    insertField: PropTypes.func.isRequired,
    removeField: PropTypes.func.isRequired,
    changeToolbarTab: PropTypes.func.isRequired,
    updateFieldInFocus: PropTypes.func.isRequired,
    updatePropertyInFocus: PropTypes.func.isRequired,
    handleFieldOnClick: PropTypes.func.isRequired,
    fieldOrder: PropTypes.array
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  handleRemove() {
    var newFieldInFocusByOrderIndex = this.props.index - 1;
    if (newFieldInFocusByOrderIndex === -1) {
      newFieldInFocusByOrderIndex = this.props.index + 1
    }
    this.props.removeField(this.props.id)
    this.props.updateFieldInFocus(
      this.props.fieldOrder[newFieldInFocusByOrderIndex] || 'none')
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
      draggingType,
      fieldIcon,
      index,
      children
    } = this.props
    const opacity = isDragging ? 0 : 1

    const displayTitle = (latestAddedFieldId === id &&
        draggingType === 'fieldOption' && !isOver) ?
      'Your new field goes here' : ''

    return connectDragSource(
      connectDropTarget(
        <div
          className="builder__draggable-field"
          style={{ opacity }}>
          <div className="draggable-field__control-btn-group">
            <div
              className="draggable-field__control-btn question">
              <p>
                <FontAwesome
                  className="fa-md"
                  name={fieldIcon}
                />
                {`Q${index + 1}`}
              </p>
            </div>

            <div className="draggable-field__control-btn arrows">
              <FontAwesome
                className="fa-md"
                name="arrows"
              />
            </div>
            <div className="draggable-field__control-btn trash-o" onClick={this.handleRemove}>
              <FontAwesome
                className="fa-md"
                name="trash-o"
              />
            </div>
          </div>
          <div
            className="draggable-field__field-container">
            {
              (latestAddedFieldId === id &&
                draggingType === 'fieldOption' && !isOver) ?
              <div className="draggable-field__drag-preview">Your new field goes here</div> :
              children
            }
            </div>
        </div>)
    )
  }
}

