import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import {addField} from '../../store/form/actions'

const style = {
  height: '800px',
  background: 'grey'
}

const boxTarget = {
  drop() {
    return { name: 'EditingPanel' }
  },
}

@DropTarget('fieldOption', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class EditingPanel extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver

    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {isActive ? 'Release to drop' : 'Drag a box here'}
      </div>,
    )
  }
}

// const mapState = (state) => ({
// })


// const actions = { addField }

// export default connect(mapState, actions)(EditingPanel)
