import * as types from './actionTypes'

export const toggleRequiredField = fieldId => ({
  type: types.REQUIRED_FIELD_TOGGLED,
  fieldId
})
