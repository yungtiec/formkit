import * as types from '../actionTypes';
import * as uiTypes from './actionTypes'

const initialState = {
  error: null,
  schema: {}
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function addField(state, fieldOption, currentIndex) {
  const id = `Q${currentIndex}`;
  state.schema[id] = fieldOption.uiSchema;
  return state;
}

function switchField(state, fieldId, newField) {
  state.schema[fieldId] = newField.uiSchema;
  return state;
}

function insertField(state, field, before, currentIndex) {
  const id = `Q${currentIndex}`;
  state.schema[id] = field.uiSchema
  return { ...state, error: null };
}

function removeField(state, fieldId) {
  delete state.schema[fieldId];
  return { ...state, error: null };
}

function setSchema(state, data) {
  state.schema = data.uiSchema;
  return { ...state, error: null };
}

function updateDescription(state, fieldId, description) {
  state.schema[fieldId]['ui:description'] = description
  return { ...state }
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case types.FIELD_ADD:
      return addField(clone(state), action.field, action.currentIndex);
    case types.FIELD_INSERT:
      return insertField(clone(state), action.field, action.before, action.currentIndex);
    case types.FIELD_SWITCH:
      return switchField(clone(state), action.property, action.newField);
    case types.FIELD_REMOVE:
      return removeField(clone(state), action.fieldId);
    case types.FORM_RESET:
      return initialState;
    case types.SCHEMA_RETRIEVAL_DONE:
      return setSchema(clone(state), action.data);
    case uiTypes.DESCRIPTION_UPDATED:
      return updateDescription(clone(state), action.fieldId, action.description)
    default:
      return state;
  }
}

export const getFormUiSchema = state =>
  state.form.ui.schema
