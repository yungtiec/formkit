import * as generalTypes from '../actionTypes';
import * as fieldType from './actionTypes'
import { keys } from 'lodash'

const initialState = {
  error: null,
  schema: {
    type: 'object',
    order: [],
    properties: {}
  },
  latestAddedFieldId: ''
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function addField(state, fieldOption, currentIndex) {
  const id = `Q${currentIndex}`;
  state.latestAddedFieldId = id;
  state.schema.properties[id] = {
    ...fieldOption.jsonSchema,
    fieldIcon: fieldOption.icon,
    fieldOptionId: fieldOption.id,
    id
  };
  state.schema.order = (state.schema.order || []).concat(id);
  return state;
}

function switchField(state, propertyName, newField) {
  // basics properties like title and description stay the same
  // add options, remove options... accordingly
  // update fieldOptionId
  state.schema.properties[propertyName] = { ...newField.jsonSchema };
  return state;
}

function removeField(state, fieldId) {
  delete state.schema.properties[fieldId];
  state.schema.order = state.schema.order.filter(
    field => field !== fieldId);
  return { ...state, error: null };
}

function updateField() {

}

function insertField(state, field, before, currentIndex) {
  const insertedState = addField(state, field, currentIndex);
  const order = insertedState.schema.order;
  const added = order[order.length - 1];
  const idxBefore = order.indexOf(before);
  const newOrder = [].concat(
    order.slice(0, idxBefore),
    added,
    order.slice(idxBefore, order.length - 1)
  );
  insertedState.schema.order = newOrder;
  insertedState.latestAddedFieldId = added;
  return { ...insertedState, error: null };
}

function swapFields(state, source, target) {
  const order = state.schema.order;
  const idxSource = order.indexOf(source);
  const idxTarget = order.indexOf(target);
  order[idxSource] = target;
  order[idxTarget] = source;
  return { ...state, error: null };
}

function setSchema(state, data) {
  state.schema = data.schema;
  return { ...state, error: null };
}

function updateFieldTraversalArray(state, fieldId, fieldProperty, fieldEnum) {
  var traverseArray = state
    .schema.properties[fieldId].traverseArray
  var hasDescription = state
    .schema.properties[fieldId].showDescription
  var updatedTraverseArray
  if (fieldProperty === 'description') {
    updatedTraverseArray = toggleDescriptionInFieldTraversalArray(
      hasDescription, clone(traverseArray))

  } else if (fieldProperty === 'enum') {
    updatedTraverseArray = updateEnumInFieldTraversalArray(hasDescription, clone(traverseArray), fieldEnum)
  }
  return updatedTraverseArray
}

function toggleDescriptionInFieldTraversalArray(hasDescription, traverseArray) {
  hasDescription ?
    traverseArray.splice(1, 0, 'description') :
    traverseArray.splice(1, 1)
  return traverseArray
}

function updateEnumInFieldTraversalArray(hasDescription, traverseArray, fieldEnum) {
  return hasDescription ?
    traverseArray.slice(0, 2).concat(keys(fieldEnum)) :
    traverseArray.slice(0, 1).concat(keys(fieldEnum))
}


function updateShowDescription(state, fieldId) {
  var updatedTraverseArray
  state.schema.properties[fieldId].showDescription = !state.schema.properties[fieldId].showDescription
  updatedTraverseArray = updateFieldTraversalArray(state, fieldId, 'description')
  state.schema.properties[fieldId].traverseArray = updatedTraverseArray
  return { ...state }
}

function updateTitle(state, fieldId, title) {
  state.schema.properties[fieldId].title = title
  return { ...state }
}

function updateDescription(state, fieldId, description) {
  state.schema.properties[fieldId].description = description
  return { ...state }
}

function updateEnum(state, fieldId, fieldEnum) {
  state.schema.properties[fieldId].enum = fieldEnum
  return { ...state }
}

function addEnum(state, fieldId, updatedEnumArray) {
  var updatedTraverseArray
  state.schema.properties[fieldId].enum = updatedEnumArray
  updatedTraverseArray = updateFieldTraversalArray(state, fieldId, 'enum', updatedEnumArray)
  state.schema.properties[fieldId].traverseArray = updatedTraverseArray
  return { ...state }
}


export default function form(state = initialState, action) {
  switch (action.type) {
    case generalTypes.FIELD_ADD:
      return addField(clone(state), action.field, action.currentIndex);
    case generalTypes.FIELD_SWITCH:
      return switchField(clone(state), action.property, action.newField);
    case generalTypes.FIELD_REMOVE:
      return removeField(clone(state), action.fieldId);
    case generalTypes.FIELD_INSERT:
      return insertField(clone(state), action.field, action.before, action.currentIndex);
    case generalTypes.FIELD_SWAP:
      return swapFields(clone(state), action.source, action.target);
    case generalTypes.SCHEMA_RETRIEVAL_DONE:
      return setSchema(clone(state), action.data);
    case fieldType.SHOW_DESCRIPTION_TOGGLED:
      return updateShowDescription(clone(state), action.fieldId)
    case fieldType.TITLE_UPDATED:
      return updateTitle(clone(state), action.fieldId, action.title)
    case fieldType.DESCRIPTION_UPDATED:
      return updateDescription(clone(state), action.fieldId, action.description)
    case fieldType.ENUM_ADDED:
      return addEnum(clone(state), action.fieldId, action.updatedEnumArray)
    case fieldType.ENUM_UPDATED:
      return updateEnum(clone(state), action.fieldId, action.fieldEnum)
    default:
      return state;
  }
}

export const getFormFieldSchema = state =>
  state.form ? state.form.field.schema : {}

export const getLatestAddedFieldId = state =>
  state.form.field.latestAddedFieldId
