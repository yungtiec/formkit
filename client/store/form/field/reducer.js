import * as types from '../actionTypes';

const initialState = {
  error: null,
  schema: {
    type: 'object',
    title: 'Untitled form',
    required: [],
    order: [],
    description: 'Enter some description for your form here',
    properties: {}
  },
  latestAddedFieldId: ''
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function addField(state, fieldOption, currentIndex) {
  const id = `question_${currentIndex}`;
  state.latestAddedFieldId = id;
  state.schema.properties[id] = {
    ...fieldOption.jsonSchema,
    fieldIcon: fieldOption.icon,
    fieldOptionId: fieldOption.id,
    id
  };
  state.schema.order = (state.schema.order|| []).concat(id);
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

function updateFormTitle(state, { title }) {
  state.schema.title = title;
  return { ...state, error: null };
}

function updateFormDescription(state, { description }) {
  state.schema.description = description;
  return { ...state, error: null };
}

function setSchema(state, data) {
  state.schema = data.schema;
  state.uiSchema = data.uiSchema;
  return { ...state, error: null };
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case types.FIELD_ADD:
      return addField(clone(state), action.field, action.currentIndex);
    case types.FIELD_SWITCH:
      return switchField(clone(state), action.property, action.newField);
    case types.FIELD_REMOVE:
      return removeField(clone(state), action.name);
    case types.FIELD_UPDATE:
      const { name, schema, required, newName } = action;
      return updateField(clone(state), name, schema, required, newName);
    case types.FIELD_INSERT:
      return insertField(clone(state), action.field, action.before, action.currentIndex);
    case types.FIELD_SWAP:
      return swapFields(clone(state), action.source, action.target);
    case types.FORM_RESET:
      return initialState;
    case types.FORM_UPDATE_TITLE:
      return updateFormTitle(clone(state), action.title);
    case types.FORM_UPDATE_DESCRIPTION:
      return updateFormDescription(clone(state), action.description);
    case types.SCHEMA_RETRIEVAL_DONE:
      return setSchema(clone(state), action.data);
    default:
      return state;
  }
}

export const getFormFieldSchema = state =>
  state.form.field.schema

export const getLatestAddedFieldId = state =>
  state.form.field.latestAddedFieldId
