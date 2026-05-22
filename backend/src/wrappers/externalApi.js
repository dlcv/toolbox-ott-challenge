const fetch = require('node-fetch')
const messages = require('../utils/messages')

const BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const HEADERS = {
  authorization: 'Bearer aSuperSecretKey',
  accept: 'application/json'
}

async function fetchFileList () {
  try {
    const response = await fetch(`${BASE_URL}/files`, {
      method: 'GET',
      headers: HEADERS
    })

    if (!response.ok) {
      throw new Error(`${messages.ERROR_WRAPPER_FETCH_FILE_LIST_STATUS} [HTTP status ${response.status}]`)
    }
    return await response.json()
  } catch (error) {
    console.error(`${messages.ERROR_WRAPPER_FETCH_FILE_LIST_CATCHED}:`, error.message)
    throw error
  }
}

async function fetchFileContent (fileName) {
  try {
    const response = await fetch(`${BASE_URL}/file/${fileName}`, {
      method: 'GET',
      headers: HEADERS
    })

    if (!response.ok) {
      throw new Error(`${messages.ERROR_WRAPPER_FETCH_FILE_CONTENT_DOWNLOAD} ${fileName} [HTTP status ${response.status}]`)
    }
    return await response.text()
  } catch (error) {
    console.error(`${messages.ERROR_WRAPPER_FETCH_FILE_CONTENT_CATCHED} ${fileName}:`, error.message)
    throw error
  }
}

module.exports = {
  fetchFileList,
  fetchFileContent
}
