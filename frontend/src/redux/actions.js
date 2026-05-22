const types = require('./actionTypes')
const errors = require('./errorTypes')
const API_URL = 'http://localhost:3000/files/data'

const fetchFiles = (fileName = '') => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_FILES_REQUEST })
    try {
      let url = API_URL
      if (fileName.trim() !== '') {
        url += `?fileName=${encodeURIComponent(fileName.trim())}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(errors.ERROR_API_CONNECTION)
      }

      const data = await response.json()
      dispatch({
        type: types.FETCH_FILES_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: types.FETCH_FILES_FAILURE,
        payload: error.message || errors.ERROR_NOT_HANDLED
      })
    }
  }
}

module.exports = {
  fetchFiles
}
