import * as types from './actionTypes';

export const updatePropertyInFocus = (newPropertyInFocus, fieldId) =>
  (dispatch, getState) => {
    const field = getState().form.field
    var traverseArray
    if (fieldId) {
      traverseArray = field.schema.properties[fieldId].traverseArray
      newPropertyInFocus = traverseArray[traverseArray.length - 1]
      console.log(newPropertyInFocus)
    }
    dispatch({
      type: types.PROPERTY_IN_FOCUS_CHANGED,
      newPropertyInFocus
    })
  }
