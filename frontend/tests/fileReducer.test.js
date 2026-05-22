const fileReducer = require('../src/redux/fileReducer')
const types = require('../src/redux/actionTypes')

describe('Pruebas fileReducer', () => {
  test('1. Debe retornar el estado por defecto', () => {
    const state = fileReducer(undefined, {})
    expect(state).toEqual({
      data: [],
      loading: false,
      error: null
    })
  })

  test('2. Debe retornar loading true en FETCH_FILES_REQUEST', () => {
    const action = { type: types.FETCH_FILES_REQUEST }
    const state = fileReducer(undefined, action)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('3. Debe guardar la data y poner loading en false en FETCH_FILES_SUCCESS', () => {
    const mockData = [{ file: 'test.csv', lines: [] }]
    const action = {
      type: types.FETCH_FILES_SUCCESS,
      payload: mockData
    }
    const state = fileReducer(undefined, action)
    expect(state.loading).toBe(false)
    expect(state.data).toEqual(mockData)
    expect(state.error).toBeNull()
  })

  test('4. Debe guardar el error y limpiar la data en FETCH_FILES_FAILURE', () => {
    const mockError = 'Error de conexión'
    const action = {
      type: types.FETCH_FILES_FAILURE,
      payload: mockError
    }
    const state = fileReducer(undefined, action)
    expect(state.loading).toBe(false)
    expect(state.data).toEqual([])
    expect(state.error).toBe(mockError)
  })
})
