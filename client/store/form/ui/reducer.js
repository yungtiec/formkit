import * as types from '../actionTypes';
import * as uiTypes from './actionTypes'
import * as fieldTypes from '../field/actionTypes'
import { decodeAndSanitizeHtmlEntities } from '../../../utils'
import { createSelector } from 'reselect'
import { forEach } from 'lodash'

const initialState = {
  error: null,
  schema: {},
  css: {
    labelAlignment: {
      value: 'top',
      responsibleFor: ['descriptionPositionRight', 'descriptionMarginTop']
    },
    descriptionPositionLeft: {
      cssProperty: 'left',
      derived: {
        basedOn: 'labelAlignment',
        type: 'enum',
        top: {
          value: 'inherit'
        },
        left: {
          basedOn: 'labelMinWidth',
          type: 'base',
          delta: 15,
          unit: 'px'
        },
        right: {
          basedOn: 'labelMinWidth',
          type: 'base',
          delta: 15,
          unit: 'px'
        },
        value: 'inherit',
        unit: 'px',
      },
      selectors: ['.help-block'],
    },
    descriptionMarginTop: {
      cssProperty: 'margin-top',
      derived: {
        basedOn: 'labelAlignment',
        type: 'enum',
        top: {
          value: 0,
          unit: 'px'
        },
        left: {
          basedOn: 'fontSize',
          type: 'base',
          multiplier: 2,
          delta: 0,
          unit: 'px'
        },
        right: {
          basedOn: 'fontSize',
          type: 'base',
          multiplier: 2,
          delta: 0,
          unit: 'px'
        },
        value: 0,
        unit: 'px'
      },
      selectors: ['.help-block'],
    },
    fieldMarginBottom: {
      cssProperty: 'margin-bottom',
      derived: {
        basedOn: 'fontSize',
        type: 'base',
        multiplier: 2,
        delta: 8,
        unit: 'px',
        value: 36,
      },
      selectors: ['.form-group.field__default-bootstrap'],
    },
    labelVerticalAlignment: {
      cssProperty: 'align-self',
      selectors: ['.control-label'],
      value: 'center'
    },
    labelMinWidth: {
      cssProperty: 'min-width',
      selectors: ['.control-label'],
      value: 62,
      unit: 'px'
    },
    fontSize: {
      cssProperty: 'font-size',
      value: 14,
      unit: 'px',
      selectors: ['.help-block', '.form-control', '.control-label', 'checkboxTop', 'checkTop', 'descriptionMarginTop', 'fieldMarginBottom']
    },
    height: {
      cssProperty: 'height',
      derived: {
        basedOn: 'fontSize',
        type: 'base',
        delta: 20,
        unit: 'px',
        value: 34
      },
      selectors: ['.form-control']
    },
    lineHeight: {
      cssProperty: 'line-height',
      derived: {
        basedOn: 'fontSize',
        type: 'base',
        delta: 3,
        unit: 'px',
        value: 17
      },
      selectors: ['.form-control', '.control-label']
    },
    checkboxLabel: {
      cssProperty: 'font-size',
      selectors: ['.checkboxes .checkbox label span span', '.field-radio-group .radio label span span'],
      derived: {
        basedOn: 'fontSize',
        type: 'base',
        delta: 0,
        unit: 'px',
        value: 14
      },
    },
    labelBorder: {
      prefix: 'border',
      suffix: true,
      applyTo: {
        all: true,
        top: false,
        bottom: false,
        left: false,
        right: false,
      },
      all: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      top: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      bottom: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      left: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      right: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      selectors: ['.control-label']
    },
    labelBorderStyle: {
      cssProperty: 'border-style',
      selectors: ['.control-label'],
      value: 'solid',
    },
    labelBorderRadius: {
      cssProperty: 'border-radius',
      selectors: ['.control-label'],
      value: 0,
      unit: 'px'
    },
    labelPadding: {
      prefix: 'padding',
      applyTo: {
        all: true,
        top: false,
        bottom: false,
        left: false,
        right: false,
      },
      all: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      top: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      bottom: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      left: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      right: {
        width: {
          value: 0,
          unit: 'px',
        }
      },
      selectors: ['.control-label'],
    }
  }
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function addField(state, fieldOption, currentIndex) {
  const id = `Q${currentIndex}`;
  state.schema[id] = fieldOption.uiSchema;
  state.schema[id].labelAlignment = state.css.labelAlignment.value
  state.schema[id].classNameDict.labelAlignment = getLabelAlignmentClasses(state.css.labelAlignment.value)
  return { ...state }
}

function switchField(state, fieldId, newField) {
  state.schema[fieldId] = newField.uiSchema;
  return state;
}

function insertField(state, field, before, currentIndex) {
  const id = `Q${currentIndex}`;
  state.schema[id] = field.uiSchema
  state.schema[id].labelAlignment = state.css.labelAlignment.value
  state.schema[id].classNameDict.labelAlignment = getLabelAlignmentClasses(state.css.labelAlignment.value)
  return { ...state }
}

function removeField(state, fieldId) {
  delete state.schema[fieldId];
  return { ...state, error: null };
}

function setSchema(state, data) {
  state.schema = data.uiSchema;
  return { ...state, error: null };
}

function updateDescription(state, fieldId, description) {
  state.schema[fieldId]['ui:help'] = decodeAndSanitizeHtmlEntities(description)
  state.schema[fieldId].htmlEncodedDescription = description
  return { ...state }
}

function updatePlaceholder(state, fieldId, placeholder) {
  state.schema[fieldId]['ui:placeholder'] = decodeAndSanitizeHtmlEntities(placeholder)
  state.schema[fieldId].htmlEncodedPlaceholder = placeholder
  return { ...state }
}

function updateMultipleChoiceWidget(state, fieldId) {
  if (state.schema[fieldId]['ui:widget'] === 'checkboxes') {
    state.schema[fieldId]['ui:widget'] = 'radio'
  } else {
    state.schema[fieldId]['ui:widget'] = 'checkboxes'
  }
  return { ...state }
}

function updateColumn(state, fieldId, column) {
  state.schema[fieldId].column = column
  state.schema[fieldId].classNameDict.column = `col-lg-${column}`
  return { ...state }
}

function updateLabelAlignment(state, labelAlignment) {
  var classes = getLabelAlignmentClasses(labelAlignment)
  for (var fieldId in state.schema) {
    state.schema[fieldId].classNameDict.labelAlignment = classes
  }
  state.css.labelAlignment.value = labelAlignment
  return { ...state }
}

function updateLabelMinWidth(state, labelMinWidth) {
  state.css.labelMinWidth.value = labelMinWidth
  return { ...state }
}

function updateFontSize(state, fontSize) {
  var responsibleFor = state.css.fontSize.responsibleFor
  state.css.fontSize.value = fontSize
  return { ...state }
}

function updateInlineCheckboxes(state, fieldId) {
  state.schema[fieldId].inlineCheckboxes = !state.schema[fieldId].inlineCheckboxes
  if (state.schema[fieldId].inlineCheckboxes) {
    state.schema[fieldId].classNameDict.inlineCheckboxes = "inline-checkboxes"
  } else {
    delete state.schema[fieldId].classNameDict.inlineCheckboxes
  }
  return { ...state }
}

function getLabelAlignmentClasses(labelAlignment) {
  var classes;
  switch (labelAlignment) {
    case 'top':
      classes = ''
      break
    case 'left':
      classes = 'd-flex flex-row'
      break
    case 'right':
      classes = 'd-flex flex-row control-label--right-align'
      break
    default:
      classes = ''
      break
  }
  return classes
}

function updateLabelBorderApplication(state, side) {
  var width
  state.css.labelBorder.applyTo[side] = !state.css.labelBorder.applyTo[side]
  if (side === 'all' && state.css.labelBorder.applyTo[side]) {
    width = state.css.labelBorder.all.width.value
    state.css.labelBorder.top.width.value = width
    state.css.labelBorder.bottom.width.value = width
    state.css.labelBorder.right.width.value = width
    state.css.labelBorder.left.width.value = width
  }
  return { ...state }
}

function updateSideSelect(state, sides, property) {
  for (var side in state.css[property].applyTo) {
    if (side === 'all') continue
    state.css[property].applyTo[side] = sides.indexOf(side) > -1
  }
  return { ...state }
}

function updateLabelBorderWidth(state, width, side) {
  if (side !== 'all') {
    state.css.labelBorder[side].width.value = width
  } else {
    state.css.labelBorder.all.width.value = width
    state.css.labelBorder.top.width.value = width
    state.css.labelBorder.bottom.width.value = width
    state.css.labelBorder.right.width.value = width
    state.css.labelBorder.left.width.value = width
  }

  return { ...state }
}

function updateLabelBorderStyle(state, style) {
  state.css.labelBorderStyle.value = style
  return { ...state }
}

function updateLabelBorderRadius(state, value) {
  state.css.labelBorderRadius.value = value
  return { ...state }
}

function updateLabelPaddingApplication(state, side) {
  var width
  state.css.labelPadding.applyTo[side] = !state.css.labelPadding.applyTo[side]
  if (side === 'all' && state.css.labelPadding.applyTo[side]) {
    width = state.css.labelPadding.all.width.value
    state.css.labelPadding.top.width.value = width
    state.css.labelPadding.bottom.width.value = width
    state.css.labelPadding.right.width.value = width
    state.css.labelPadding.left.width.value = width
  }
  return { ...state }
}

function updateLabelPaddingSize(state, value, side) {
  if (side !== 'all') {
    state.css.labelPadding[side].width.value = value
  } else {
    state.css.labelPadding.all.width.value = value
    state.css.labelPadding.top.width.value = value
    state.css.labelPadding.bottom.width.value = value
    state.css.labelPadding.right.width.value = value
    state.css.labelPadding.left.width.value = value
  }

  return { ...state }
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case types.FIELD_ADD:
      return addField(clone(state), action.field, action.currentIndex);
    case types.FIELD_INSERT:
      return insertField(clone(state), action.field, action.before, action.currentIndex);
    case types.FIELD_SWITCH:
      return switchField(clone(state), action.property, action.newField);
    case types.FIELD_REMOVE:
      return removeField(clone(state), action.fieldId);
    case types.FORM_RESET:
      return initialState;
    case types.SCHEMA_RETRIEVAL_DONE:
      return setSchema(clone(state), action.data);
    case uiTypes.DESCRIPTION_UPDATED:
      return updateDescription(clone(state), action.fieldId, action.description)
    case uiTypes.PLACEHOLDER_UPDATED:
      return updatePlaceholder(clone(state), action.fieldId, action.placeholder)
    case uiTypes.COLUMN_UPDATED:
      return updateColumn(clone(state), action.fieldId, action.column)
    case uiTypes.LABEL_ALIGNMENT_UPDATED:
      return updateLabelAlignment(clone(state), action.value)
    case uiTypes.FONT_SIZE_UPDATED:
      return updateFontSize(clone(state), action.value)
    case uiTypes.LABEL_MIN_WIDTH_UPDATED:
      return updateLabelMinWidth(clone(state), action.value)
    case fieldTypes.ALLOW_MULTIPLE_TOGGLED:
      return updateMultipleChoiceWidget(clone(state), action.fieldId)
    case uiTypes.INLINE_CHECKBOXES_TOGGLED:
      return updateInlineCheckboxes(clone(state), action.fieldId)
    case uiTypes.LABEL_BORDER_APPLY_TO_ALL_TOGGLED:
      return updateLabelBorderApplication(clone(state), 'all')
    case uiTypes.LABEL_BORDER_APPLY_TO_TOP_TOGGLED:
      return updateLabelBorderApplication(clone(state), 'top')
    case uiTypes.LABEL_BORDER_APPLY_TO_BOTTOM_TOGGLED:
      return updateLabelBorderApplication(clone(state), 'bottom')
    case uiTypes.LABEL_BORDER_APPLY_TO_LEFT_TOGGLED:
      return updateLabelBorderApplication(clone(state), 'left')
    case uiTypes.LABEL_BORDER_APPLY_TO_RIGHT_TOGGLED:
      return updateLabelBorderApplication(clone(state), 'right')
    case uiTypes.LABEL_BORDER_SIDE_SELECTED:
      return updateSideSelect(clone(state), action.sides, 'labelBorder')
    case uiTypes.LABEL_BORDER_WIDTH_ALL_UPDATED:
      return updateLabelBorderWidth(clone(state), action.value, 'all')
    case uiTypes.LABEL_BORDER_WIDTH_TOP_UPDATED:
      return updateLabelBorderWidth(clone(state), action.value, 'top')
    case uiTypes.LABEL_BORDER_WIDTH_BOTTOM_UPDATED:
      return updateLabelBorderWidth(clone(state), action.value, 'bottom')
    case uiTypes.LABEL_BORDER_WIDTH_LEFT_UPDATED:
      return updateLabelBorderWidth(clone(state), action.value, 'left')
    case uiTypes.LABEL_BORDER_WIDTH_RIGHT_UPDATED:
      return updateLabelBorderWidth(clone(state), action.value, 'right')
    case uiTypes.LABEL_BORDER_STYLE_UPDATED:
      return updateLabelBorderStyle(clone(state), action.value)
    case uiTypes.LABEL_BORDER_RADIUS_UPDATED:
      return updateLabelBorderRadius(clone(state), action.value)
    case uiTypes.LABEL_PADDING_APPLY_TO_ALL_TOGGLED:
      return updateLabelPaddingApplication(clone(state), 'all')
    case uiTypes.LABEL_PADDING_APPLY_TO_TOP_TOGGLED:
      return updateLabelPaddingApplication(clone(state), 'top')
    case uiTypes.LABEL_PADDING_APPLY_TO_BOTTOM_TOGGLED:
      return updateLabelPaddingApplication(clone(state), 'bottom')
    case uiTypes.LABEL_PADDING_APPLY_TO_LEFT_TOGGLED:
      return updateLabelPaddingApplication(clone(state), 'left')
    case uiTypes.LABEL_PADDING_APPLY_TO_RIGHT_TOGGLED:
      return updateLabelPaddingApplication(clone(state), 'right')
    case uiTypes.LABEL_PADDING_SIZE_ALL_UPDATED:
      return updateLabelPaddingSize(clone(state), action.value, 'all')
    case uiTypes.LABEL_PADDING_SIZE_TOP_UPDATED:
      return updateLabelPaddingSize(clone(state), action.value, 'top')
    case uiTypes.LABEL_PADDING_SIZE_BOTTOM_UPDATED:
      return updateLabelPaddingSize(clone(state), action.value, 'bottom')
    case uiTypes.LABEL_PADDING_SIZE_RIGHT_UPDATED:
      return updateLabelPaddingSize(clone(state), action.value, 'right')
    case uiTypes.LABEL_PADDING_SIZE_LEFT_UPDATED:
      return updateLabelPaddingSize(clone(state), action.value, 'left')
    case uiTypes.LABEL_PADDING_SIDE_SELECTED:
      return updateSideSelect(clone(state), action.sides, 'labelPadding')
    default:
      return state;
  }
}

export const getFieldUiSchema = state =>
  state.form.ui.schema




export const getFormCssSchema = state => {
  var formCssSchema = clone(state.form.ui.css)
  var basedOnProperty, basisValue, value, anotherBasedOnProperty;
  for (var property in state.form.ui.css) {
    if ('derived' in state.form.ui.css[property]) {
      // check type
      if (state.form.ui.css[property].derived.type === 'base') {
        basedOnProperty = state.form.ui.css[property].derived.basedOn
        if ('divisor' in state.form.ui.css[property].derived) {
          value = Math.round(state.form.ui.css[basedOnProperty].value / state.form.ui.css[property].derived.divisor) +
            state.form.ui.css[property].derived.delta
        } else if ('multiplier' in state.form.ui.css[property].derived) {
          value = Math.round(state.form.ui.css[basedOnProperty].value * state.form.ui.css[property].derived.multiplier) +
            state.form.ui.css[property].derived.delta
        } else {
          value = state.form.ui.css[basedOnProperty].value +
            state.form.ui.css[property].derived.delta
        }
        formCssSchema[property].derived.value = value
      } else if (state.form.ui.css[property].derived.type === 'enum') {
        basedOnProperty = state.form.ui.css[property].derived.basedOn
        if ('derived' in state.form.ui.css[basedOnProperty]) {
          basisValue = state.form.ui.css[basedOnProperty].derived.value
        } else {
          basisValue = state.form.ui.css[basedOnProperty].value
        }
        if ('basedOn' in state.form.ui.css[property].derived[basisValue]) {
          anotherBasedOnProperty = state.form.ui.css[property].derived[basisValue].basedOn
          if ('divisor' in state.form.ui.css[property].derived[basisValue]) {
            value = Math.round(state.form.ui.css[anotherBasedOnProperty].value / state.form.ui.css[property].derived[basisValue].divisor) +
              state.form.ui.css[property].derived[basisValue].delta
          } else if ('multiplier' in state.form.ui.css[property].derived[basisValue]) {
            value = Math.round(state.form.ui.css[anotherBasedOnProperty].value * state.form.ui.css[property].derived[basisValue].multiplier) +
              state.form.ui.css[property].derived[basisValue].delta
          } else {
            value = state.form.ui.css[anotherBasedOnProperty].value +
              state.form.ui.css[property].derived[basisValue].delta
          }
          formCssSchema[property].derived.value = value
        } else {
          formCssSchema[property].derived.value = state.form.ui.css[property].derived[basisValue].value
        }
      }
      if ('unit' in state.form.ui.css[property].derived &&
          typeof formCssSchema[property].derived.value === 'number') {
        formCssSchema[property].value =
          `${formCssSchema[property].derived.value}${formCssSchema[property].derived.unit}`
      } else {
        formCssSchema[property].value = formCssSchema[property].derived.value
      }
    } else if ('suffixes' in formCssSchema[property] ||
      'top' in formCssSchema[property]) {
      getCssValueForEachSide(formCssSchema[property], 'top')
      getCssValueForEachSide(formCssSchema[property], 'bottom')
      getCssValueForEachSide(formCssSchema[property], 'left')
      getCssValueForEachSide(formCssSchema[property], 'right')
      getCssValueForEachSide(formCssSchema[property], 'all')
      getCssValueForEachSide(formCssSchema[property], 'suffixes')
    } else if ('unit' in state.form.ui.css[property]) {
      formCssSchema[property].value =
        `${state.form.ui.css[property].value}${state.form.ui.css[property].unit}`
    }
  }
  console.log(formCssSchema)
  return formCssSchema
}

function getCssValueForEachSide(cssProperty, side) {
  for (var subProperty in cssProperty[side]) {
    if ('unit' in cssProperty[side][subProperty]) {
      cssProperty[side][subProperty].value =
        `${cssProperty[side][subProperty].value}${cssProperty[side][subProperty].unit}`
    }
  }
}
