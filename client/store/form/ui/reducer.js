import * as types from '../actionTypes';

const initialState = {
  error: null,
  schema: {}
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function addField(state, fieldOption, currentIndex) {
  const id = `question_${currentIndex}`;
  state.schema[id] = fieldOption.uiSchema;
  return state;
}

function switchField(state, fieldId, newField) {
  state.schema[fieldId] = newField.uiSchema;
  return state;
}

function removeField(state, name) {
  delete state.schema[name];
  return { ...state, error: null };
}

function setSchema(state, data) {
  state.schema = data.uiSchema;
  return { ...state, error: null };
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case types.FIELD_ADD:
      return addField(clone(state), action.field, action.currentIndex);
    case types.FIELD_SWITCH:
      return switchField(clone(state), action.property, action.newField);
    case types.FIELD_REMOVE:
      return removeField(clone(state), action.name);
    case types.FORM_RESET:
      return initialState;
    case types.SCHEMA_RETRIEVAL_DONE:
      return setSchema(clone(state), action.data);
    default:
      return state;
  }
}

export const getFormUiSchema = state =>
  state.form.ui.schema
