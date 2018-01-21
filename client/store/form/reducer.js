import { combineReducers } from "redux";
import * as types from './actionTypes';
import field from './field/reducer'
import ui from './ui/reducer'
import validation from './validation/reducer'

const initialState = {
  error: null,
  currentIndex: 1,
};

function tally(state = initialState, action) {
  switch (action.type) {
    case types.FIELD_ADD:
      return {...state, currentIndex: state.currentIndex + 1}
    case types.FIELD_INSERT:
      return {...state, currentIndex: state.currentIndex + 1}
    default:
      return state;
  }
}

export default combineReducers({
  tally,
  field,
  ui,
  validation
})

export function getForm(state) {
  return state.form
}

export function getLatestAddedFieldId(state) {
  return state.form.latestAddedFieldId
}
