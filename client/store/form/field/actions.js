import * as types from './actionTypes'

export const toggleShowDescription = fieldId => ({
  type: types.SHOW_DESCRIPTION_TOGGLED,
  fieldId
})
