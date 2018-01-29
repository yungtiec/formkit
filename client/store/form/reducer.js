import { combineReducers } from 'redux';
import * as types from './actionTypes';
import field from './field/reducer'
import ui from './ui/reducer'
import validation from './validation/reducer'
import { createSelector } from 'reselect'
import { getFormField } from './field/reducer'
import { getRequiredFields } from './validation/reducer'

const initialState = {
  error: null,
  currentIndex: 1,
  title: 'Untitled form',
  description: 'Enter some description for your form here'
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function updateFormTitle(state, { title }) {
  state.title = title;
  return { ...state, error: null };
}

function updateFormDescription(state, { description }) {
  state.description = description;
  return { ...state, error: null };
}

function tally(state = initialState, action) {
  switch (action.type) {
    case types.FIELD_ADD:
      return { ...state, currentIndex: state.currentIndex + 1 }
    case types.FIELD_INSERT:
      return { ...state, currentIndex: state.currentIndex + 1 }
    case types.FORM_RESET:
      return initialState;
    case types.FORM_UPDATE_TITLE:
      return updateFormTitle(clone(state), action.title);
    case types.FORM_UPDATE_DESCRIPTION:
      return updateFormDescription(clone(state), action.description);
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

// decode html here
// look for <script> keyword to prevent injection
export const getFormJsonSchema = createSelector(
  getFormField,
  getRequiredFields,
  (field, required) => ({
    title: field.title,
    description: field.description,
    type: field.type,
    properties: field.schema.properties,
    required
  })
)
