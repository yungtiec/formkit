import React, {Component} from 'react'
import { Draggable } from "react-drag-and-drop";

export const DraggableFieldOption = props => {
  const {
    children,
    fieldOption
  } = props;
  return (
    <Draggable type="sidebar-field" data={fieldOption}>
      {children}
    </Draggable>
  );
}
