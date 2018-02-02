import './EmptyRenderPanel.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';

class EmptyRenderPanel extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  render() {
    return (
      <div className="builder__render-panel builder__render-panel--empty">
        <h4>Your new form will show up here</h4>
        <div className="empty-panel__stripe-pattern"></div>
      </div>
    )
  }
}

export default EmptyRenderPanel
