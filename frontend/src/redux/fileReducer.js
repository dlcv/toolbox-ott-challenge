const types = require('./actionTypes')

const initialState = {
  data: [],
  loading: false,
  error: null
}

function fileReducer (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FILES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case types.FETCH_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case types.FETCH_FILES_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      }
    default:
      return state
  }
}

module.exports = fileReducer
