const cors = require('cors')
const express = require('express')
const request = require('supertest')
const messages = require('../src/utils/messages')
const fileService = require('../src/services/fileService')
const fileController = require('../src/controllers/fileController')

jest.mock('../src/services/fileService')

const app = express()
app.use(cors())
app.use(express.json())
app.get('/files/data', fileController.getFilesData)

describe('Pruebas API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('1. Debe retornar status 200 y el JSON estructurado al consultar con éxito', async () => {
    const mockServiceResponse = [
      {
        file: 'file1.csv',
        lines: [{ text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' }]
      }
    ]

    fileService.getProcessedFiles.mockResolvedValue(mockServiceResponse)

    const response = await request(app)
      .get('/files/data')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual(mockServiceResponse)
  })

  test('2. Debe retornar status 500 si el servicio lanza un error', async () => {
    fileService.getProcessedFiles.mockRejectedValue(new Error('Error HTTP 500'))

    const response = await request(app)
      .get('/files/data')
      .expect('Content-Type', /json/)
      .expect(500)

    expect(response.body).toEqual({
      error: messages.ERROR_INTERNAL_SERVER
    })
  })
})
