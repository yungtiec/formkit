import * as types from './actionTypes'
import { clone, keys } from 'lodash'

export const toggleShowDescription = fieldId => ({
  type: types.SHOW_DESCRIPTION_TOGGLED,
  fieldId
})

export const updateFieldTitle = (fieldId, title) => ({
  type: types.TITLE_UPDATED,
  fieldId,
  title
})

export const updateFieldEnum = (fieldId, fieldEnum) => ({
  type: types.ENUM_UPDATED,
  fieldId,
  fieldEnum
})

export const addEnum = (fieldId, currentEnumIndex) => (dispatch, getState) => {
  const field = getState().form.field.schema.properties[fieldId]
  var updatedEnumArray = ('enum' in field) ? clone(field.enum) : clone(field.items.enum)
  var insertedPosition = Number(currentEnumIndex) + 1
  updatedEnumArray.splice(insertedPosition, 0, '')
  dispatch({
    type: types.ENUM_ADDED,
    fieldId,
    updatedEnumArray
  })
}

export const toggleIsInteger = fieldId => ({
  type: types.IS_INTEGER_TOGGLED,
  fieldId
})


export const toggleAllowMultiple = fieldId => ({
  type: types.ALLOW_MULTIPLE_TOGGLED,
  fieldId
})
