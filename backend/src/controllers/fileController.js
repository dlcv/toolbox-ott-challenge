const fileService = require('../services/fileService')

async function getFilesData (req, res) {
  try {
    const { fileName } = req.query
    const data = await fileService.getProcessedFiles(fileName)
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error en getFilesData Controller:', error.message)
    return res.status(500).json({
      error: 'Error interno del servidor al procesar los archivos'
    })
  }
}

async function getRawFilesList (req, res) {
  try {
    const files = await fileService.getRawFilesList()
    return res.status(200).json(files)
  } catch (error) {
    console.error('Error en getRawFilesList Controller:', error.message)
    return res.status(500).json({ error: 'Error al obtener la lista de archivos' })
  }
}

module.exports = {
  getFilesData,
  getRawFilesList
}