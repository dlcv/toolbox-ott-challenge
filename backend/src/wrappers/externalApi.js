const fetch = require('node-fetch')

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
      throw new Error(`Fallo al listar archivos. Status HTTP: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error de red en fetchFileList:', error.message)
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
      throw new Error(`Fallo al descargar ${fileName}. Status HTTP: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`Error de red en fetchFileContent para ${fileName}:`, error.message)
    throw error
  }
}

module.exports = {
  fetchFileList,
  fetchFileContent
}