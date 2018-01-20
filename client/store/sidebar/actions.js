import * as types from './actionTypes';

export const changeToolbarTab = newToolbarTab => ({
  type: types.TOOLBAR_TAB_CHANGED, newToolbarTab
})

export const updateFieldInFocus = newFieldIdInFocus => ({
  type: types.FIELD_IN_FOCUS_UPDATED, newFieldIdInFocus
})
