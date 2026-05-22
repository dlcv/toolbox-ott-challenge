const messages = require('../utils/messages')
const fileService = require('../services/fileService')

async function getFilesData (req, res) {
  try {
    const { fileName } = req.query
    const data = await fileService.getProcessedFiles(fileName)
    return res.status(200).json(data)
  } catch (error) {
    console.error(`${messages.ERROR_CONTROLLER_GET_FILES_DATA_CATCHED}: ${error.message}`)
    return res.status(500).json({
      error: messages.ERROR_INTERNAL_SERVER
    })
  }
}

async function getRawFilesList (req, res) {
  try {
    const files = await fileService.getRawFilesList()
    return res.status(200).json(files)
  } catch (error) {
    console.error(`${messages.ERROR_CONTROLLER_GET_RAW_FILES_LIST_CATCHED}: ${error.message}`)
    return res.status(500).json({ error: messages.ERROR_LISTING_FILES })
  }
}

module.exports = {
  getFilesData,
  getRawFilesList
}
