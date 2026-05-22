const SERVER_RUNNING = 'Servidor Toolbox API corriendo en el puerto'
const ERROR_INTERNAL_SERVER = 'Error interno del servidor al procesar los archivos'
const ERROR_LISTING_FILES = 'Error al obtener la lista de archivos'
const ERROR_CONTROLLER_GET_FILES_DATA_CATCHED = 'Error en controllers > fileController > getFilesData'
const ERROR_CONTROLLER_GET_RAW_FILES_LIST_CATCHED = 'Error en controllers > fileController > getRawFilesList'
const ERROR_SERVICE_PROCESSING_FILE_CATCHED = 'Error en services > fileService > processSingleFile al procesar el archivo'
const ERROR_WRAPPER_FETCH_FILE_LIST_CATCHED = 'Error de red en wrappers > externalApi >  fetchFileList'
const ERROR_WRAPPER_FETCH_FILE_LIST_STATUS = 'Error al listar archivos. Status HTTP'
const ERROR_WRAPPER_FETCH_FILE_CONTENT_DOWNLOAD = 'Error al descargar archivo'
const ERROR_WRAPPER_FETCH_FILE_CONTENT_CATCHED = 'Error de red en wrappers > externalApi > fetchFileContent para'

module.exports = {
  SERVER_RUNNING,
  ERROR_INTERNAL_SERVER,
  ERROR_LISTING_FILES,
  ERROR_CONTROLLER_GET_FILES_DATA_CATCHED,
  ERROR_CONTROLLER_GET_RAW_FILES_LIST_CATCHED,
  ERROR_SERVICE_PROCESSING_FILE_CATCHED,
  ERROR_WRAPPER_FETCH_FILE_LIST_CATCHED,
  ERROR_WRAPPER_FETCH_FILE_LIST_STATUS,
  ERROR_WRAPPER_FETCH_FILE_CONTENT_DOWNLOAD,
  ERROR_WRAPPER_FETCH_FILE_CONTENT_CATCHED
}
