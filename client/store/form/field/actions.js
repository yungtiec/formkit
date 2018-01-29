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
  var updatedEnumArray = clone(field.enum)
  var insertedPosition = Number(currentEnumIndex) + 1
  updatedEnumArray.splice(insertedPosition, 0, '')
  dispatch({
    type: types.ENUM_ADDED,
    fieldId,
    updatedEnumArray
  })
}

// should move to reducer
// happen when show_description_toggled
// enum_added
// enum_removed
// export const updateFieldTraversalArray = (fieldId, fieldProperty, fieldEnum) =>
//   (dispatch, getState) => {
//     var traverseArray = getState().form.field
//       .schema.properties[fieldId].traverseArray
//     var hasDescription = getState().form.field
//       .schema.properties[fieldId].showDescription
//     var updatedTraverseArray
//     if (fieldProperty === 'description') {
//       updatedTraverseArray = toggleDescriptionInFieldTraversalArray(
//         hasDescription, clone(traverseArray))

//     } else if (fieldProperty === 'enum') {
//       updatedTraverseArray = updateEnumInFieldTraversalArray(hasDescription, clone(traverseArray), fieldEnum)
//     }
//     return dispatch({
//       type: types.TRAVERSE_ARRAY_UPDATED,
//       fieldId,
//       updatedTraverseArray
//     })
//   }

// function toggleDescriptionInFieldTraversalArray(hasDescription, traverseArray) {
//   hasDescription ?
//     traverseArray.splice(1, 0, 'description') :
//     traverseArray.splice(1, 1)
//   return traverseArray
// }

// function updateEnumInFieldTraversalArray(hasDescription, traverseArray, fieldEnum) {
//   return hasDescription ?
//     traverseArray.slice(0, 2).concat(keys(fieldEnum)) :
//     traverseArray.slice(0, 1).concat(keys(fieldEnum))
// }
