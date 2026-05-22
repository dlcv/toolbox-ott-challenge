require('@testing-library/jest-dom')

const React = require('react')
const { render, screen } = require('@testing-library/react')
const DataTable = require('../src/components/dataTable')
const AppTexts = require('../src/utils/appTexts')

describe('Pruebas dataTable', () => {
  const mockFiles = [
    {
      file: 'file1.csv',
      lines: [
        { text: 'Texto 1', number: 123, hex: 'abc123abc123abc123abc123abc123ab' }
      ]
    },
    {
      file: 'file2.csv',
      lines: [
        { text: 'Texto 2', number: 456, hex: 'def456def456def456def456def456de' }
      ]
    }
  ]

  test('1. Debe renderizar la cabecera de la tabla correctamente', () => {
    render(React.createElement(DataTable, { files: [] }))
    expect(screen.getByText(AppTexts.FILE_NAME)).toBeInTheDocument()
    expect(screen.getByText(AppTexts.FILE_TEXT)).toBeInTheDocument()
    expect(screen.getByText(AppTexts.FILE_NUMBER)).toBeInTheDocument()
    expect(screen.getByText(AppTexts.FILE_HEX)).toBeInTheDocument()
  })

  test('2. Debe renderizar las filas con los datos provistos', () => {
    render(React.createElement(DataTable, { files: mockFiles }))
    expect(screen.getByText('file1.csv')).toBeInTheDocument()
    expect(screen.getByText('Texto 1')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('abc123abc123abc123abc123abc123ab')).toBeInTheDocument()
    expect(screen.getByText('file2.csv')).toBeInTheDocument()
    expect(screen.getByText('Texto 2')).toBeInTheDocument()
    expect(screen.getByText('456')).toBeInTheDocument()
    expect(screen.getByText('def456def456def456def456def456de')).toBeInTheDocument()
  })
})
