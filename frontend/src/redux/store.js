const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const fileReducer = require('./fileReducer')

const store = createStore(
  fileReducer,
  applyMiddleware(thunk)
)

module.exports = store
