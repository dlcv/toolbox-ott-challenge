const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const fileReducer = require('./reducer')

const store = createStore(
  fileReducer,
  applyMiddleware(thunk)
)

module.exports = store