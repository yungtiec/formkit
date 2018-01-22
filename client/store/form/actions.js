import * as types from './actionTypes';

export const addField = field =>
  (dispatch, getState) => dispatch({
    type: types.FIELD_ADD,
    field,
    currentIndex: getState().form.tally.currentIndex
  })

export function switchField(property, newField) {
  return { type: types.FIELD_SWITCH, property, newField };
}

export function insertField(field, before) {
  return (dispatch, getState) => dispatch({
    type: types.FIELD_INSERT,
    field,
    before,
    currentIndex: getState().form.tally.currentIndex
  })
}

export function removeField(fieldId) {
  return { type: types.FIELD_REMOVE, fieldId };
}

export function updateField(name, schema, required, newName) {
  return { type: types.FIELD_UPDATE, name, schema, required, newName };
}

export function swapFields(source, target) {
  return { type: types.FIELD_SWAP, source, target };
}

export function updateFormTitle(title) {
  return { type: types.FORM_UPDATE_TITLE, title };
}

export function updateFormDescription(description) {
  return { type: types.FORM_UPDATE_DESCRIPTION, description };
}

export function resetForm(callback) {
  return (dispatch, getState) => {
    dispatch({ type: types.FORM_RESET });
    if (callback) {
      callback();
    }
  };
}
