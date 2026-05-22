const cors = require('cors')
const express = require('express')
const fileController = require('./controllers/fileController')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/files/data', fileController.getFilesData)
app.get('/files/list', fileController.getRawFilesList)

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`)
})