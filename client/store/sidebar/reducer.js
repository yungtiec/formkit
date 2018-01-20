import * as types from './actionTypes';

const initialState = {
  toolbarTab: 'fieldOptions',
  fieldIdInFocus: null
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case types.TOOLBAR_TAB_CHANGED:
      return {
        ...state,
        toolbarTab: action.newToolbarTab
      }
    case types.FIELD_IN_FOCUS_UPDATED:
      return {
        ...state,
        fieldIdInFocus: action.newFieldIdInFocus
      }
    default:
      return state;
  }
}

export const getCurrentToolbarTab = state =>
  state.sidebar.toolbarTab

export const getCurrentFieldIdInFocus = state =>
  state.sidebar.fieldIdInFocus
