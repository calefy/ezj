import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore)

module.exports = function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);

}

