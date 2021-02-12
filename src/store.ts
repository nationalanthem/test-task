import { createStore, applyMiddleware, compose } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducer/reducer'

export const store = createStore(reducer, compose(applyMiddleware(thunk /* logger */)))

export type RootState = ReturnType<typeof reducer>
