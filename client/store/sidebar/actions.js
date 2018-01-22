import * as types from './actionTypes';

export const changeToolbarTab = newToolbarTab => ({
  type: types.TOOLBAR_TAB_CHANGED,
  newToolbarTab
})

export const updateFieldInFocus = (fieldId) => (dispatch, getState) => fieldId === 'none' ? dispatch({
  type: types.FIELD_IN_FOCUS_UPDATED,
  newFieldIdInFocus: ''
}) : dispatch({
  type: types.FIELD_IN_FOCUS_UPDATED,
  newFieldIdInFocus: fieldId || getState().form.field.latestAddedFieldId
})
