import './EmptyDropZone.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { doesBrowserSupportSVG } from '../../../utils'

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

    var placeholderSource = './assets/paint-roller.svg'

    if (!doesBrowserSupportSVG()) {
      placeholderSource = './assets/paint-roller.png'
    }

    return connectDropTarget(
      <div className="editing-panel__empty-drop-zone">
        <div className="empty-drop-zone__placeholder-container">
          <h4>Drag and drop a field here</h4>
          <img
            height="120px"
            className="logo__large"
            src={placeholderSource} />
        </div>
      </div>
    )
  }
}
