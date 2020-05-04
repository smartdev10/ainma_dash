import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers";
import {jwt} from "./hooks/hook";
import thunkMiddleware from 'redux-thunk'

export function configureStore (initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(jwt, thunkMiddleware))
  )
}
