import * as types from './actionTypes'

export const toggleShowDescription = fieldId => ({
  type: types.SHOW_DESCRIPTION_TOGGLED,
  fieldId
})

export const updateFieldTitle = (fieldId, title) => ({
  type: types.TITLE_UPDATED,
  fieldId,
  title
})

export const updateFieldDescription = (fieldId, description) => ({
  type: types.DESCRIPTION_UPDATED,
  fieldId,
  description
})
