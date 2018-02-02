import * as types from './actionTypes'

export const updateFieldDescription = (fieldId, description) => ({
  type: types.DESCRIPTION_UPDATED,
  fieldId,
  description
})

export const updateColumn = (fieldId, column) => ({
  type: types.COLUMN_UPDATED,
  fieldId,
  column
})
