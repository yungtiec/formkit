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

const boxSource = {
  beginDrag(props) {
    return {
      optionLabel: props.optionLabel,
      optionId: props.optionId
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log(item)
    if (dropResult) {
      props.addField(FIELD_OPTION_CONFIG[item.optionId])
    }
  },
}

@DragSource('fieldOption', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class FieldOption extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    optionId: PropTypes.string.isRequired,
    optionLabel: PropTypes.string.isRequired,
    addField: PropTypes.func.isRequired,
  }

  render() {
    const { isDragging, connectDragSource } = this.props
    const { optionLabel } = this.props
    const opacity = isDragging ? 0.4 : 1

    return connectDragSource(<div style={{ ...style, opacity }}>{optionLabel}</div>)
  }
}


const mapState = (state) => ({
})


const actions = { addField }

export default connect(mapState, actions)(FieldOption)
