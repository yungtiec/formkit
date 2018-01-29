import * as types from './actionTypes';

const initialState = {
  propertyInFocus: ''
}

export default function form(state = initialState, action) {
  switch (action.type) {
    case types.PROPERTY_IN_FOCUS_CHANGED:
      return {
        ...state,
        propertyInFocus: action.newPropertyInFocus
      }
    default:
      return state;
  }
}

export const getCurrentPropertyInFocus = state =>
  state.keyNavigation.propertyInFocus
