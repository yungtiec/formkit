import * as types from './actionTypes'

export const updateFieldDescription = (fieldId, description) => ({
  type: types.DESCRIPTION_UPDATED,
  fieldId,
  description
})

export const updateFieldPlaceholder = (fieldId, placeholder) => ({
  type: types.PLACEHOLDER_UPDATED,
  fieldId,
  placeholder
})

export const updateColumn = (fieldId, column) => ({
  type: types.COLUMN_UPDATED,
  fieldId,
  column
})

export const updateCss = (property, value) => ({
  type: `form.ui.${property}_UPDATED`,
  value
})

export const toggleInlineCheckboxes = (fieldId) => ({
  type: types.INLINE_CHECKBOXES_TOGGLED,
  fieldId
})

export const toggleCssPropertyToWhichSide = (property, applyTo) => ({
  type: `form.ui.${property}_${applyTo}_TOGGLED`
})

export const updateSideSelect = (property, sides) => ({
  type: `form.ui.${property}_SIDE_SELECTED`,
  sides
})
