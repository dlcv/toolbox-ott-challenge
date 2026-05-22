const messages = require('../utils/messages')
const csvParser = require('../utils/csvParser')
const externalApi = require('../wrappers/externalApi')

async function processSingleFile (fileName) {
  try {
    const rawCsv = await externalApi.fetchFileContent(fileName)
    const parsedData = csvParser(rawCsv, fileName)
    if (!parsedData || parsedData.lines.length === 0) {
      return null
    }
    return parsedData
  } catch (error) {
    console.warn(`${messages.ERROR_SERVICE_PROCESSING_FILE_CATCHED} ${fileName}:`, error.message)
    return null
  }
}

async function getProcessedFiles (fileName) {
  if (fileName) {
    const result = await processSingleFile(fileName)
    return result ? [result] : []
  }

  const { files } = await externalApi.fetchFileList()
  if (!files || files.length === 0) {
    return []
  }
  const downloadPromises = files.map(file => processSingleFile(file))
  const settledResults = await Promise.allSettled(downloadPromises)
  const processedFiles = settledResults
    .filter(result => result.status === 'fulfilled' && result.value !== null)
    .map(result => result.value)
  return processedFiles
}

async function getRawFilesList () {
  const data = await externalApi.fetchFileList()
  return data.files || []
}

module.exports = {
  getProcessedFiles,
  getRawFilesList
}