import * as generalTypes from '../actionTypes';
import * as validationTypes from './actionTypes'

const initialState = {
  error: null,
  required: [],
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function removeField(state, fieldId) {
  const requiredFields = state.required || []
  state.required = requiredFields
    .filter(requiredFieldId => fieldId !== requiredFieldId)
  if (state.required.length === 0) {
    state.required = []
  }
  return { ...state, error: null }
}

function updateRequiredArary(state, fieldId) {
  if (state.required.indexOf(fieldId) !== -1) {
    removeField(state, fieldId)
  } else {
    state.required.push(fieldId)
  }
  return { ...state, error: null }
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case generalTypes.FIELD_REMOVE:
      return removeField(clone(state), action.fieldId);

    case validationTypes.REQUIRED_FIELD_TOGGLED:
      return updateRequiredArary(clone(state), action.fieldId)
    default:
      return state;
  }
}

export const getRequiredFields = state =>
  state.form.validation.required
