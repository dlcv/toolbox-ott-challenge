const csvParser = require('../src/utils/csvParser')

describe('Pruebas csvParser', () => {
  const mockFileName = 'test.csv'
  test('1. Debe procesar correctamente un CSV válido', () => {
    const csvContent = 'file,text,number,hex\ntest.csv,Hola Mundo,100,70ad29aacf0b690b0467fe2b2767f765'
    const result = csvParser(csvContent, mockFileName)

    expect(result).not.toBeNull()
    expect(result.file).toBe(mockFileName)
    expect(result.lines).toHaveLength(1)
    expect(result.lines[0]).toEqual({
      text: 'Hola Mundo',
      number: 100,
      hex: '70ad29aacf0b690b0467fe2b2767f765'
    })
  })

  test('2. Debe retornar null si la fila está incompleta (menos de 4 columnas)', () => {
    const csvContent = 'file,text,number,hex\ntest.csv,Incompleto,100'
    const result = csvParser(csvContent, mockFileName)
    expect(result).toBeNull()
  })

  test('3. Debe descartar filas individuales corruptas pero procesar las válidas', () => {
    const csvContent = 'file,text,number,hex\n' +
      'test.csv,Valida,42,70ad29aacf0b690b0467fe2b2767f765\n' +
      'test.csv,,99,70ad29aacf0b690b0467fe2b2767f765\n' +
      'test.csv,InvalidaHex,12,70ad29aa'

    const result = csvParser(csvContent, mockFileName)
    expect(result.lines).toHaveLength(1)
    expect(result.lines[0].text).toBe('Valida')
  })
})
