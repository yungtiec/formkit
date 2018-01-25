import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user/reducer'
import form from './form/reducer'
import sidebar from './sidebar/reducer'
import keyNavigation from './keyNavigation/reducer'

const reducer = combineReducers({
  user,
  form,
  sidebar,
  keyNavigation
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user/actions'
export * from './form/actions'
export * from './sidebar/actions'
export * from './keyNavigation/actions'
export * from './form/validation/actions'
export * from './form/field/actions'
