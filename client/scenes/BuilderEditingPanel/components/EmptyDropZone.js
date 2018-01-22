import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

const style = {
  height: '100vh',
  width: '100%',
}

const boxTarget = {
  drop(props) {
    return { fieldId: 'emptyDropZone' }
  },
}

@DropTarget('fieldOption', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class EmptyDropZone extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver

    return connectDropTarget(
      <div style={style}>
      </div>,
    )
  }
}
