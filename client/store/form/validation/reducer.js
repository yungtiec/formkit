import * as types from '../actionTypes';

const initialState = {
  error: null,
  required: [],
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function removeField(state, id) {
  const requiredFields = state.required || []
  state.required = requiredFields
    .filter(requiredFieldId => id !== requiredFieldId)
  if (state.required.length === 0) {
    state.required = []
  }
  return { ...state, error: null }
}

function updateField(state, name, schema, required, newLabel) {

}

export default function form(state = initialState, action) {
  switch (action.type) {
    case types.FIELD_REMOVE:
      return removeField(clone(state), action.name);
    case types.FIELD_UPDATE:
      const { name, schema, required, newName } = action;
      return updateField(clone(state), name, schema, required, newName);
    default:
      return state;
  }
}

export const getRequiredFields = state =>
  state.form.validation.required
